export interface LogInUser {
  username: string;
  password: string;
}
export interface User {
  name: string;
  surname: string;
  username: string;
  display_image: string;
  description: string;
  friends: string[];
  received_invitations: string[];
}

export interface CheckUser {
  isAuthenticated: string;
  username: string;
}
