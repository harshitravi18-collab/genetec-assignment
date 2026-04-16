import { GlobalOutlined } from '@ant-design/icons';
import { Segmented, Space, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'demo-app-language';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const value = useMemo(() => {
    return i18n.language.startsWith('da') ? 'da' : 'en';
  }, [i18n.language]);

  return (
    <Space
      size={10}
      align="center"
      style={{
        padding: '8px 12px',
        borderRadius: 999,
        background: '#f5f7fa',
        border: '1px solid #e5e7eb',
      }}
    >
      <GlobalOutlined style={{ color: '#1677ff', fontSize: 16 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography.Text
          type="secondary"
          style={{
            fontSize: 12,
            lineHeight: 1,
          }}
        >
          {t('languageSwitcher.label')}
        </Typography.Text>

        <Segmented
          size="middle"
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
      </div>
    </Space>
  );
}
