export default function Layout(){
  return(
      <>
    <header className="bg-black bg-opacity-5 text-black shadow-lg hidden md:block">
      <div className="container mx-auto flex items-center h-24">
        <a href="" className="flex items-center justify-center">
          
          <span className="ml-4 uppercase font-black">Inventario</span>
        </a>
        <nav className="contents font-semibold text-base lg:text-lg">
          <ul className="mx-auto flex items-center">
            <li className="p-5 xl:p-8 active">
              <a >
                <span>Inicio</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="">
                <span>Usuarios</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a>
                <span>Roles</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a>
                <span>Clientes</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="">
                <span>Productos</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="">
                <span>Proveedores</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="">
                <span>Ventas</span>
              </a>
            </li>
          </ul>
        </nav>
        
      </div>
    </header>
      </>
  )
}

