const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
      throw new Error('Login failed');
  }

  const data = await response.json();
  
  
  return data.access_token;
}

