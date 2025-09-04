export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

export interface Booking {
  id: string;
  customerId: string;
  employeeId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  description?: string;
  status: BookingStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  employee?: {
    id: string;
    name: string;
    email: string;
    employeeNumber?: string;
  };
}

export interface CreateBookingData {
  customerId: string;
  employeeId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  description?: string;
}
