declare global {
  namespace App {
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }

    interface Error {
      status: number;
      message: string;
      route: string;
    }

    // interface Locals {}

    interface PageData {
      stats: {
        guilds: number;
        users: number;
        tickets: number;
      };
    }

    // interface PageState {}
  }
}

export {};
