import type { IProfile } from "./profile";

export interface IFamily {
  id: string;
  name: string;
  created_by: string | null;
  created_at: string;
}

export interface IFamilyMember {
  id: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  created_at: string;
  profiles: IProfile
}
