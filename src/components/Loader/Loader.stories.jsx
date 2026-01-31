import Loader from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {
    size: { control: { type: 'number', min: 24, max: 96, step: 8 } },
    variant: {
      control: { type: 'radio' },
      options: ['moon', 'shield']
    }
  }
};

export const Default = {
  args: { size: 48, variant: 'moon' }
};

export const Moon = {
  args: { size: 48, variant: 'moon' }
};

export const Shield = {
  args: { size: 48, variant: 'shield' }
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

export const Compare = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Loader size={48} variant="moon" />
        <p style={{ marginTop: 8, fontSize: 14, color: '#6b7280' }}>달</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader size={48} variant="shield" />
        <p style={{ marginTop: 8, fontSize: 14, color: '#6b7280' }}>방패</p>
      </div>
    </div>
  )
};
