import { cookies } from "next/headers";

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  return token || null;
}

export async function getAuthData(): Promise<{
  token: string;
  role: string;
  is_admin: boolean;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const userDataCookie = cookieStore.get("user-data")?.value;

  if (!token || !userDataCookie) {
    return null;
  }

  try {
    const userData = JSON.parse(decodeURIComponent(userDataCookie));
    return {
      token,
      role: userData.role,
      is_admin: userData.is_admin,
    };
  } catch (error) {
    return null;
  }
}
