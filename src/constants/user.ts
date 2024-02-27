export const ERROR_EMAIL_CHECK = '이메일 형식으로 작성해 주세요.';
export const ERROR_EMAIL_EXIST = '중복된 이메일입니다.';
export const ERROR_EMAIL_EMPTY = '이메일을 입력해 주세요.';

export const ERROR_PASSWORD_CHECK = '비밀번호가 일치하지 않습니다.';
export const ERROR_PASSWORD_VALIDATION = '8자 이상 입력해 주세요.';
export const ERROR_PASSWORD_EMPTY = '비밀번호를 입력해 주세요.';

export const ERROR_PASSWORD_SECOND_EMPTY = '비밀번호를 한 번 더 입력해 주세요.';

export const ERROR_NICKNAME_VALIDATION = '닉네임은 10자 이하로 작성해주세요.';
export const ERROR_NICKNAME_EMPTY = '닉네임을 입력해 주세요.';

export const ERROR_PRICE_CHECK = '가격은 9자 이하로 작성해주세요.';

//이메일 형식
export const EMAIL_STANDARD = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

//비밀번호 형식: 영문, 숫자, 특수기호 포함 8자 이상
export const PASSWORD_STANDARD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

interface SocialEmailContent {
  [key: string]: string;
}

export const SOCIAL_EMAIL_CONTENT: SocialEmailContent = {
  kakao: '카카오 로그인됨',
  google: '구글 로그인됨',
  naver: '네이버 로그인됨',
};
