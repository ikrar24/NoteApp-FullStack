import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true, 
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, 
    },
    bio:{
type:String
    },

    profileImage: [
      {
        Image: {
          type: String,
          default: "https://res.cloudinary.com/dq2hmndgb/image/upload/v1753708806/userImage_lru2g2.png"
        },
        imageName: {
          type: String,
          default: "userImage_lru2g2"
        }
      }
    ],

    token: {
      type: String,
    },

     notes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "notes"
    }]
  },
  { timestamps: true }
);

const UseSchema = mongoose.model("userData", UserSchema);
export default UseSchema;
