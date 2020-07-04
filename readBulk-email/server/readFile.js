var fs=require('fs')
var csvParser=require('csv-parser')
var {producer}=require('../rabbitMQ/producer')

module.exports.addToRMQ=async(filePath,emailBody)=>{
    //var filePath='../../bulk-emailing-system/assets/uploads/emailList1.csv' 
    
    const results=[]

    var soltns=await fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data',(data)=>{
        data['emailBody']=emailBody;
        //console.log(data)
        
        // This will dump the data to to RMQ script

        if(producer(data)){
            console.log(data , "\n Dumped to RMQ");
        }
        else{
            console.log("Error while Dumping data to RMQ");
        }
    
    })
    .on('end',()=>{
        console.log("File Read SuucessFully!!")
    })
}
// var filePath='../../assets/uploads/emailList1.csv';
// var emailBody="Hello Siddharth's Messages!!"
//addToRMQ(/*filePath,*/emailBody)
