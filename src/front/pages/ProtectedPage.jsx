import { useNavigate, Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";


const ProtectedPage = () => {
  const { store } = useGlobalReducer()


  useEffect(() => {




  }, [store.token])

  if (!store.token) {
    return <Navigate to="/login"/>

  }
  return (
    <div className="container-fluid mt-5 mx-auto d-flex flex-column align-items-center" >
      <h1 className="my-5">Bienvenido a la Página Protegida</h1>
      <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm84dXpmOWRvaGVhOTM0dzM3Y3Q2MWk2Y2d3dXVyeWhyb2M4NmtnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BBNYBoYa5VwtO/giphy.gif" />
    </div>
  );
};



export default ProtectedPage;
