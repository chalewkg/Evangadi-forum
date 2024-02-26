const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information " });
  }
  try {
    const [user] = await dbConnection.query(
      "select username,userid from users where username =? or email =?",
      [username, email]
    );
    // return res.json({ user: user });
    //check the user exixt or not
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered" });
    }

    //chekc the password length
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "passwoerd must be at least 8 characteres" });
    }

    //incrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?) ",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "user successfully registered " });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  //   res.send("user login");

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "select username, userid, password from users where email =? ",
      [email]
    );
    // return res.json({ user: user }); //this return the user informatin captured above
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invailed credentail" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invailed credentail" });
    }

    // once the password verification completed - provide jwt
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful", token });

    // return res.json({ user }); // returns the user value selected by email - test
    // return res.json(user[0].password); // returns the given user password - test
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;
  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };
