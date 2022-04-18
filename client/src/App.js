import './App.css';
import DisplayAll from "./components/DisplayAll";
import NewGrocery from './components/NewGrocery';
import DisplayOne from './components/DisplayOne';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditGrocery from './components/EditGrocery';
import Profile from "./components/Profile";
import LogReg from "./views/LogReg";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<LogReg/>} path="/"/>
          <Route  element={<DisplayAll/>} path="/home" />
          <Route element={<NewGrocery />} path="/new" />
          <Route element={<DisplayOne/>} path="/grocery/:id"/>
          <Route element={<EditGrocery/>} path="/grocery/edit/:id"/>
          <Route element={<Profile/>} path="/user/profile/:username"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
