import { Route, Routes } from "react-router-dom";
import StudentTablePage from "./page/StudentTablePage";
import CreateForm from "./page/CreateForm";
import UpdateForm from "./page/UpdateForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentTablePage/>} />
      <Route path="/create" element={<CreateForm/>} />
      <Route path="/update/:studentId" element={<UpdateForm/>} />
    </Routes>
  );
}

export default App;
