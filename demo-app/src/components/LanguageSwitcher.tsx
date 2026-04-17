import { GlobalOutlined } from '@ant-design/icons';
import { Segmented, Space, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'demo-app-language';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const value = useMemo(
    () => (i18n.language.startsWith('da') ? 'da' : 'en'),
    [i18n.language],
  );

  return (
    <Space
      data-testid="language-switcher"
      size={8}
      align="center"
      style={{
        padding: '6px 10px',
        borderRadius: 10,
        border: '1px solid #f0f0f0',
        background: '#fff',
      }}
    >
      <GlobalOutlined style={{ color: '#1677ff', fontSize: 14 }} />

      <Typography.Text type="secondary" style={{ fontSize: 12, lineHeight: 1 }}>
        {t('languageSwitcher.label')}
      </Typography.Text>

      <Segmented
        data-testid="language-segmented"
        size="small"
        value={value}
        options={[
          { label: 'EN', value: 'en' },
          { label: 'DA', value: 'da' },
        ]}
        onChange={(nextValue) => {
          const nextLanguage = String(nextValue);
          void i18n.changeLanguage(nextLanguage);
          window.localStorage.setItem(STORAGE_KEY, nextLanguage);
        }}
      />
    </Space>
  );
}
