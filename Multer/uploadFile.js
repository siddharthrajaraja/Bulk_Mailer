var multer = require('multer')
var fs =require('fs')

var storage =  multer.diskStorage({
    destination: async (req, file, cb)=> {
       
        var directory='./assets/uploads/'
        if(!fs.existsSync(directory))
            {
              fs.mkdirSync(directory)
               cb(null, directory)
            }
        else{

              cb(null,directory)
            }
     },
    
     filename: async function (req, file, cb){
        file.originalname='emailList1.csv'
        req.body['latestFile']=file.originalname
        cb(null,file.originalname);
     }
  })


var uploads = multer({ storage: storage })
module.exports={uploads}