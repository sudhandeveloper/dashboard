import "./App.css";
import SignIn from "./views/commponents/auth-components/Signin"; 
import SignUp from "./views/commponents/auth-components/Sign-Up";  
import Dashboard from "./views/pages/dasbordpage/dashboard"; 
import EmployeeForm from "./views/pages/employee-form-page/employee-form";
import Dashboardpageone from "./views/pages/dasbordpage/main-pages/dashboard-page-one";
import { Route, Routes } from "react-router-dom";

function App() {
  return (

    <>
    
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardpageone" element={<Dashboardpageone />} />
        <Route path="/employeeForm" element={<EmployeeForm />} />
      </Routes>
    </>
  );
}

export default App;
