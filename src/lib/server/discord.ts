// Server Discord API integration

import { BOT_TOKEN } from "$env/static/private";
import {
  Routes,
  type APIChannel,
  type APIGuildMember,
  type APIRole,
  type APIUser,
  type RESTAPIPartialCurrentUserGuild,
  type RESTPatchAPIChannelJSONBody,
} from "discord-api-types/v10";
import { DiscordAPIError, REST, HTTPError, RateLimitError, type RESTOptions } from "discord.js";

type SafeError = DiscordAPIError | HTTPError | RateLimitError | Error | string;
type DefinitelyHasError<E extends SafeError> = Omit<SafeResponse<null>, "error" | "data"> & {
  error: NonNullable<E>;
  data: null;
  status: number | null;
};

type DefinitelyHasData<T> = Omit<SafeResponse<T>, "error" | "data"> & {
  error: null;
  data: NonNullable<T>;
  status: number | null;
};

class SafeResponse<T = unknown> {
  public readonly data: T | null;
  public readonly error: SafeError | null;
  public readonly status: number | null;

  constructor(data: typeof this.data = null, status: typeof this.status = null, error: typeof this.error = null) {
    this.data = data;
    this.error = error;
    this.status =
      error instanceof DiscordAPIError || error instanceof HTTPError
        ? error.status
        : error instanceof RateLimitError
          ? 429 // HTTP 429 Too Many Requests
          : status;
  }

  isSuccess(): this is DefinitelyHasData<T> {
    return this.data !== null && !this.error;
  }

  /**
   * Type guard to check if the response contains errors
   */
  public hasAnyError(): this is DefinitelyHasError<SafeError> {
    return this.error !== null;
  }

  public hasDiscordAPIError(): this is DefinitelyHasError<DiscordAPIError> {
    return this.error instanceof DiscordAPIError;
  }

  public hasHTTPError(): this is DefinitelyHasError<HTTPError> {
    return this.error instanceof HTTPError;
  }

  public hasRateLimitError(): this is DefinitelyHasError<RateLimitError> {
    return this.error instanceof RateLimitError;
  }

  public errorToString(): string {
    if (this.error instanceof DiscordAPIError) {
      return `Discord API Error: ${this.error.message} (Code: ${this.error.code}, Status: ${this.status})`;
    } else if (this.error instanceof HTTPError) {
      return `HTTP Error: ${this.error.message} (Status: ${this.status})`;
    } else if (this.error instanceof RateLimitError) {
      return `Rate Limit Error: ${this.error.message} (Retry After: ${this.error.retryAfter}ms)`;
    } else if (typeof this.error === "string") {
      return `Error: ${this.error}`;
    } else {
      return this.error?.message ?? "Unknown error occurred";
    }
  }
}

/**
 * Abstract base class for Discord API clients.
 * Provides common and safe functionality for making Discord API requests.
 */
abstract class BaseDiscordAPI {
  protected readonly rest: REST;

  constructor(token: string, authPrefix: RESTOptions["authPrefix"]) {
    this.rest = new REST({ version: "10", authPrefix }).setToken(token);
  }

  public get instance(): REST {
    return this.rest;
  }

  protected async doSafeRequest<T>(request: () => Promise<any>): Promise<SafeResponse<T>> {
    try {
      const data = await request();
      return new SafeResponse(data, data?.status ?? 204);
    } catch (error) {
      return new SafeResponse<T>(null, null, error as DiscordAPIError | HTTPError | RateLimitError | Error);
    }
  }
}

/**
 * Represents a Discord bot API client.
 * This class provides methods to interact with the Discord API using the bot token.
 */
class DiscordBotAPI extends BaseDiscordAPI {
  constructor() {
    super(BOT_TOKEN, "Bot");
  }

  public async getGuildChannel<T extends APIChannel>(channelId: string): Promise<SafeResponse<T>> {
    return this.doSafeRequest(() => this.rest.get(Routes.channel(channelId)) as any);
  }

  public async editGuildChannel<T extends APIChannel>(
    channelId: string,
    data: RESTPatchAPIChannelJSONBody,
  ): Promise<SafeResponse<T>> {
    return this.doSafeRequest(() => this.rest.patch(Routes.channel(channelId), { body: data }) as any);
  }

  public async getGuildRoles(guildId: string): Promise<SafeResponse<APIRole[]>> {
    return this.doSafeRequest(() => this.rest.get(Routes.guildRoles(guildId)) as any);
  }

  public async getGuildMember(guildId: string, memberId: string): Promise<SafeResponse<APIGuildMember>> {
    return this.doSafeRequest(() => this.rest.get(Routes.guildMember(guildId, memberId)) as any);
  }

  public async searchServerMembers(guildId: string, query: string, limit = 1): Promise<SafeResponse<APIGuildMember[]>> {
    return this.doSafeRequest(() =>
      this.rest.get(`${Routes.guildMembersSearch(guildId)}?query=${encodeURIComponent(query)}&limit=${limit}`),
    );
  }
}

export { DiscordBotAPI };

/**
 * Represents a Discord user API client.
 * This class provides methods to interact with the Discord API using a user access token.
 */
class DiscordUserAPI extends BaseDiscordAPI {
  private _userId: string | null = null;
  /**
   * @param at The Discord User Access Token (AT) to authenticate API requests.
   */
  constructor(at: string, userId?: string) {
    super(at, "Bearer");
    this._userId = userId ?? null;
  }

  /**
   * Gets the user ID.
   * @returns The user ID, if available.
   *
   * This will always be set if the `this.getCurrentUser` was called successfully because the function sets the user ID then.
   */
  get userId() {
    return this._userId;
  }

  /**
   * Retrieves the current authenticated user from the Discord API.
   *
   * @returns A promise that resolves to a SafeResponse containing the current user's data.
   *          On success, the user ID is cached internally for future use.
   *
   * @see {@link https://discord.com/developers/docs/resources/user#get-current-user}
   */
  public async getCurrentUser(): Promise<SafeResponse<APIUser>> {
    const _res = await this.doSafeRequest<APIUser>(() => this.rest.get(Routes.user()));
    if (_res.isSuccess()) {
      this._userId = _res.data.id;
    }
    return _res;
  }

  /**
   * Retrieves the current bot's guild member information for a specific guild.
   *
   * @param guildId - The ID of the guild to get the member information from
   * @returns A promise that resolves to a SafeResponse containing the API guild member object
   *
   * @see {@link https://discord.com/developers/docs/resources/user#get-current-user-guild-member}
   */
  public async getCurrentUserGuildMember(guildId: string): Promise<SafeResponse<APIGuildMember>> {
    return this.doSafeRequest(() => this.rest.get(Routes.guildMember(guildId, "@me")) as any);
  }
}

export { DiscordUserAPI };
