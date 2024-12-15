import Core from "./en/core";
import Errors from "./en/errors";
import Home from "./en/home";
import Meta from "./en/meta";
import Snapshots from "./en/snapshots";

export default defineI18nLocale(async (locale) => {
  return {
    nuxtSiteConfig: {
      name: "Veil Tools",
      description: "Download recent veil network snapshots, view basic blockchain information",
    },
    Core: Core(),
    Errors: Errors(),
    Meta: Meta(),
    Home: Home(),
    Snapshots: Snapshots(),
  };
});