var {addToRMQ}=require('./readFile')
var {readBody}=require('./readEmailBody')

module.exports.readFileToQueue=async(req,res)=>{
    console.log(req.body)
    var flag=0
    if(req.body.fileName.emailBody==''){
        await readBody().then(data=>{
            req.body.fileName.emailBody=data;
        })
        flag=1
    }

    var filePath='../../bulk-emailing-system/assets/uploads/'+req.body.fileName.latestFile;
    if(flag)
        var emailBody=req.body.fileName.emailBody.rawHTML
    else 
        var emailBody=req.body.fileName.emailBody
        //await new Promise(resolve => setTimeout(resolve, 20000));
    await addToRMQ(filePath,emailBody)
    console.log("I am inside readFileToQueue");
    res.status(200).send({})
}