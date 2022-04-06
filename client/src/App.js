import './App.css';
import DisplayAll from "./components/DisplayAll";
import NewGrocery from './components/NewGrocery';
import DisplayOne from './components/DisplayOne';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditGrocery from './components/EditGrocery';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route  element={<DisplayAll/>} path="/" />
          <Route element={<NewGrocery />} path="/new" />
          <Route element={<DisplayOne/>} path="/grocery/:id"/>
          <Route element={<EditGrocery/>} path="/grocery/edit/:id"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
