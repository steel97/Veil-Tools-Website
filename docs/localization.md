# Localization
Localization files located at [/src/localization](/src/localization)

Locale file defined in typescript files: **/src/localization/\[locale_code\].ts**
To be more readable, localization file splitted into logical blocks stored in folder that matches localization file name, for example **/src/localization/en/** for **/src/localization/en.ts**

**RTL** support is currently not tested.

## Adding new locale
1. Copy **/src/localization/en.ts** file to **/src/localization/\[locale_code\].ts**
2. Copy **/src/localization/en/** directory to **/src/localization/\[locale_code\]/**
3. Change each **ts** files inside newly copied directory with translation. Those ts files usually export regular JSON with format {\"key\": \"value\"}, you should translate only values. There also can be symbols like {block} - placeholders, they are replaced at runtime to actual values
4. Add definition of new locale inside **/nuxt.config.ts**
```
locales: {
    {
        name: "English",
        code: "en",
        iso: "en-US",
        file: "en.ts"
    },
    {
        name: "Русский",
        code: "ru",
        iso: "ru-RU",
        file: "ru.ts"
    }
    // add here new locale
}
```
5. Add **png** locale icon to **/src/public/images/locales/\[locale_code\].png**

width of icon should be **64px**, height can vary (country flags can be in different aspect ratios)