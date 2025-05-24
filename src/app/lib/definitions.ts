export type LoginFormState = {
  error?: string;
  message?: string;
};

export type PostFormState = {
  error?: string;
  message?: string;
};

export type UserCookie = {
  userId: string | undefined;
  userName: string | undefined;
};
