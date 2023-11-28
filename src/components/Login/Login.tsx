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
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Inicio de Sesión
        </h1>
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
            className="w-full h-10 p-4 border rounded-xl"
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
            className="w-full h-10 p-4 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="login-button w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
