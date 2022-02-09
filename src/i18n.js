import * as Localization from 'expo-localization';
import de from "./locales/de.js"
import ru from "./locales/ru.js"
import en from "./locales/en.js"

import i18n from 'i18n-js';

i18n.translations = {
    de:de,
    ru:ru,
    en: en,
  };

// Set the locale once at the beginning of your app.
const local = Localization.locale;
let lang=""
if (local=="de-DE")
{
    i18n.locale = local;
    lang="de_title";
} 
else if (local=="ru-RU")
{
    i18n.locale = local;
    lang="ru_title";
}
else{
    i18n.locale = "en";
    lang="en_title";
} 


i18n.fallbacks = true;

export {i18n, lang};