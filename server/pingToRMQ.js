var axios=require('axios')
var fs=require('fs')


module.exports.pingToRMQ=async(req,res)=>{
   console.log("Inside the RMQ")
   if(req.body.password!='admin12345'){
      try{
         await fs.unlink('./assets/uploads/emailList1.csv',(err)=>{
            if(err) throw err;
           console.log("File Deleted as user-credentials does not match!!")
        })
     
      }
      catch{
         console.log("No file and credentials invalid");
      }
      finally{
         res.redirect('/?status=failure&message=PASSWORD%20MISMATCH')
      }
   }
   else{
      console.log("Before :",req.body)
      if(req.body.manualEmailBody==''){
           req.body.emailBody=''            
      }
      else{
            req.body.emailBody=req.body.manualEmailBody;
         }
      
         //console.log("After :",req.body)
      await axios.post(`http://localhost:${process.env.bulkMailServerPORT}/readFileToQueue`,{fileName:req.body});
      
      await res.redirect('/?status=success&message=FILE%20LOADED%20SUCCESSFULLY')
   }
}