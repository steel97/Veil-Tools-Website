import { useI18n } from "vue-i18n";

export const useFormatting = () => {
  const { getClientLocaleIgnoreCheck } = useLocalization();
  const { fallbackLocale } = useI18n();

  const formatDateLocal = (utcTime: number) => {
    const date = new Date(utcTime * 1000);
    try {
      return date.toLocaleDateString(getClientLocaleIgnoreCheck());
    }
    catch {
      console.log(`[locale failed] is server: ${process.server}, locale: ${getClientLocaleIgnoreCheck()}`);
      return date.toLocaleDateString(fallbackLocale.value.toString());
    }
  };

  const formatDateTimeLocal = (utcTime: number) => {
    const date = new Date(utcTime * 1000);
    try {
      return `${date.toLocaleDateString(getClientLocaleIgnoreCheck())} ${date.toLocaleTimeString(getClientLocaleIgnoreCheck())}`;
    }
    catch {
      console.log(`[locale failed] server: ${process.server}, locale: ${getClientLocaleIgnoreCheck()}`);
      return date.toLocaleDateString(fallbackLocale.value.toString());
    }
  };

  const formatTimeLocal = (utcTime: number) => {
    const date = new Date(utcTime * 1000);
    try {
      return date.toLocaleTimeString(getClientLocaleIgnoreCheck());
    }
    catch {
      console.log(`[locale failed] server: ${process.server}, locale: ${getClientLocaleIgnoreCheck()}`);
      return date.toLocaleDateString(fallbackLocale.value.toString());
    }
  };

  return { formatDateLocal, formatDateTimeLocal, formatTimeLocal };
};