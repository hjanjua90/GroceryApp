import './App.css';
import DisplayAll from "./components/DisplayAll";
import NewGrocery from './components/NewGrocery';
import New from './components/New';
import DisplayOne from './components/DisplayOne';
import Edit from './components/Edit';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route  element={<DisplayAll/>} path="/" />
          <Route element={<New />} path="/new" />
          <Route element={<DisplayOne/>} path="/grocery/:id"/>
          <Route element={<Edit/>} path="/grocery/edit/:id"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
