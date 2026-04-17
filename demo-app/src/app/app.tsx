import { ConfigProvider, Layout, theme } from 'antd';
import { EventShowcasePage } from '../features/event-showcase/pages/EventShowcasePage';

const { Content } = Layout;

export function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          borderRadius: 12,
        },
      }}
    >
      <Layout data-testid="app-layout" style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        <Content data-testid="app-content" style={{ padding: '32px 24px' }}>
          <EventShowcasePage />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
