import { cookies } from "next/headers";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "super_admin";
}

const TEST_CREDENTIALS = {
  email: "admin@ypambuzi.com",
  password: "admin123",
  user: {
    id: "test-admin-1",
    email: "admin@ypambuzi.com",
    name: "YPA Admin",
    role: "admin" as const,
  },
};

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
}

export async function setAuthToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function removeAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function verifyAuth(): Promise<AdminUser | null> {
  const token = await getAuthToken();
  if (!token) return null;

  if (token === "test-token") {
    return TEST_CREDENTIALS.user;
  }

  try {
    const response = await fetch(
      `${process.env.FASTAPI_BASE_URL}/auth/verify`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error("Auth verification failed:", error);
    if (token === "test-token") {
      return TEST_CREDENTIALS.user;
    }
    return null;
  }
}

export async function loginWithTestCredentials(
  email: string,
  password: string
): Promise<{ success: boolean; token?: string; user?: AdminUser }> {
  if (
    email === TEST_CREDENTIALS.email &&
    password === TEST_CREDENTIALS.password
  ) {
    await setAuthToken("test-token");
    return {
      success: true,
      token: "test-token",
      user: TEST_CREDENTIALS.user,
    };
  }
  return { success: false };
}

export const getTestCredentials = () => ({
  email: TEST_CREDENTIALS.email,
  password: TEST_CREDENTIALS.password,
});
