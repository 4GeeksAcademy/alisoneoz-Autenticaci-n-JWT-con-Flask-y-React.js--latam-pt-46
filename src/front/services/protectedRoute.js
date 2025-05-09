const BASE_URL = "https://urban-robot-vj66vvr9wr92xrvv-3001.app.github.dev";

export async function accessProtectedRoute() {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${BASE_URL}/protected`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to access protected route');
    }

    const data = await response.json();
    console.log("Protected data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
