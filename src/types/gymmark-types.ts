import { Types } from "mongoose";

export type userType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin?: boolean;
  };
  
  export type gymType = {
    _id: string;
    title: string;
    description?: string;
    lat: number;
    lng: number;
    capacity: number | null;
    category: string;
    images?: string[];
    userid: Types.ObjectId; 
  };

  export interface UserCredentials {
    email: string;
    password: string;
  };
  