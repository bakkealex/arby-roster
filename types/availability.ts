export interface Availability {
  id: string;
  userId: string;
  date: Date;
  isAvailable: boolean;
  startTime?: Date;
  endTime?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateAvailabilityData {
  userId: string;
  date: Date;
  isAvailable: boolean;
  startTime?: Date;
  endTime?: Date;
  notes?: string;
}
