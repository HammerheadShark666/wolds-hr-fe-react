import { ProfileResponse } from "./profileResponse";

export interface LoginResponse {
  token: string;
  profile: ProfileResponse;
}