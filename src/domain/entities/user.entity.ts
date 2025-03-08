import { Role } from './role.entity';

export class User {
  id: number;
  code?: string;
  name: string;
  email: string;
  password: string;
  roleId: number;
  role?: Role; 
  isActive: boolean;
  isPenalty: boolean;
  deletedAt?: Date;
  deletedBy?: number;
  createdAt: Date;
  createdBy?: number;
  updatedAt: Date;
  updatedBy?: number;
}
