const cron = require('node-cron');

function active() {
    //?Runs every hour 0 min
    cron.schedule('0 * * * *', () => {
        const activeRuntime = require("./activeRuntime")
        activeRuntime();
    })
};

module.exports = active;