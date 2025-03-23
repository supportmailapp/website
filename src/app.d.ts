declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      stats: {
        guilds: number;
        users: number;
        tickets: number;
      }
    }
    // interface PageState {}
    interface Platform {
      env: {
        SUPPORTMAIL_API_KEY: string;
      }
    }
  }
}

export {};
