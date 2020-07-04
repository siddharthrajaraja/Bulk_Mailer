var {addToRMQ}=require('./readFile')

module.exports.readFileToQueue=async(req,res)=>{
    console.log(req.body)
    var filePath='../../bulk-emailing-system/assets/uploads/'+req.body.fileName.latestFile;
    var emailBody=req.body.fileName.emailBody
    //await new Promise(resolve => setTimeout(resolve, 20000));
    await addToRMQ(filePath,emailBody)
    console.log("I am inside readFileToQueue");
    res.status(200).send({})
}