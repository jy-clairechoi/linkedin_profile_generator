import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import UserList from "./components/user-list.component";
import AddUser from "./components/add-user.component";
// import EditUser from "./components/edit-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={UserList} />
        <Route path="/add" component={AddUser} />
        {/* <Route path="/edit" component={EditUser} /> */}
      </div>
    </Router>
  );
}

export default App;
