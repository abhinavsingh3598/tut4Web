import { useForm } from "react-hook-form";
import axios from "axios";

import "./Form.css";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`https://express-t4.onrender.com/api/login`, {
        username: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate('/grid');
        } 
      })
      .catch((error) => {
        alert("Please give valid user name or password")
        console.log(error);
        
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label htmlFor="name">E-Mail Address</label>
        <input
          placeholder="Enter primary email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
          })}
        />
        <error className="error-text">
          {errors.email?.type === "required" && "Email is required"}
          {errors.email?.type === "pattern" &&
            "Entered email is in wrong format"}
        </error>
      </div>

      <div className="form-control">
        <label htmlFor="name">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern: /^[a-zA-Z0-9!@#_%~?/^*$&()\\-`.+,/\"]*$/,
          })}
        />
        <error className="error-text">
          {errors.password?.type === "minLength" &&
            "Minimum limit is 8 characters"}
          {errors.password?.type === "pattern" &&
            "Entered password is in wrong format"}
        </error> 
      </div>

      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
}
