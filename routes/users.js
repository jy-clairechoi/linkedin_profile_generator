const router = require("express").Router();
const User = require("../models/user.model");
const https = require("https");


router.post("/add", req => {
  var accessTok = req.body.accessToken;
  console.log("accessToken: " + accessTok);

  const emailOptions = {
    host: "api.linkedin.com",
    path: "/v2/emailAddress?q=members&projection=(elements*(handle~))",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessTok}`,
      "cache-control": "no-cache", 
      "X-Restli-Protocol-Version": "2.0.0",
      "Access-Control-Allow-Origin":  "http://127.0.0.1:3000",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  };
  var emailData = "";
  https.request(emailOptions, function (res) {
    emailData = res.data.elements[0]["handle~"].emailAddress;
    console.log("emailData " + emailData);
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
  
    res.on("end", () => {
      emailData = JSON.parse(data);
    });
  });
  emailRequest.end();

  var userData = "";
  const profileRequest = https.request(options, function (res) {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
    userData = JSON.parse(data);
    });
  });
  profileRequest.end();

  // var lastName = req.body.lastName;
  // var firstName = req.body.firstName;
  // var profilePic = req.body.profilePic;
  // var email = req.body.email;

  var lastName = userData.lastName.localized.en_US;
  var firstName = userData.firstName.localized.en_US;
  var profilePic = userData.profilePicture["displayImage~"].elements[0].identifiers[0].identifier;;
  // if (userData.profilePicture != undefined){
  //   profilePic = userData.profilePicture["displayImage~"].elements[0].identifiers[0].identifier;
  // }
  var email = emailData.elements[0]["handle~"].emailAddress;

  console.log(lastName)

  const newUser = new User({ lastName, firstName, profilePic, email });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
  // });
});

router.get("/", (req, res) => {
  // mongoose method that gets a list of all users from db
  // find method returns a promise
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    // .then(() => res.json('User deleted'))
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/update/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      user.lastName = req.body.lastName;
      user.firstName = req.body.firstName;
      user.profilePic = req.body.profilePic;
      user.email = req.body.email;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch(next);
    })
    .catch(next);
});


module.exports = router;
