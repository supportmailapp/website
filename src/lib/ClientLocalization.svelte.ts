import { browser } from "$app/environment";
import { replaceState } from "$app/navigation";
import { page } from "$app/state";
import { type Locale, getLocale, localizeHref } from "./paraglide/runtime";

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
    console.log("ClientLocalization set to", value);
    replaceState(localizeHref(page.url.href.replace(/\/$/, "")), "");
  }
}
