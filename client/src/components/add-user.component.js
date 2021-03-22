import React, { Component } from 'react';
import axios from 'axios';
import config from '/../client'

export default class AddUser extends Component {

  handleClick() {
    // https://www.getpostman.com/oauth2/callback
    window.location.assign('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86v9yatb2xieha&redirect_uri=http://127.0.0.1:3000/add&state=pct_zeta&scope=r_liteprofile%20r_emailaddress');
  }

  async plsWork(){
    let accessTok = await this.getAccess();
    console.log("accessTok1: " + accessTok);

    // how to get access token from front to back ?? this post req doesn't work
    var data = {accessToken: accessTok}
    axios.post('/users/add', data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response));
  }

  async getAccess(){ 
    let authCode = this.getParams();
    console.log("authCode " + authCode);

    return axios.post(`https://www.linkedin.com/oauth/v2/accessToken?code=${authCode}&grant_type=authorization_code&redirect_uri=http://127.0.0.1:3000/add&client_id=86v9yatb2xieha&client_secret=${config.client_secret}`)
      .then(res => res.data.access_token);
    
  }

  getParams() {
    var params = {};
    var parser = document.createElement('a');
    parser.href = window.location.href;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    // console.log(params['code']);
    return params['code'];
  }


  async doAll(){
    let accessTok = await this.getAccess();
    console.log("accessTok2: " + accessTok);

    let userInfo = await this.getUserData(accessTok);
    console.log("userInfo: " + userInfo);
    // let email = await this.getEmail();

    // lastName: "last",
    // firstName = "first",
    // profilePic = "profilePic",
    // email = "email"

    // axios.post('http://localhost:5000/users/add')
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err));

  }


  async getUserData(accessTok){
    return axios({
      url: "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessTok}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    }).then(res => res.data);
  }
  
  // async getEmail(accessTok){
  //   const emailOptions = {
  //     host: "api.linkedin.com",
  //     path: "/v2/emailAddress?q=members&projection=(elements*(handle~))",
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${accessTok}`,
  //       "cache-control": "no-cache",
  //       "X-Restli-Protocol-Version": "2.0.0"
  //     },
  //   };
  //   var emailData = "";
  //   const emailRequest = https.request(emailOptions, function (res) {
  //     let data = "";
  //     res.on("data", (chunk) => {
  //       data += chunk;
  //     });
    
  //     res.on("end", () => {
  //       emailData = JSON.parse(data);
  //     });
  //   });
  //   emailRequest.end();
  // }

    
  render() {

    return (
      <div>
        <h4>Add Your Profile</h4>
        <p>
          <button onClick={() => this.handleClick()}>
            Sign In
          </button>
        </p>
        <p>
          <button onClick={() => this.plsWork()}>
            Get Authorization
          </button>
        </p>
      </div>
    )
  }
}