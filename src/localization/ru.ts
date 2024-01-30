import Core from "./ru/core";
import Errors from "./ru/errors";
import Meta from "./ru/meta";
import Home from "./ru/home";
import Snapshots from "./ru/snapshots";

export default defineI18nLocale(async (locale) => {
  return {
    Core: Core(),
    Errors: Errors(),
    Meta: Meta(),
    Home: Home(),
    Snapshots: Snapshots()
  }
});