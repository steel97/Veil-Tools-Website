# Localization
Localization files located at [/src/localization](/src/localization)

Each folder there should match language code, logical lingual blocks defined in **/src/localization/\[locale_code\]/index.ts**

**RTL** is currently not supported.

## Adding new locale
1. Copy **/src/localization/en** directory to **/src/localization/\[locale_code\]**
2. Change each **JSON** files inside newly copied directory with translation. JSON format is {\"key\": \"value\"}, you should translate only values. There also can be symbols like {block} - this are placeholders, they are replaced at runtime to actual values
3. Add definition of new locale inside **/nuxt.config.ts**
```
locales: {
    "en": "English",
    "ru": "Русский",
    // add here new locale in format "[locale_code]": "locale_display_name"
}
```
4. Add new locale to **vue-i18n.mjs**, replace \<locale\> with locale code
```bash
import translation_en from "@/localization/en";
import translation_ru from "@/localization/ru";
import translation_<locale> from "@/localization/<locale>";

export default async () => ({
    locale: "en",
    fallbackLocale: "en",
    messages: {
        en: translation_en,
        ru: translation_ru,
        <locale>: translation_<locale>
    }
});
```
5. Add **png** locale icon to **/src/public/images/locales/\[lang_code\].png**

width of icon should be **64px**, height can vary (country flags can be in different aspect ratios)