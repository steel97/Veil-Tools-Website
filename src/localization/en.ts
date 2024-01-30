import Core from "./en/core";
import Errors from "./en/errors";
import Meta from "./en/meta";
import Home from "./en/home";
import Snapshots from "./en/snapshots";

export default defineI18nLocale(async (locale) => {
  return {
    Core: Core(),
    Errors: Errors(),
    Meta: Meta(),
    Home: Home(),
    Snapshots: Snapshots()
  }
});