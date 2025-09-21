import mongoose from "mongoose";
const Notes = mongoose.Schema(
    {
        title:{
            type:String,
            require:true
        }
         ,
        image:[{
            imageUrl: String, 
            fileName: String
        }],
        allDecriptions:{
            type:String
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"userData"
        }
    },{
        timestamps: true
    }
)


const NoteSchema = mongoose.model("notes" , Notes)
export default NoteSchema
