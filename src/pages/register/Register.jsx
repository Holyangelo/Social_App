import { Link } from "react-router-dom";
import "./register.scss";
import axios from 'axios';
import { useState } from "react";

/*URL */
const url = "http://localhost:4000/auth/register";
const Register = () => {
  /* Create states */
  const [inputs, setInputs] = useState({
    username: '',
    email:'',
    password:'',
    name:''
  });
  /* Create state for error */
  const [err, setErr] = useState(null);
  /* Create handler */
  const handleChange = (e) => {
    /* Prevent default submit */
    e.preventDefault();
    /*Load values */
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  /* Create handler */
  const handleClick = async(e) => {
    /* Prevent default submit */
    e.preventDefault();
    /* Creates request for register */
    try {
      /* Create POST */
      const response = await axios.post(url, inputs);
      /* Return data */
      if(Object.keys(response).length > 0){
        const form = document.querySelector("#register_form");
        const span = document.createElement("span");
        span.style.color = "green";
        span.style.fontWeight = "bold";
        span.textContent = response.data.message;
        form.appendChild(span);
        setTimeout(() => {
          form.removeChild(span);
        }, 2000);
      }
      console.log(response);
      /* Catch Error */
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
    }
  }
  return (
    <>
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form id="register_form">
            <input type="text" placeholder="Username" name = "username" onChange={handleChange}/>
            <input type="email" placeholder="Email" name = "email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name = "password" onChange={handleChange}/>
            <input type="text" placeholder="Name" name = "name" onChange={handleChange}/>
            {/*<input type="file" placeholder="Picture" name = "picture" onChange={handleChange}/>
            <input type="file" placeholder="Profile" name = "profilePicture" onChange={handleChange}/>
            <input type="text" placeholder="City" name = "city" onChange={handleChange}/>
            <input type="text" placeholder="Website" name = "website" onChange={handleChange}/>*/}
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
