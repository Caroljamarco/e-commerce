const API_URL = import.meta.env.PROD
  ? '/api'
  : 'http://localhost:3000/api';

export const authService = {
  async login(username: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao fazer login');
    }

    return response.json();
  },

  async logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer logout');
    }

    return response.json();
  },

  async checkSession() {
    const response = await fetch(`${API_URL}/auth/session`, {
      credentials: 'include',
    });

    if (!response.ok) {
      return { authenticated: false };
    }

    return response.json();
  },
};

export const usersService = {
  async getAll() {
    const response = await fetch(`${API_URL}/users`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao buscar usuários');
    }

    return response.json();
  },

  async getById(id: number) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao buscar usuário');
    }

    return response.json();
  },

  async create(userData: {
    username: string;
    password: string;
    name: string;
    role: 'admin' | 'manager';
  }) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar usuário');
    }

    return response.json();
  },

  async update(
    id: number,
    userData: {
      username?: string;
      password?: string;
      name?: string;
      role?: 'admin' | 'manager';
      active?: boolean;
    }
  ) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao atualizar usuário');
    }

    return response.json();
  },

  async delete(id: number) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao deletar usuário');
    }

    return response.json();
  },
};
