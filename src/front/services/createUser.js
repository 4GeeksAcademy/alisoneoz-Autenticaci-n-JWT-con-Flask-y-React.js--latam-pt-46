const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Oh noo, algo salió mal al tratar de crear el usuario");
    }

    console.log("Usuario creado con éxito.");
  } catch (error) {
    console.log("Error:", error);
  }
};