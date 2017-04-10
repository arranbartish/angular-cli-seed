
export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;

}

export class Registration {
  status: string;
  user: User;
}

export interface RegistrationsState {
  registration: Registration;
}
