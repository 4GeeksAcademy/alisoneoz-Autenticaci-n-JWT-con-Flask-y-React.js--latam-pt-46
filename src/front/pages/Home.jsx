import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
export const Home = () => {
    const { store } = useGlobalReducer();
    return (
        <div className="bg-light content-fluid d-flex flex-column align-items-center text-center p-5">
            <h1>Welcome to Authentication with JWT! ✨</h1>
            <img className="w-25" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjJhc2QydjhkZ3I3Yjkxd3lmNWx5bWtlNXR4dG0ycm91bzZ2c2JvaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X9aZ13CKXtRBK/giphy.gif" />
            {store.token ? (
                <>
                    check the <Link to="/protected"> Secret Page!</Link>
                </>
            ) : (
                <>
                    <div className="p-5">
                        <h3 className="text-blac mb-5">Access!</h3>
                        <div className="d-flex my-5">
                            <Link to="/register"><span className="bg-primary me-2 text-white px-4 py-2 border rounded text-decoration-none">Register</span></Link>
                            <Link to="/login"><span className="bg-success text-white px-4 py-2 border rounded text-decoration-none">Login</span></Link>
                        </div>


                    </div>
                </>
            )}
        </div>
    )
}