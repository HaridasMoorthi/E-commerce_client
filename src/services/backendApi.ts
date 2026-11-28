/**
 * Django + PostgreSQL + SimpleJWT Backend Service Client
 * Production-grade API client connecting frontend to http://localhost:8002/api/
 */

const API_BASE_URL = 'http://localhost:8002/api';

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface BackendUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'customer' | 'admin';
  is_staff: boolean;
  created_at?: string;
}

export interface BackendOrder {
  id?: number;
  order_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  street_address: string;
  city: string;
  pincode: string;
  total_amount: number | string;
  payment_mode: string;
  status: 'CONFIRMED' | 'PACKED' | 'DISPATCHED' | 'DELIVERED';
  awb_number: string;
  carrier: string;
  items: any[];
  created_at?: string;
}

// Token Helpers
export const getAccessToken = (): string | null => {
  return localStorage.getItem('om_access_token');
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('om_refresh_token');
};

export const setAuthTokens = (tokens: AuthTokens): void => {
  localStorage.setItem('om_access_token', tokens.access);
  localStorage.setItem('om_refresh_token', tokens.refresh);
};

export const clearAuthTokens = (): void => {
  localStorage.removeItem('om_access_token');
  localStorage.removeItem('om_refresh_token');
};

// Generic Request Handler with Bearer Token Injection
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const token = getAccessToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...((options.headers as Record<string, string>) || {})
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // If 401 Unauthorized, try refresh once if refresh token exists
      if (response.status === 401 && getRefreshToken()) {
        const refreshed = await apiRefreshToken();
        if (refreshed) {
          // Retry original request once
          headers['Authorization'] = `Bearer ${getAccessToken()}`;
          const retryRes = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
          });
          const retryData = await retryRes.json().catch(() => null);
          if (retryRes.ok) {
            return { success: true, data: retryData };
          }
        }
      }

      const errorMessage =
        data?.error ||
        data?.detail ||
        (typeof data === 'object' && data ? Object.values(data)[0] : null) ||
        `Request failed with status ${response.status}`;

      return {
        success: false,
        error: Array.isArray(errorMessage) ? errorMessage[0] : String(errorMessage)
      };
    }

    return { success: true, data };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error connecting to backend service.'
    };
  }
}

// Refresh JWT Access Token
export async function apiRefreshToken(): Promise<boolean> {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.access) {
        localStorage.setItem('om_access_token', data.access);
        return true;
      }
    }
  } catch (e) {
    console.warn('Failed to refresh token:', e);
  }
  clearAuthTokens();
  return false;
}

// 1. Customer / Staff Login
export async function apiLogin(email: string, password: string) {
  const res = await apiRequest<{ message: string; user: BackendUser; tokens: AuthTokens }>(
    '/auth/login/',
    {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }
  );

  if (res.success && res.data?.tokens) {
    setAuthTokens(res.data.tokens);
  }
  return res;
}

// 2. Customer Registration
export async function apiRegister(name: string, email: string, phone: string, password: string) {
  const res = await apiRequest<{ message: string; user: BackendUser; tokens: AuthTokens }>(
    '/auth/register/',
    {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, password })
    }
  );

  if (res.success && res.data?.tokens) {
    setAuthTokens(res.data.tokens);
  }
  return res;
}

// 3. Google One-Tap / Social Auth Exchange
export async function apiGoogleAuth(email: string, name: string, phone?: string) {
  const res = await apiRequest<{ message: string; user: BackendUser; tokens: AuthTokens }>(
    '/auth/google/',
    {
      method: 'POST',
      body: JSON.stringify({ email, name, phone: phone || '' })
    }
  );

  if (res.success && res.data?.tokens) {
    setAuthTokens(res.data.tokens);
  }
  return res;
}

// 4. Get Current User Profile
export async function apiGetProfile() {
  return await apiRequest<{ user: BackendUser }>('/auth/profile/', {
    method: 'GET'
  });
}

// 5. Get Customer Orders (from PostgreSQL)
export async function apiGetOrders(email?: string, phone?: string) {
  let query = '';
  if (email) query += `email=${encodeURIComponent(email)}&`;
  if (phone) query += `phone=${encodeURIComponent(phone)}`;
  return await apiRequest<BackendOrder[]>(`/orders/?${query}`, {
    method: 'GET'
  });
}

// 6. Create / Save Order in PostgreSQL
export async function apiCreateOrder(orderData: Partial<BackendOrder>) {
  return await apiRequest<{ message: string; order: BackendOrder }>('/orders/', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

// 7. Track Order Live by Order ID, Phone, or AWB
export async function apiTrackOrder(identifier: string) {
  return await apiRequest<BackendOrder>(`/orders/track/${encodeURIComponent(identifier)}/`, {
    method: 'GET'
  });
}
