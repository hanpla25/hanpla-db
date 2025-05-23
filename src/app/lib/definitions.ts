export type LoginFormState = {
  error?: string;
  message?: string;
};

export type User = {
  id: number;
  name: string;
  password: string;
};
