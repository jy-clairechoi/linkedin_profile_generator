import React, { Component } from "react";
import axios from 'axios';

// import logo from '../profileLogo.png';
import "../styles.css";

const User = props => (
  <tr>
    <td>
      <img className="photo" src={props.user.profilePic} alt='pfp'/>
    </td>
    <td>{props.user.firstName + " " + props.user.lastName}</td>
    <td>{props.user.email}</td>
  </tr>
)

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {users: []};
  }

  componentDidMount(){
    this.getUsers();
  }

  getUsers = () => {
    axios.get('http://localhost:5000/users/')
      .then(res => {
        if(res.data){
          this.setState({
            users: res.data
          })
        }
      })
      .catch(err => console.log(err))
  }
  
  usersList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser}/>;
    })
  }

  render() {
    return (
      <div>
        <p>
          <thead className="thead-light">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            { this.usersList() }
          </tbody>
        </p>
      </div>
    );
  }
}
