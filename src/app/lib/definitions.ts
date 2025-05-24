export type LoginFormState = {
  error?: string;
  message?: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
};
