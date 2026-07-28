import { useState } from "react";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import Navbar from "./Navbar";
import axios from "axios"
function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodoHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/todo", { title }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,

      });

      console.log(res)

      if (res.success) {

      }
    } catch (error) {
      console.log(error)
    }
    // console.log(title , description);
  }
  return (
    <>
      <Navbar />
      <div className="flex items-center gap-5 ">
        <Input value={title}
          onChange={(e) => { setTitle(e.target.value) }} className="w-1/4" type="text" placeholder="Add a new todo..." />
        <Button onClick={addTodoHandler}>
          <Flame className="mr-2 h-4 w-4" />
          Add Todo
        </Button>
      </div>
      <Textarea value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Write a description..." className="w-1/4 m-2" />


    </>

  )
}

export default Home