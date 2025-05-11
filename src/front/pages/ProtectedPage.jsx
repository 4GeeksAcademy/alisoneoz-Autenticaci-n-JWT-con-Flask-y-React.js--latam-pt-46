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
    <div >
      <h1 >Página Protegida</h1>

    </div>
  );
};



export default ProtectedPage;
