import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input
};

export const Default = {
  args: {
    label: '이메일',
    placeholder: 'email@example.com'
  }
};

export const WithHelper = {
  args: {
    label: '비밀번호',
    type: 'password',
    helperText: '8자 이상 입력하세요'
  }
};

export const WithError = {
  args: {
    label: '이메일',
    error: '유효한 이메일을 입력하세요',
    defaultValue: 'invalid'
  }
};
