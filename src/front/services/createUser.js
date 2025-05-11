const BASE_URL="https://effective-space-chainsaw-9g77995rw4rfprpg-3001.app.github.dev/signup"

export const createUser = async (user) => {
  try {
    const response = await fetch(BASE_URL, {
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