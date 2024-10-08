import * as yup from 'yup';

export const schemaSignup = yup.object().shape({
  email: yup
    .string()
    .required('사용하실 이메일을 입력해주세요.')
    .email('이메일 형식이 맞지 않습니다.')
    .max(30, '이메일은 최대 30자리로 입력해주세요.'),
  pw: yup
    .string()
    .required('문자와 숫자, 특수문자를 조합하여 8~20자 사이로 입력해주세요.')
    .max(20, '비밀번호는 최대 20자리로 입력해주세요.')
    .matches(
      /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      '영문과 숫자, 특수문자를 조합하여 8~20글자 사이로 입력해주세요.'
    ),
  checkPw: yup
    .string()
    .oneOf([yup.ref('pw'), null], '비밀번호가 일치하지 않습니다.')
    .required('입력하신 비밀번호를 한번 더 입력해주세요.')
    .max(20, '비밀번호는 최대 20자리로 입력해주세요.'),
  nickname: yup
    .string()
    .required('사용하실 닉네임을 입력해주세요.')
    .matches(
      /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
      '닉네임은 2~16 글자 이하로 입력해주세요.'
    ),
  phone: yup
    .string()
    .required('전화번호를 입력해주세요.')
    .matches(
      /^\d{3}-\d{3,4}-\d{4}$/,
      '전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)'
    ),

  gender: yup.string().required('성별을 선택해주세요.'),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required('사용하실 이메일을 입력해주세요.')
    .email('이메일형식에 맞지 않습니다.'),
  password: yup
    .string()
    .required('문자와 숫자를 조합하여 8~20자 사이로 입력해주세요.')
    .max(14, '비밀번호는 최대 20자리로 입력해주세요.')
    .matches(
      /^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      '영문과 숫자, 특수기호를 조합하여 8~20글자 사이로 입력해주세요.'
    ),
});
