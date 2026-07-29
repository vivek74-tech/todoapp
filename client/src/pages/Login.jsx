import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
      
    } catch (error) {
      console.log(error)
      // alert(error.res.data.message);
    }
  };

  return (<div className="max">
      <Input
        type="text"
        name="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={changeHandler}
      />

      <Input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={user.password}
        onChange={changeHandler}
      />

      <Button onClick={loginHandler}>
        Login
      </Button>
    </div>
  );
}

export default Login;