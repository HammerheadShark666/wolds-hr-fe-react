import { ProfileResponse } from "./profileResponse";

export interface LoginResponse {
  token: string;
  refreshToken: string;
  profile: ProfileResponse;
}