import UserSchema from "../../Schema/User.Schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

 
    

    const User = await UserSchema.findOne({ email }).populate("notes");

    

    if (!User) {
      return res.status(404).json({ message: "User does not exist. Please sign up first" });
    }

    const isMatchPass = await bcrypt.compare(password, User.password);

    if (!isMatchPass) {
      return res.status(401).json({ message: "Password or email is invalid" });
    }

    const jwtToken = jwt.sign(
      { emailData: email , userID: User._id },
      process.env.TOKEN_SECRETE,
      { expiresIn: "30d" }
    );

   
const isProduction = process.env.NODE_ENV === "production";

  res.cookie("authToken", jwtToken, {
  httpOnly: false,
  secure: false,
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});


 



    const { password: removed, ...UserData } = User._doc;

    
    res.status(200).json({ message: "Login Successfully", user: UserData });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default UserLogin;
