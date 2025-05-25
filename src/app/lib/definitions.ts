export type LoginFormState = {
  error?: any;
  message?: string;
  input?: string;
};

export type PostFormState = {
  error?: any;
  message?: string;
};

export type User = {
  userId: string;
  userName: string;
  password: string;
};

export type Post = {
  userId: string;
  userName: string;
  attachment?: string;
};

export type Text = {
  id: string;
  userid: number;
  text: string;
  username: string;
  created_at: string;
  attachment?: string;
};
