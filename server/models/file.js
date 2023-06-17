const mongoose=require('mongoose');

const fileSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    value:{
        type:String
    },
    icon:{
        type:String
    }
});

const File=mongoose.model('File',fileSchema);
module.exports=File;

