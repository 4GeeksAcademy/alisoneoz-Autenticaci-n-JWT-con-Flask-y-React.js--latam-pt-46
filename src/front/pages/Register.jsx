import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { createUser } from "../services/createUser.js";
import { useNavigate } from "react-router-dom";

export const Register = () => {

	const navigate = useNavigate()

	const { store, dispatch } = useGlobalReducer()

	const [usuarioNuevo, setUsuarioNuevo] = useState({
		email: "",
		password: ""
	})

	const handleCrearUsuario = async (e) => {
		e.preventDefault();
		try {
			await createUser(usuarioNuevo)
			navigate("/login")
		} catch (error) {
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
		<div className="mt-5 bg-light content-fluid p-5 d-flex justify-content-center flex-column align-items-center gap-5">
			<h1>Welcome, please register!</h1>
			<form className="w-75 text-start gap-5"
				onSubmit={handleCrearUsuario}
			>
				<label>Email</label>
				<input
					type="text" className="form-control mt-2" placeholder="youremail@companyofyouremail.com" aria-label="Username" aria-describedby="basic-addon1"
					onChange={(e) => {
						console.log(e.target.value)
						setUsuarioNuevo({ ...usuarioNuevo, email: e.target.value });
					}}
					value={usuarioNuevo.email}
				/>
				<label>password</label>

				<input type="text" className="form-control mt-2" placeholder="password" aria-label="Username" aria-describedby="basic-addon1"
					onChange={(e) => {
						setUsuarioNuevo({ ...usuarioNuevo, password: e.target.value })
						console.log(e.target.value)
					}}
					value={usuarioNuevo.password}
				/>
				<button className="btn btn-success mt-2 w-100">Send</button>
			</form>
		</div>
	);
}; 