import { Button } from "../components/ui/button"
function Navbar() {
  return (
    <div className="bg-amber-500 m-5 ">
      <div className=" max-w-6xl  flex  items-center justify-between">
       <h1 className="font-bold text-lg ">{"MERN stack vivek"}</h1>
      <Button >logout</Button>
      </div>
      
    </div>
  )
}

export default Navbar