"use client";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("auth-token=")
  );

  if (!authCookie) return null;

  return authCookie.split("=")[1] || null;
}

export function getAuthData(): {
  token: string;
  role: string;
  is_admin: boolean;
} | null {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("auth-token=")
  );
  const userDataCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("user-data=")
  );

  if (!authCookie || !userDataCookie) return null;

  const token = authCookie.split("=")[1];
  const userDataValue = userDataCookie.split("=")[1];

  if (!token || !userDataValue) return null;

  try {
    const userData = JSON.parse(decodeURIComponent(userDataValue));
    return {
      token,
      role: userData.role,
      is_admin: userData.is_admin,
    };
  } catch {
    return null;
  }
}
