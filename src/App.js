import "./App.css";
import Home from "./Components/Home";
import Userpage from './Components/Userpage'
import "@shopify/polaris/build/esm/styles.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Userpage/>} />
      </Routes>
    </div>
  );
}

export default App;
