import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button
};

export const Primary = {
  args: { children: '시작하기', variant: 'primary' }
};

export const Secondary = {
  args: { children: '자세히 보기', variant: 'secondary' }
};

export const Outline = {
  args: { children: '취소', variant: 'outline' }
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};
