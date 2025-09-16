const API_BASE_URL = 'http://localhost:5000/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'counselor';
  // Role-specific fields
  studentId?: string;
  college?: string;
  course?: string;
  year?: number;
  specialization?: string[];
  qualification?: string;
  experience?: number;
  licenseNumber?: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: {
    url: string;
  };
  fullName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  private async makeRequest(url: string, options: RequestInit = {}): Promise<any> {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors specifically
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessage = data.errors.map((err: any) => err.msg).join(', ');
          throw new Error(errorMessage);
        }
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response: AuthResponse = await this.makeRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.success) {
        this.token = response.data.token;
        localStorage.setItem('authToken', this.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<User> {
    try {
      const response: AuthResponse = await this.makeRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (response.success) {
        this.token = response.data.token;
        localStorage.setItem('authToken', this.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async getMe(): Promise<User | null> {
    try {
      if (!this.token) {
        return null;
      }

      const response = await this.makeRequest('/auth/me');

      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      } else {
        this.logout();
        return null;
      }
    } catch (error) {
      console.error('Get user failed:', error);
      this.logout();
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.token) {
        await this.makeRequest('/auth/logout', {
          method: 'POST',
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await this.makeRequest('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }
}

export const authService = new AuthService();
export default authService;