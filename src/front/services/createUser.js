const BASE_URL=""

export const createUser = async () => {
    try {
      const checkResponse = await fetch(BASE_URL);  
      if (checkResponse.ok) {
        const user = await checkResponse.json();  
        if (user) {
          console.log("El usuario ya existe!!:", user);
          return;
        }
      }
      const response = await fetch(
        BASE_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Oh noo, algo salio mal an tratar de crear el user");
      }
  
      console.log("User creadp con éxito.");
    } catch (error) {
      console.log("error:", error);
    }
  };
  

