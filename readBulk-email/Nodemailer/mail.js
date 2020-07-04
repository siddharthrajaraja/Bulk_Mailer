const nodemailer = require('nodemailer');

module.exports.mail = async (from_id, email_id, bcc_id, replyTo_id, subject_mail, message_text, message_html) => {

  //   let transporter = nodemailer.createTransport({
  //    service:'gmail',
  //    //port: 587,
  //    //secure: false, // true for 465, false for other ports
  //    auth: keys.nodemailer.AUTH
  //  });

  let transporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 5,
    host: "mail.templesofindia.org",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'noreply@templesofindia.org',
      pass: 'Vm=lGvkT4cXn'
    },
    dkim: {
      domainName: "templesofindia.org",
      keySelector: "nm",
      privateKey: "-----BEGIN RSA PRIVATE KEY-----MIIEogIBAAKCAQEAt9yGLA3YzrTpxRswMWjEo/LcMl/v9w7Lirwgtwu9dmybC3giSHiPpsaEF5NCr/RJ+TKybWUGliFQhGMGtIDMMcf70rngwdENR0mucSUW8HNli3108DNACrESQ7BesOdXkCRjJYQ+hJg7Bv68EcEgZSO/aKUXzmorXdTuXQ1VOaEIA2tdAWFGE5iGPNOQBbIoE12Nmwl0SvjUxdDJL2EG8jlhdT42j5XJsKnRHtvP8MMGQnXUIKjuIgBggrdspt2pItmKKYPuTGmVDanQBGiMCEV7Cz/l+QxnJ3FHVeDfmzPY4LRhix2hVCSjafg/euU8DBeQwLKBp+XkGLvkEDu4yQIDAQABAoIBAGhWfdGsPff31J2lczDm2oiLfogbx2q1e66MWihmQitdMJNOpm3n9OVYzIcwa2y8venr6jOIXDeASlgGdjyixr4NVgvcrf5vKxDkcFkHCkCDzAFfvae9/b7Tg6DkCqhrcFZ9P8J/jJbkaMLsdj/BECg1JB83aQ4bU+bYujgWI+IiWM3nsIZvlY79bGJ2015RDWyx4qoAxkikRVgW+5w9y/ZGpM1VTwchV4FYlVEBmy7AjwiTJVG1AbRv2J+J+CGQmwlkCGWphwf0gfSaTbYGKcRmv8lHJk3zaNuxSaBNhONStMwpUsBDwtnf82KydxyzkuU1oYo4vW2nPxpYoJBqy10CgYEA1etRRFbAK6xC7rWUZwOHu9fmK4aXyvtK6aVFa57gE27ezEfIfuLQfrxOzXpigaSeP3rX1ntnrdDmMYQxPBn2uJS0LSprW80FpkEdz74rBt3vgMFUx3vui1IR70Be0P3vYcT11XoIiK8UGTM4bPDtqRLRjFJnsvQo9YVLiR2UDxsCgYEA3AeJgED0bvZLplQPd2N66Xho4l3FCbCGWJIK08OxUcKKBcFpGskl+PKwazEruM74l+/5JC4DAkKRUh/XsrYn8viqdj1s8au+QdinKScNdHZfgMTujokqHo2uVCgLQyY/5pe01dT5INapKBKub7E+79wQTRQ/rCpa0V2bFMA0QesCgYBzrScp7DtIooMjMD+KoQcSFcKagNKuacrto3hxpN0IxShnkN2jd6VFEzENvgNslYcZTqVOjzbWcCM6XYB+PpAC6i6wScL6RliquYWUZAJCWVr85g6hPKwW3I9kMAvVuatr1CUXhkD9IKeepOr7RiFODyYPWjRHOe64LZdWEw+QRwKBgH0bjANw64tsX/djNKgd2HWIEZsk1jR8OueBosZmLxzeELzVDH4+gWjcFZPdkY6zoIZD3NXFk9BlKVwY3vyutmhhHAu/QYLotHWcSvALVIs0A3mkgEBrnZdh2A3h9wVnak4jVJ+BSWZyqBwxAx5fGfooltw89zddneYN43AZGZ2hAoGAd8vMEhZJ8ouvUPl0gK/5yJEM2R4yTtBc6R3I7HhqTZtgscIAdwIiy4NfO/L/CimKZk///MzW2nENMdv98jDD9xpZp7rgwvifnNefnw7Z1PKruli8mwQwnCILxRBqY91ZVrOb++o4j1duavJSDg2gqAFyF0tyRdx6c+SOsB7fgAE=-----END RSA PRIVATE KEY-----"
    }
  });

  let info = await transporter.sendMail({
    from: from_id, // sender address
    to: email_id, // list of receivers
    bcc: bcc_id,
    replyTo: replyTo_id,
    subject: subject_mail, // Subject line
    text: message_text, // plain text body
    html: message_html // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


}


//mail('temples.of.india.web@gmail.com',['shrivastavaman171@gmail.com','siddharthraja9849@gmail.com','arun.jrk99@gmail.com','sidharthpandita@gmail.com','ayush.hakmn@gmail.com'],'Email-verification','Another mail').catch(console.error);