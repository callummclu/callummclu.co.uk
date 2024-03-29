import { LogInUser } from "../types/auth";

export async function login(loginParams: LogInUser) {
  const response = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/login`, {
    method: "POST",
    body: JSON.stringify(loginParams),
  });
  return response;
}

export async function logOut() {
  localStorage.removeItem("gocial_auth_token");
  return false;
}
