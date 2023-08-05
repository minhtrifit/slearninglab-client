export interface UserAccountType {
  username: string;
  password: string;
  name: string;
  email: string;
  roles: string[];
}

export interface ConfirmEmailType {
  code: string | any;
  checkCode: string | any;
}
