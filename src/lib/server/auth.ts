// Helper functions for session management
import { env } from "$env/dynamic/private";
import jwt from "jsonwebtoken";
import { UserToken } from "./db/models/src/userTokens";
import { urls } from "$lib/constants";
import { discord } from "./constants";

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
  static async createSession(data: CreateSessionOps): Promise<string> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Encrpytion happens automatically in the UserToken model
    const exists = await UserToken.exists({ userId: data.userId });
    if (exists) {
      await UserToken.findOneAndUpdate(
        { userId: data.userId },
        {
          expiresAt: expiresAt,
          accessToken: data.tokens.accessToken,
          refreshToken: data.tokens.refreshToken ?? null,
        },
        { new: true },
      );
    } else {
      await UserToken.create({
        userId: data.userId,
        expiresAt: expiresAt,
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken ?? null,
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

  static async getUserTokenBySession(jwtToken: string): Promise<GetTokensResult> {
    const tokenRes = SessionManager.decodeToken(jwtToken);
    console.debug("Decoded JWT token:", tokenRes);
    if (!tokenRes.valid || tokenRes.error === "other" || !tokenRes.id) {
      return new GetTokensResult(null, false);
    }

    const uToken = await UserToken.findOne({ userId: tokenRes.id }!);

    return new GetTokensResult(uToken?.toJSON() || null, tokenRes.error === "expired");
  }

  static async getAndDeleteToken(id: string): Promise<FlatUserToken | null> {
    const token = await UserToken.findOneAndDelete({ userId: id });
    if (!token) return null;
    return token.toObject({ flattenMaps: true, flattenObjectIds: true });
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
