const { PythonShell } = require("python-shell");
const fs = require('fs');

let GPT2Output = '';

function CryptoBot(tradeStatusPrev, GPT2InputMessage) {
    console.log('binaryInput: ' + GPT2InputMessage)

    //? Python JS Management
    //* GLHF
    //*************************** */
    let lead = tradeStatusPrev.toString();

    //* Update Input Length val
    inputLen = GPT2InputMessage.length;
    console.log('Binary Input Length: ' + inputLen);
    console.log(' ूੂ✧Loading GPT-2...');

    //?[Step 2.0]
    //? Python GPT-2 Run
    //** Run Python script.py */
    //*  https://ourcodeworld.com/articles/read/286/how-to-execute-a-python-script-and-retrieve-output-data-and-errors-in-node-js
    let pyshell = new PythonShell('gpt-2crypto.py');
    // var options = { pythonPath: '/usr/local/bin/python3\r' };

    pyshell.send(GPT2InputMessage);

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log('✧A ूੂI ूੂ✧: ' + message);
        //?[Step 2.1]
        //? Log GPT-2 Response to Database
        //** dbGPT2Log.json */
        GPT2Output = message;

        if (message != "None" && message.length > inputLen) {
            // Remove non numbers
            let mf0 = message.replace(/\D/g, '');
            // Remove numbers except 0 & 1
            let mf1 = mf0.replace('2', '');
            let mf2 = mf1.replace('3', '');
            let mf3 = mf2.replace('4', '');
            let mf4 = mf3.replace('5', '');
            let mf5 = mf4.replace('6', '');
            let mf6 = mf5.replace('7', '');
            let mf7 = mf6.replace('8', '');
            let mf8 = mf7.replace('9', '');
            // Remove spaces
            let mf9 = mf8.replace(/\s/g, '')

            let jsonTradeStatusReWrite = { "tradeStatus": mf9 }
            fs.writeFileSync("./dataRun/dbGPT2Log.json", JSON.stringify(jsonTradeStatusReWrite))

        } else {
        }
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        fs.readFile("./dataRun/dbGPT2Log.json", function (err, data) {
            let GPT2OutputDataRaw = JSON.parse(data)
            let GPT2OutputData = JSON.stringify(GPT2OutputDataRaw.tradeStatus);
            console.log('GPT2 Output Data: ' + GPT2OutputData)

            //? Get input length 
            //* Use input length to identify the prediction position 
            let processLen = inputLen - 1;
            console.log('Trade Log Position: ' + processLen)
            let GPT2Predict = GPT2OutputData.charAt(processLen);
            console.log('GPT2__Predict: ' + GPT2Predict);

            let GPT2PredictPos = { "tradeStatus": GPT2Predict, "hedgerStatus": "open" }
            fs.writeFileSync('./dataRun/dbTradeStatus.json', JSON.stringify(GPT2PredictPos), 'utf-8')
            GPT2Input = JSON.stringify(GPT2PredictPos);

            if (err) {
                throw err;
            };
        })
    })
}

module.exports = CryptoBot;
