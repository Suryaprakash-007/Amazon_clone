const Vonage = require('@vonage/server-sdk');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const logo = require('./image/logo bg w.png')

const sendSMS = (data) => {
  const vonage = new Vonage({
    apiKey: '7b864919',
    apiSecret: 'OA7CMrPKijkOMFsx',
  });

  const { userName, orderId, phone, otp } = data;

  const from = 'Vonage APIs';
  const to = `91${phone}`;
  const text = otp
    ? `${otp} id your Earmerce OTP. Do not share it with anyone.`
    : `Dear ${userName}, Your order is successful with order Id.${orderId}. You will receive confirmation message once your order is shipped. Thank you for shopping with us!`;

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]['status'] === '0') {
        console.log('Message sent successfully.');
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]['error-text']}`
        );
      }
    }
  });
};

// Mail sending function on successfull plcaement of the order
const sendMail = (data) => {
  const { orderId, userName, userMail, orderDate, total } = data;

  // initialize nodemailer
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'projectamazon50@gmail.com',
      pass: 'xrkqsfojdzszfbna',
    },
  });

  // bsnoynqwganbkprz

  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
  };

  // use a template file with nodemailer
  transporter.use('compile', hbs(handlebarOptions));

  var mailOptions = {
    from: ' <projectamazon50@gmail.com>', // sender address
    to: `${userMail}`, // list of receivers
    subject: 'Thank you for shopping with us !',
    template: 'email', // the name of the template file i.e email.handlebars

    context: {
      customerName: userName,
      orderId: orderId,
      orderDate: orderDate,
      total: total,
      logo:logo,
    },
  };
  //trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
  });
};

module.exports = {
  sendSMS,
  sendMail,
};
