import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export async function getCurrentUser() {
  const app = getApp();
  const auth = getAuth(app);
  return auth.currentUser;
}
