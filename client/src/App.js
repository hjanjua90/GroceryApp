import './App.css';
import DisplayAll from "./components/DisplayAll";
import New from './components/New';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route  element={<DisplayAll/>} path="/" />
          <Route element={<New />} path="/new" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
