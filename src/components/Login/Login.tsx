import { useState } from "react";
import { MakeLogin } from "../../store/auth.store";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data_send = {
      email: email,
      password: password,
    };

    const loginSuccessfull = await MakeLogin(data_send);

    if (loginSuccessfull) {
      console.log("Inicio de sesión exitoso");
    } else {
      console.log("inicio de sesión fallido");
    }
  };

  return (
   
          <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center shadow-xl ">
        
       
          <div className="md:w-80 ">
              <div className="text-center md:text-left">
              <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                  Inicio de Sesión
              </h1>
              <br />
              <br/>
              <br />
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2 form-group">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="password"
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                className="login-button w-24  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
            </div>

              </div>
            
          
          </div>

          <div className="md:w-1/3 max-w-sm">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample image" />
          </div>
    {/* </div>  */}
    </section>

    
    
  );
}

export default Login;
