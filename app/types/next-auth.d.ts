import "next-auth";
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User {
    _id?: string;
    role?: string;
    mode?: string;
    error?: any;
    
  }
  interface Session {
    role?: string;
    user: {
      _id?: string;
      role?: string;
      mode?: string;
    }& DefaultSession["user"]
  }
}
