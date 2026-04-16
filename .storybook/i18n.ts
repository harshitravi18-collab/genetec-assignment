import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { uiTranslations } from '../packages/ui-components/src/i18n/i18n';

export const defaultNS = 'translation';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: uiTranslations.en },
    da: { translation: uiTranslations.da },
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
