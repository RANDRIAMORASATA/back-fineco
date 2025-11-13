export class CreateUserDto {
  email: string;
  password: string;
  role: 'investor' | 'creator';
  name?: string;
}
