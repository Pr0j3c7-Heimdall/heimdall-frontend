import Chip from './Chip';

export default {
  title: 'Components/Chip',
  component: Chip
};

export const Default = {
  args: { children: '태그' }
};

export const WithRemove = {
  args: {
    children: '제거 가능',
    onRemove: () => {}
  }
};

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip>default</Chip>
      <Chip variant="primary">primary</Chip>
      <Chip variant="outline">outline</Chip>
    </div>
  )
};
