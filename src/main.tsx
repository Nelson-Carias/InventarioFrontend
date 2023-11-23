//es la raiz del proyecto y todo lo que este dentro de la raiz sera parte de la aplicacion de react

//importaciones
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


//Este codigo lo que hace referencia en donde va estar la raiz de toda la aplicacion
//Renderiza el componente App.tsx o implementar
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
