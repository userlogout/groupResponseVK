export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  picture: string;
  gender?: "male" | "female";
}

export interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
