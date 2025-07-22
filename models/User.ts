export type User = {
    email: string,
    firstName: string,
    lastName: string,
    avatar: string
}

export type AuthState = {
  user?: User;
  token?: string;
};

export type AuthContextType = {
  auth: AuthState;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
};
