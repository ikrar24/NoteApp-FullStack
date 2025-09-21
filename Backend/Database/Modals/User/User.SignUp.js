import bcrypt from "bcryptjs";
import UseSchema from "../../Schema/User.Schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const UserSignUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Email ko lowercase karo taaki case-sensitive issue na ho
    const normalizedEmail = email.toLowerCase();

    const userAlready = await UseSchema.findOne({ email: normalizedEmail });

    if (userAlready) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    // ✅ Default image agar file nahi bheji gayi
    const profileImageURL = [
      {
        Image:
          req.file?.path ||
          "https://res.cloudinary.com/dq2hmndgb/image/upload/v1753708806/userImage_lru2g2.png",
        imageName: req.file?.filename || "userImage_lru2g2",
      },
    ];

    const createUser = new UseSchema({
      fullName,
      email: normalizedEmail,
      password: passwordHashed,
      profileImage: profileImageURL,
    });

    await createUser.save();

    const token = jwt.sign(
      { email: normalizedEmail },
      process.env.TOKEN_SECRETE, // check .env me sahi likha ho
      { expiresIn: "30d" }
    );

    // ✅ Yahan response bhejna jaruri hai
    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: createUser._id,
        fullName: createUser.fullName,
        email: createUser.email,
        profileImage: createUser.profileImage,
      },
    });
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export default UserSignUp;
