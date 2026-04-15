import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'da', label: 'Dansk' },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 500 }}>
        {t('languageSwitcher.label')}:
      </span>
      <Select
        value={i18n.language}
        onChange={(value) => i18n.changeLanguage(value)}
        options={LANGUAGES}
        style={{ width: 120 }}
      />
    </div>
  );
}
