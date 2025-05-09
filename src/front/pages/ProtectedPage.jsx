import React, { useEffect, useState } from 'react';
import { accessProtectedRoute } from '../services/accessProtectedRoute';

const ProtectedPage = () => {
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await accessProtectedRoute();
        setProtectedData(data.logged_in_as); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
      <h1 >Página Protegida</h1>
      {error && <p >{error}</p>}
      {protectedData ? (
        <p>Estás autenticado como: {protectedData}</p>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};



export default ProtectedPage;
