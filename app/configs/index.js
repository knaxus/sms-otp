'use strict';
// all the site configurations are stored here 
let env = process.env.NODE_ENV || 'development';
let port = 3000;
console.log('****Working environment : ', env)

if(env === 'development') {
    process.env.PORT = port;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/OTPService';
}
else if (env === 'test') {
    process.env.PORT = port;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/OTPServiceTest';    
}
