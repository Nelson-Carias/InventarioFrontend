import "./App.css";
// import HolaMundo from "./HolaMundo";
import TableRol from "./components/Rol/TableRol"
import Layout from "./components/Layout";



function App(){
  return (
    
    <div className="App">
      {/* <HolaMundo></HolaMundo> */}
      <Layout></Layout>
      <div className="p-5"><TableRol></TableRol></div>
      
    </div>
  )
}

export default App