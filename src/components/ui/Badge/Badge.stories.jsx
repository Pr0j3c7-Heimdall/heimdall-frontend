import Badge from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge
};

export const Default = {
  args: { children: 'AI 검증 솔루션' }
};

export const Primary = {
  args: { children: 'New', variant: 'primary' }
};

export const Outline = {
  args: { children: 'Beta', variant: 'outline' }
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  )
};
