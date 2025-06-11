export const initialStore=()=>{
  return{
    token: localStorage.getItem('accessToken'),
    message: null,
    
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'guardar_el_token':
      return{
        ...store, token: action.payload.token
      }

    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      

      case 'cerrar_la_sesion':
        localStorage.removeItem('accessToken')
        return{
          ...store,
          token:null
        };
      default:
      throw Error('Unknown action.');
  }    
}
