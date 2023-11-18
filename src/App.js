import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/about' element={<About/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
