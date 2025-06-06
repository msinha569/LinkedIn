import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";


export const getSuggestedConnections = async(req,res) => {
    try {
       const currectUser = await User.findById(req.user._id).select('connections')

       const suggestedUser = await User.find({
        _id : {
            $ne: req.user._id,
            $nin: currectUser.connections
        }
       })
       .select("name username profilePicture headline")
       .limit(3)

       res.status(201).json(suggestedUser)
    } catch (error) {
        console.log("error while getting suggestions",error);
        res.status(500).json({message: "server error"})
    }
}

export const getPublicProfile = async(req,res) => {
    try {
        const requiredUser = await User.findOne({username: req.params.username}).select('-password')
        if(!requiredUser) return res.status(400).json({message: "user not found"})
        
        res.status(201).json(requiredUser)
    } catch (error) {
        console.log("error fetching public profile:",error);
        res.status(500).json({message: "server error"})
    }
}

export const updateProfile = async(req,res) => {
    try {
        const allowedFields = [
            "name",
			"username",
			"headline",
			"about",
			"location",
			"profilePicture",
			"bannerImg",
			"skills",
			"experience",
			"education",
        ]
        
        const updatedData = {}
        
      
        for(const field of allowedFields) {
            if (req.body[field]){
                updatedData[field] = req.body[field]
            }
        }

        if(req.body.profilePicture){
            const result = await cloudinary.uploader.upload(req.body.profilePicture)
            updatedData.profilePicture = result.secure_url
        }

        if(req.body.bannerImg){
            const result = await cloudinary.uploader.upload(req.body.bannerImg)
            updatedData.bannerImg = result.secure_url
        }
        
        const user = await User.findByIdAndUpdate(req.user._id,
           {
             $set: updatedData
           },
           {
            new: true
           }
        ).select('-password')
        
        res.status(201).json(user)

    } catch (error) {
        console.log("error updating profile:",error);
        res.status(500).json({message: "server error"})
    }
}