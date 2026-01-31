import Form, { FormField } from './index';
import Button from '@/components/Button';

export default {
  title: 'Components/Form',
  component: Form
};

export const LoginForm = {
  render: () => (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        alert('제출');
      }}
      style={{ maxWidth: 360 }}
    >
      <FormField label="이메일" type="email" placeholder="email@example.com" required />
      <FormField label="비밀번호" type="password" placeholder="••••••••" required helperText="8자 이상" />
      <Button type="submit" variant="primary">
        로그인
      </Button>
    </Form>
  )
};
