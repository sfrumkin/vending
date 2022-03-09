const path = require('path'); 
module.exports = { 
    target: "node", // aws lambda run on Node.js 
    entry: "./src/addVending.js", // entry point of app 
    output: { 
        // umd allows our code to be run by AWS Lambda 
        libraryTarget: 'umd', 
        path: path.resolve(__dirname, "../build/addVending"), 
        filename: "addVending.js" 
    }
};



