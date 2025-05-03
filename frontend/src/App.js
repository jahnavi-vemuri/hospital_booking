import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Appointments from "./components/Appointments"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/book" element={<Appointments/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
