var async = require('async');
const fs = require('fs');

const Binance = require('binance-api-node').default
require('dotenv').config();
const Moment = require('moment');

//? Initiate Active Runtime
//* 'node activeRuntime.js' to run without cron timer
function activeRuntime() {
    //? Authenticate Binance API
    const client = Binance()
    // Authenticated client, can make signed calls
    const client2 = Binance({
        apiKey: process.env.BNB_API_KEY,
        apiSecret: process.env.BNB_API_SECRET,
    })

    console.log(' GPT-2-Crypto Active')

    //? Get Time
    //* read from Moment
    async function getTime() {
        //? Timestamp
        let timeStamp = Moment().format('lll');
        let unixStamp = Moment().unix();
        console.log('Time Stamp: ' + timeStamp)
        console.log('Unix Stamp: ' + unixStamp)
    }

    //? Get Previous Position
    //* read from dbTradeStatus.json
    let tradeStatusPrev = "";
    // let futureSellData = false;
    async function getPrevTradeStatus() {
        fs.readFile('./dataRun/dbTradeStatus.json', function (err, data) {
            let json = JSON.parse(data)
            let tsData = json.tradeStatus;
            tradeStatusPrev = tsData;

            console.log('TradeStatus Previous: ' + tradeStatusPrev);
        })
    }

    //?Get Previous Price
    let previousPrice = 0;
    async function getPrevPrice() {
        fs.readFile('./dataRun/dbRun.json', function (err, data) {
            var json = JSON.parse(data)
            previousPrice = json.tradePrice;

            console.log('Previous BTC Price: ' + previousPrice);
        })
    }

    //?Get Crypto Price
    //* using Binance API */
    let currentPrice = 0;
    async function getCurrentPrice() {
        let getPrice = await client.avgPrice({ symbol: 'BTCUSDT' });
        currentPrice = getPrice.price;

        console.log('Current BTC Price: ' + currentPrice);
    }

    //? Get Position + Current Crypto Price
    //? MAKE BINARY FOR LOG NOT FOR TRADING
    let binaryCur = 0;
    async function makeBinary() {
        //!//** Binary Logic */
        if (previousPrice < currentPrice) {
            binaryCur = 1;
        }
        else if (previousPrice > currentPrice) {
            binaryCur = 0;
        }
        else {
            binaryCur = 1;
        }
        console.log('Binary Current: ' + binaryCur);
    };

    //? Logs TradePrice dbRun
    //? Price since Previous hour
    async function currentPriceDbPush(priceCur) {
        let jsonDbReWrite = { "tradePrice": priceCur }
        fs.writeFileSync('./dataRun/dbRun.json', JSON.stringify(jsonDbReWrite), 'utf-8')
    }


    let binaryLog = 0;
    let GPT2InputMessage = '';
    let GPT2Predict = '';
    let binaryLogRaw = '';
    let inputLen = 0;
    async function binaryDbPush() {
        //? Read binary Data
        fs.readFile('./dataRun/dbBinary.json', function (err, data) {
            var jsonDbBinary = JSON.parse(data)
            binaryLogRaw = JSON.stringify(jsonDbBinary.binaryLog);

            //? Replace odd characters from Python Transfer
            let bL = binaryLogRaw.replace(/,/g, "");
            let bL0 = bL.replace('[', '');
            let bL1 = bL0.replace(']', '');
            let bL2 = bL1.replace(/['"]+/g, '');
            binaryLog = bL2.concat(binaryCur.toString());

            //? Keep Binary Input in Zone
            let binaryLogTreat;
            let trimInputLen = binaryLog.length;
            console.log(`Input Length Check: ${trimInputLen}`);
            if (trimInputLen >= 2000) {
                console.log('Trimming Input Length Back to 1900');
                let blZone = binaryLog.substring(100)
                binaryLogTreat = blZone

            } else {
                binaryLogTreat = binaryLog;
                console.log(`Input will readjust in ${2000 - trimInputLen} hours`)
            }
            binaryInput = JSON.stringify(binaryLog);

            let binaryInputJsonWrite = { "binaryLog": binaryLogTreat }
            fs.writeFileSync('./dataRun/dbBinary.json', JSON.stringify(binaryInputJsonWrite), 'utf-8')
            GPT2InputMessage = JSON.stringify(binaryInputJsonWrite);
        })
    }


    async.parallel([
        function (callback) {
            setTimeout(function () {
                getTime();
                callback(null, 1);
            }, 0);
        },
        function (callback) {
            setTimeout(function () {
                getPrevPrice();
                callback(null, 1);
            }, 0);
        },
        function (callback) {
            setTimeout(function () {
                getCurrentPrice();
                callback(null, 1);
            }, 2000);
        },
        function (callback) {
            setTimeout(function () {
                makeBinary();
                callback(null, 1);
            }, 7000);
        },
        function (callback) {
            setTimeout(function () {
                binaryDbPush(tradeStatusPrev);
                callback(null, 1);
            }, 9000);
        },
        function (callback) {
            setTimeout(function () {
                currentPriceDbPush(currentPrice);
                callback(null, 1);
            }, 10000);
        },
        function (callback) {
            setTimeout(function () {
                const CryptoBotStudy = require("./cryptoBot.js")
                CryptoBotStudy(tradeStatusPrev, GPT2InputMessage);
                callback(null, 1);
            }, 10200);
        }
    ])
};

// Uncomment ⬇ to run off schedule
// activeRuntime()

module.exports = activeRuntime;
