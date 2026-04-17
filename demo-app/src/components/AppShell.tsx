import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Tag, Typography } from 'antd';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

const { Title, Paragraph } = Typography;

type AppShellProps = {
  children: ReactNode;
  onCreateEvent: () => void;
};

export function AppShell({ children, onCreateEvent }: AppShellProps) {
  const { t } = useTranslation();

  return (
    <Space
      data-testid="app-shell"
      direction="vertical"
      size={24}
      style={{ width: '100%' }}
    >
      <Card
        data-testid="app-shell-header"
        styles={{
          body: {
            padding: 24,
          },
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 640px', minWidth: 280 }}>
            <Space direction="vertical" size={10}>
              <Space wrap>
                <Tag data-testid="app-shell-tag-genetec" color="blue">
                  {t('eventShowcase.tags.GenetecEventApp')}
                </Tag>
                <Tag
                  data-testid="app-shell-tag-component-library"
                  color="purple"
                >
                  {t('eventShowcase.tags.componentLibrary')}
                </Tag>
              </Space>

              <Title
                data-testid="app-shell-title"
                level={2}
                style={{ margin: 0 }}
              >
                {t('eventShowcase.hero.title')}
              </Title>

              <Paragraph
                data-testid="app-shell-description"
                type="secondary"
                style={{
                  margin: 0,
                  maxWidth: 760,
                  fontSize: 15,
                }}
              >
                {t('eventShowcase.hero.description')}
              </Paragraph>
            </Space>
          </div>

          <Space wrap size={12} align="center">
            <LanguageSwitcher />

            <Button
              data-testid="create-event-button"
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={onCreateEvent}
            >
              {t('eventShowcase.actions.newEvent')}
            </Button>
          </Space>
        </div>
      </Card>

      {children}
    </Space>
  );
}
