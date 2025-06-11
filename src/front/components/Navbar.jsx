import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: 'cerrar_la_sesion' });
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Authentication with JWT</span>
				</Link>

				<div className="ml-auto">
					{store.token ? (
						<button className="btn btn-secondary me-2" onClick={handleLogout}>
							Cerrar sesión
						</button>
					) : (<>
						<Link to="/login" className="mx-5">
							Login
						</Link>
						<Link to="/">
							Register
						</Link></>
					)}

				</div>
			</div>
		</nav>
	);
};