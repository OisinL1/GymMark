export interface Session {
    name: string;
    _id: string;
    token: string;
    isAdmin: boolean;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
    admin?: boolean; 
  }

  export interface Gym {
    _id?: string;
    title: string;
    lat: number;
    lng: number;
    capacity: number;
    category: string;
    description?: string;
    userid: string;
  }
  