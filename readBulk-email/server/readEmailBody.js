var fs=require('fs')
var DomParser=require('dom-parser')
var parser= new DomParser()

module.exports.readBody=async()=>{
    var filePath='../../bulk-emailing-system/assets/uploads/emailBody.txt'
    var emailBody= fs.readFileSync(filePath,{encoding:'utf-8',flag:'r'})
    //console.log(emailBody)
    var dom=parser.parseFromString(emailBody)
    return dom
}

//console.log(readBody())
