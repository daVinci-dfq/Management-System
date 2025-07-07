export interface User {
  id: string;
  name: string;
  gender: number; // 0 for male, 1 for female
  password: string;
  idCard: string;
}

export interface Ticket {
  id: string;
  trainId: string;
  carriage: string;
  seatNumber: string;
  departureTime: Date;
  arrivalTime: Date;
  departureStation: string;
  arrivalStation: string;
  price: number;
}

export interface UserFromErrors {
  name?: string
  gender?: string;
  idCard?: string;
  password0?: string;
  password1?: string;
  general?: string;
}