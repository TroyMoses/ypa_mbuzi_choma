export interface User {
  id: number
  username: string
  email?: string
  name: string
  role: "admin" | "chef" | "cook" | "manager" | "staff"
  token: string
  is_admin: boolean
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

// API base URL - FastAPI backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ypa-mbuzi-choma-backend.onrender.com"

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Changed from username to email
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || "Invalid credentials")
    }

    const data = await response.json()

    const user: User = {
      id: data.user.id,
      username: data.user.username || data.user.email, // Fallback to email if no username
      email: data.user.email,
      name: data.user.name || data.user.username || data.user.email,
      role: data.user.role,
      token: data.token,
      is_admin: data.user.is_admin,
    }

    this.setUserData(user)

    return user
  }

  static async logout(): Promise<void> {
    this.removeToken()
  }

  static async verifyToken(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Updated to use Bearer token format
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || "Invalid token")
    }

    const data = await response.json()

    const user: User = {
      id: data.id,
      username: data.username || data.email,
      email: data.email,
      name: `${data.first_name} ${data.last_name}`.trim() || data.username || data.email,
      role: data.role,
      token: token,
      is_admin: data.is_admin || false,
    }

    return user
  }

  static setToken(token: string): void {
    // Set cookie for middleware access
    document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`
  }

  static setUserData(user: User): void {
    // Set token cookie for middleware access
    document.cookie = `auth-token=${user.token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`

    // Store user object in secure cookie
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      is_admin: user.is_admin,
    }
    document.cookie = `user-data=${encodeURIComponent(
      JSON.stringify(userData),
    )}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`
  }

  static getToken(): string | null {
    if (typeof document === "undefined") return null

    const cookies = document.cookie.split(";")
    const authCookie = cookies.find((cookie) => cookie.trim().startsWith("auth-token="))
    return authCookie ? authCookie.split("=")[1] : null
  }

  static removeToken(): void {
    // Clear cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "user-data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  }
}
