import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// demo-app translations
import en from './locales/en.json';
import da from './locales/da.json';

//  import UI library translations
import { uiTranslations } from '@org/ui-components';

export const defaultNS = 'translation';

export const resources = {
  en: {
    translation: {
      ...uiTranslations.en,
      ...en,
    },
  },
  da: {
    translation: {
      ...uiTranslations.da,
      ...da,
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
