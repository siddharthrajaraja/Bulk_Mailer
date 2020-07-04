var amqp=require('amqplib/callback_api')

var {mail}=require('../Nodemailer/mail')
/*module.exports.*/
//module.exports.


var consumer=()=>{
    try{

        amqp.connect('amqp://localhost',(err0,connection)=>{
            if(err0)throw err0;
            
            connection.createChannel((err1,channel)=>{
                if(err1)  throw err1;
                var queue='toi-Emails'
                
                channel.assertQueue(queue,{durable:false})
                channel.consume(queue,async(message)=>{
                    
                var data=await JSON.parse(message.content.toString())
                    
                    
                await console.log("Received Message :",data[0])
                    
                    var receiverEmailID=data[0].emailID;
                    var emailBody=data[0].emailBody;

                    
                    var mail_heading = "Notification";
                    
                    var html = `${emailBody}`;
        

                    var from = 'Templesofindia-noreply <noreply@templesofindia.org>';
                    var replyTo = 'Support - TemplesofIndia <support@templesofindia.org>';

                    var mailbody_html = "Hello " + receiverEmailID + ". We are glad to connect with you ." + html;
                    var mailbody_text = "Hello " + receiverEmailID + ". We are glad to connect with you ." + html;
                    
                    mail(from, receiverEmailID, null, replyTo, mail_heading, mailbody_text, mailbody_html).catch(console.error);
                    console.log("Email sent !!")
                    

                },{
                    noAck:true // If message is unsuccesfull then Ack is not received and message is requeued back to RabbitMQ
                })

            })

            setTimeout(()=>{
                connection.close()
                //process.exit(0)
            },5000)

        })
        return 1;

    }
    catch{
        return 0;
    }
    return 1;
}

consumer()