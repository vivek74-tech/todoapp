import { Button } from "../components/ui/button";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
function Navbar() {
   const navigate = useNavigate();
  const logoutHandler = async()=>{
      const res = await axios.post("http://localhost:8000/api/v1/user/logout");
      if(res.data.success){
       toast.success(res.data.message)
       navigate('/login');
      }
    
  }

  return (
    <div className="bg-amber-500 m-5 ">
      <div className=" max-w-6xl  flex  items-center justify-between">
       <h1 className="font-bold text-lg ">{"MERN stack vivek"}</h1>
      <Button onClick={logoutHandler} >logout</Button>
      </div>
      
    </div>
  )
}

export default Navbar