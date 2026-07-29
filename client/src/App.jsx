import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { appRouter } from "./routes/router";
function App() {

  return <div>
    <Toaster />
    <RouterProvider router={appRouter} />
  </div>

}

export default App
