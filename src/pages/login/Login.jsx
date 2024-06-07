import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {

  /* Create states */
  const [inputs, setInputs] = useState({
    username:'',
    pw:''
  });

  /* Create state for error */
  const [err, setErr] = useState(null);

  /* Create Use Navigate */
  const navigate = useNavigate();
  /* Create handler */
  const handleChange = (e) => {
    /* Prevent default submit */
    e.preventDefault();
    /*Load values */
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     const logged =  await login(inputs);
     navigate("/");
    } catch (error) {
      console.error(error.response.data);
      setErr(error.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="password" placeholder="Password" name="pw" onChange={handleChange} />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;