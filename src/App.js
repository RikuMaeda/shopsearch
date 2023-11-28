import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import SearchResult from "./component/SearchResult";
import ShopInformation from "./component/ShopInformation";


function App(){
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path ="/" element={<Home />}></Route>
        <Route path ="/searchresult" element={<SearchResult />}></Route>
        <Route path ="/shopinformation/:id" element={<ShopInformation />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
