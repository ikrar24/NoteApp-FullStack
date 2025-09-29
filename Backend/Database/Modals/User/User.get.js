import UseSchema from "../../Schema/User.Schema.js";
import jwt from "jsonwebtoken"; // spelling was 'jswt', fixed
import dotenv from "dotenv";

dotenv.config();

const GetUser = async (req, res) => {
  // const { authToken } = req.body;
  // console.log("hithua ");
  
  try {
    const token = req.cookies.authToken // ✅ fixed

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRETE);
    const userID = decodedToken.userID;

    
    
    
    const findUser = await UseSchema.findById(userID).select("-password").populate("notes");


    // console.log("Updated User with Notes:", findUser);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Success", user: findUser });
  } catch (error) {
    console.error("GetUser Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default GetUser;
