import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import Navbar from "./Navbar";
import axios from "axios"
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodoHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/todo", { title, description }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,

      });

      // console.log(res.data)
     
      if (res.data.success) {

        toast.success(res.data.message);
        setTodos([...todos,res.data.todo])
        setTitle("");
        setDescription("");

      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // console.log(title , description);

  }

  const fetchTodo = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/todo");
      if (res.data.success) {
        setTodos(res.data.todo)
        // console.log(res.data.todo);
        // console.log(res.data.todos);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTodo();
  }, []);
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
      <div className="grid grid-cols-5 gap-2 mt-5">

        {
          todos.map((todo) => {
            return (<Card key={todo._id} className="bg-gray-800 text-white" >

              <CardHeader>
                <CardTitle>{todo.title}</CardTitle>
                <CardDescription>{todo.description}</CardDescription>
              </CardHeader>
              
            </Card>)

            //  console.log("hello there");

          })
        }


      </div>



    </>

  )
}

export default Home