export enum UserRole {
  PENDING = 'PENDING',
  EMPLOYEE = 'EMPLOYEE',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RESERVED = 'RESERVED'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  employeeNumber?: string;
  location?: string;
  operativeStatus?: EmployeeStatus;
  recertification?: Date;
  notes?: string;
  potential?: string;
  courses?: string;
  feedback?: string;
  gdprConsent: boolean;
  gdprConsentDate?: Date;
  gdprConsentVersion?: string;
  isApproved: boolean;
  approvedAt?: Date;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  phone?: string;
  employeeNumber?: string;
  location?: string;
  operativeStatus?: EmployeeStatus;
  gdprConsent: boolean;
}
