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
  attachments?: string[];
};
