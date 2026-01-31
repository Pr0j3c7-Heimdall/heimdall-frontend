import Loader from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {
    size: { control: { type: 'number', min: 24, max: 96, step: 8 } }
  }
};

export const Default = {
  args: { size: 48 }
};

export const Small = {
  args: { size: 32 }
};

export const Large = {
  args: { size: 64 }
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <Loader size={24} />
      <Loader size={32} />
      <Loader size={48} />
      <Loader size={64} />
      <Loader size={80} />
    </div>
  )
};
