// src/front/pages/Login.jsx
import React, { useState } from "react";
import { loginUser } from "../services/loginUser";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const { dispatch } = useGlobalReducer()

    const navigate = useNavigate();

    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = await loginUser(userCredentials.email, userCredentials.password);
            localStorage.setItem('accessToken', token);
            dispatch({
                type: "guardar_el_token",
                payload: { token: token }
            })
            console.log("Token guardado en Local Storage:", token);
            token ?  navigate("/protected") : alert("no se pudo iniciar sesion")
            

        } catch (error) {
            console.log("Hubo un error al iniciar sesión:", error);
        }
    };

    return (
        <div className="text-center mt-5 bg-light content-fluid p-5">
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="youremail@companyofyouremail.com"
                    onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                    value={userCredentials.email}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
                    value={userCredentials.password}
                />
                <button className="btn btn-success">Iniciar Sesión</button>
            </form>
        </div>
    );
};
