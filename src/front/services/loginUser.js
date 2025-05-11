const BASE_URL="https://effective-space-chainsaw-9g77995rw4rfprpg-3001.app.github.dev/login"

export async function loginUser(email, password) {
  const response = await fetch(BASE_URL, {
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

