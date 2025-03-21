import { browser } from "$app/environment";
// import { invalidate } from "$app/navigation";
import { type Locale, getLocale } from "./paraglide/runtime";

export class ClientLocalization {
  #locale: Locale = $state(getLocale());
  constructor() {
    if (!browser) throw new Error("Cannot construct ClientLocalization on the server.");
    console.log("ClientLocalization constructed.");
  }
  get current() {
    return this.#locale;
  }
  set current(value) {
    if (value === this.#locale) return;
    this.#locale = value;
    const [html] = document.getElementsByTagName("html");
    if (html) html.lang = value;
    // Any other things like route invalidation here.
  }
}
