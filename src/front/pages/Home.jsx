import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { createUser } from "../services/createUser.js";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const [usuarioNuevo, setUsuarioNuevo] = useState({
		email:"",
		password:""
	})

	const handleCrearUsuario = async (e)=> {
		e.preventdefault();
		try{
			await createUser(usuarioNuevo)
		} catch(error){
			console.log("hubo un error al crear el User:", error)
		}
	}

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5 bg-light content-fluid p-5">
			<form className=""
			onSubmit={handleCrearUsuario}
			>
			<label>username</label>
					<input					
						type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" 
						onChange={(e) => {							
							console.log(e.target.value)
							setUsuarioNuevo({ ...usuarioNuevo, email: newEmail });
						  }}
						value={usuarioNuevo.email}
					/>
					<label>password</label>
				
					<input type="text" className="form-control" placeholder="password" aria-label="Username" aria-describedby="basic-addon1" 
						onChange={(e) => {
							setUsuarioNuevo({ ...usuarioNuevo, password: e.target.value }) 
							console.log(e.target.value)
						}}
						value={usuarioNuevo.password}
					/>
		
			</form>
		</div>
	);
}; 