import UserSchema from "../../Schema/User.Schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const User = await UserSchema.findOne({ email }).populate("notes");
    if (!User) {
      return res.status(404).json({ message: "User does not exist. Please sign up first" });
    }

    // Compare password
    const isMatchPass = await bcrypt.compare(password, User.password);
    if (!isMatchPass) {
      return res.status(401).json({ message: "Password or email is invalid" });
    }

    // Create JWT token
    const jwtToken = jwt.sign(
      { emailData: email, userID: User._id },
      process.env.TOKEN_SECRETE,
      { expiresIn: "30d" }
    );

    // Set cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("authToken", jwtToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Prepare user data without password
    const { password: removed, ...UserData } = User._doc;

    // Send both cookie & token with user data
    res.status(200).json({
      message: "Login Successfully",
      authToken: jwtToken,       // <-- sending token in response
      user: UserData,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default UserLogin;
