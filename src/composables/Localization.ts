export const useLocalization = () => {

    const headers = useRequestHeaders(["accept-language"]);

    const getClientLocaleIgnoreCheck = () => {
        const acceptLanguages = headers["accept-language"];
        let targetLocale: string | null = null;

        if (acceptLanguages != null) {
            const langs = acceptLanguages.split(";")[0].split(",");
            for (const entr of langs) {
                if (entr.startsWith("q=")) continue;
                targetLocale = entr;
                break;
            }
        }

        const retLocale = targetLocale ?? (process.client ? navigator.language ?? "en-US" : "en-US");
        return retLocale == "*" ? "en-US" : retLocale;
    };

    return { getClientLocaleIgnoreCheck };
}