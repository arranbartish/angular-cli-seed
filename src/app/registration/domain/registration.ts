
export class UserDetails {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export class Registration {
  status: RegistrationStatus;
  userDetails: UserDetails;
}

export interface RegistrationsState {
  registration: Registration;
}

export enum RegistrationStatus {
  INITIATED,
  COMPLETED,
  CANCELED,
  UNCOMPLETED
}

export enum RegistrationSteps {
  DETAILS,
  AVATAR
}