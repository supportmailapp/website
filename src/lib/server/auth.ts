// Helper functions for session management
import { env } from "$env/dynamic/private";
import { urls } from "$lib/constants";
import { createCipheriv, createDecipheriv } from "crypto";
import jwt from "jsonwebtoken";
import { discord } from "./constants";
import { UserToken } from "./db/models/src/userTokens";

const algorithm = "aes-256-cbc";

export function encrypt(text: string, key: string, iv: string): string {
  try {
    const encKey = Buffer.from(key, "utf-8");
    const encIV = Buffer.from(iv, "utf-8");
    const cipher = createCipheriv(algorithm, encKey, encIV);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    console.log("Encrypted:", encrypted);
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt token");
  }
}

export function decrypt(encryptedText: string, key: string, iv: string): string {
  try {
    const encKey = Buffer.from(key, "utf-8");
    const encIV = Buffer.from(iv, "utf-8");
    const decipher = createDecipheriv(algorithm, encKey, encIV);
    let decrypted = decipher.update(encryptedText, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    console.log("Decrypted:", decrypted);
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt token");
  }
}

type CreateSessionOps = {
  userId: string;
  tokens: {
    accessToken: string;
    refreshToken?: string;
    /**
     * The number of seconds until the access token expires.
     */
    expiresIn: number;
  };
};

class GetTokensResult {
  public readonly token: FlatUserToken | null;
  public readonly expired: boolean;

  constructor(token: FlatUserToken | null, expired: boolean) {
    this.token = token;
    this.expired = expired;
  }

  isFound(): this is Omit<GetTokensResult, "token"> & { token: FlatUserToken } {
    return this.token !== null && typeof this.token === "object" && "accessToken" in this.token;
  }

  isExpired(): this is Omit<GetTokensResult, "token" | "expired"> & { token: FlatUserToken; expired: true } {
    return this.isFound() && this.expired;
  }
}

class SessionManager {
  static async createSession(data: CreateSessionOps, key: string, iv: string): Promise<string> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const encryptedAccessToken = encrypt(data.tokens.accessToken, key, iv);
    const encryptedRefreshToken = data.tokens.refreshToken ? encrypt(data.tokens.refreshToken, key, iv) : null;

    const exists = await UserToken.exists({ userId: data.userId });
    if (exists) {
      await UserToken.findOneAndUpdate(
        { userId: data.userId },
        {
          expiresAt: expiresAt,
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken,
        },
        { new: true },
      );
    } else {
      await UserToken.create({
        userId: data.userId,
        expiresAt: expiresAt,
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
      });
    }

    const sessionToken = jwt.sign({ id: data.userId }, env.JWT_SECRET, {
      algorithm: "HS256",
      issuer: "supportmail",
      expiresIn: "7d",
      encoding: "utf-8",
    });

    return sessionToken;
  }

  static decodeToken(_token: string): {
    valid: boolean;
    id: string | null;
    error: "expired" | "other" | null;
  } {
    try {
      const decoded = jwt.verify(_token, env.JWT_SECRET, {
        algorithms: ["HS256"],
        issuer: "supportmail",
      });
      return {
        valid: true,
        id: (decoded as jwt.JwtPayload).id || null,
        error: null,
      };
    } catch (error: any) {
      if (error instanceof jwt.TokenExpiredError) {
        const decoded = jwt.decode(_token);
        if (decoded) {
          return {
            valid: false,
            id: (decoded as jwt.JwtPayload).id,
            error: "expired",
          };
        }
      }

      return {
        valid: false,
        id: null,
        error: "other",
      };
    }
  }

  static async getUserTokenBySession(jwtToken: string, key: string, iv: string): Promise<GetTokensResult> {
    const tokenRes = SessionManager.decodeToken(jwtToken);
    console.debug("Decoded JWT token:", tokenRes);
    if (!tokenRes.valid || tokenRes.error === "other" || !tokenRes.id) {
      return new GetTokensResult(null, false);
    }

    const uToken = await UserToken.findOne({ userId: tokenRes.id }!);

    if (uToken) {
      const decryptedToken = {
        ...uToken.toJSON(),
        accessToken: decrypt(uToken.accessToken, key, iv),
        refreshToken: uToken.refreshToken ? decrypt(uToken.refreshToken, key, iv) : null,
      };
      return new GetTokensResult(decryptedToken, tokenRes.error === "expired");
    }

    return new GetTokensResult(null, tokenRes.error === "expired");
  }

  static async getAndDeleteToken(id: string, key: string, iv: string): Promise<FlatUserToken | null> {
    const token = await UserToken.findOneAndDelete({ userId: id });
    if (!token) return null;

    const decryptedToken = {
      ...token.toObject({ flattenMaps: true, flattenObjectIds: true }),
      accessToken: decrypt(token.accessToken, key, iv),
      refreshToken: token.refreshToken ? decrypt(token.refreshToken, key, iv) : null,
    };

    return decryptedToken;
  }

  static async cleanupExpiredTokens(): Promise<void> {
    await UserToken.deleteMany({ expiresAt: { $lt: new Date() } });
  }

  static async revokeToken(token: string, type: "access" | "refresh") {
    await fetch(urls.tokenRevocation(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: discord.clientId,
        client_secret: discord.clientSecret,
        token: token,
        token_type_hint: type + "_token",
      }).toString(),
    }).catch(() => {});
  }
}

export { SessionManager, type CreateSessionOps };
