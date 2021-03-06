import util from "util"
import multer from "multer"

/**
 * Setup multer to handle image uploads
 *
 */

let strorage = multer.diskStorage({
    //store image locally
    destination: (req, file, dest) => {
        dest(null, "C:/Users/me/Documents/Uni 2021.2/3813ICT/goosechat/server/profileImages")
    },
    //filepath is userID
    filename: (req, file, fName) => {
        let userId = req.params.userId
        let extension = file.mimetype.split("/")[1]
        let pathfile = userId +"."+ extension
        fName(null, pathfile)
    }
})

let uploadFile = multer({
    storage: strorage,
}).single("profileimage")

export let fileUploadManager = util.promisify(uploadFile)