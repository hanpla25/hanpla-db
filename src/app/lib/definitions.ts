export type LoginFormState = {
  error?: string;
  message?: string;
  input?: string;
};

export type PostFormState = {
  error?: string;
  message?: string;
};

export type User = {
  userId: string;
  userName: string;
  password: string;
};
