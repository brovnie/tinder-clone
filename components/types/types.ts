export type AuthType = "login" | "signUp";

export type Card = {
  firstName: string;
  lastName: string;
  occupation: string;
  photoURL: string;
  age: number;
};
export type MatchProfile = {
  id: string;
  displayName: string;
  age: string;
  occupation: string;
  photoURL: string;
  timestemp?: any;
};
export type SingleMessage = {
  id: string;
  message: string;
  photoURL?: string;
};
