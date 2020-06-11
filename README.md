# GPT-2-Crypto NLP Task
Can a Natural Language Model be used to predict Bitcoin movement? Is GPT-2 a Proto Artificial General Intellegence capable of predicting binary Bitcoin price movement.

Language Transformers are one of the most exciting and mysterious use cases for machine learning Neural Nets. Giving us the ability to essentially talk to Artificial Intelligence. From Open AI's [Better Language Models and Their Implications](https://openai.com/blog/better-language-models/ "Better Language Models and Their Implications") "Our model, called GPT-2 (a successor to GPT), was trained simply to predict the next word in 40GB of Internet text." To play with GPT2 check out [Talk to Transformer](https://talktotransformer.com/ "Talk to Transformer")

GPT-2 is a type of language model "capable of achieving state-of-the-art results on a set of benchmark and unique natural language processing tasks that range from language translation to generating news articles to answering SAT questions."


I think it was spoken about on Kevin Scott's podcast [Behind the Tech](https://www.microsoft.com/en-us/behind-the-tech "Behind the Tech") that under a lot of the abstraction and mystery of language models, all they are doing is pattern recognition predicting the next character which after enough characters are successfully computed gives us the perception of speech. 

This concept has been further demonstrated with GPT-2's ability, after feeding it enough data, to even cross language barriers or [Generate Pokemon](https://imgur.com/a/Vk0pheg "Generate Pokemon")!

That being said we wanted to see if there was a way to __study GPT-2's pattern recognition ability__. If it's possible to leverage the Neural Net to predict the future and do this in a simple and binary format. With this criteria in place it because convenient to test this programatic hypothesis on the BITCOIN market.

The program primarily uses Node / Javascript to retrieve the market data and parse the response with the machine learning portion being a tiny python script using the GPT-2 Simple package.
[Jack](https://twitter.com/jack?s=20) on BTC "We have something that is pretty organic in nature and very principled in its original design...*It's poetry.*"


# Setup
1. Clone or Download GPT-2-Crypto


2. Clone or Download GPT-2-Crypto-Checkpoint
[Gitlab-checkpoint](https://gitlab.com/M4pSK/gpt2-server-incrament-checkpoint)

- Move /GPT-2-Crypto-Checkpoint/Checkpoint -> /GPT-2-Crypto 


3. Clone or Download GPT-2-Crypto-Model
[Gitlab-Gpt-2-Model](https://gitlab.com/M4pSK/gpt2-server-incrament-model)

- Move /GPT-2-Crypto-Model/Model -> /GPT-2-Crypto 


## Install Node Dependencies

```$ npm install```


## Install Python Modules

```$ pip install gpt-2-simple```

# Runtime
```Time Stamp: May 15, 2020 7:10 PM

Unix Stamp: 1589569800

Previous BTC Price: 9488.88532808

Current BTC Price: 9504.92062577

TradeStatus Previous: 1

Binary Current: 1

Input Length Check: 1935

Input will readjust in 66 hours

binaryInput: "10100111010111...101000101011"

Binary Input Length: 1937

ूੂ✧Loading GPT-2...

✧A ूੂI ूੂ✧: Loading checkpoint checkpoint/run1/model-845

✧A ूੂI ूੂ✧: 10100111010111...101000101011

✧A ूੂI ूੂ✧: 00011001001011...1001000100100

✧A ूੂI ूੂ✧: None

GPT2 Output Data: "10100111010111...10100010101110000"

Trade Log Position: 1936

GPT2__Predict: 0

GPT2 Output Data: 0

Market Outcome: 1

Time Stamp: May 15, 2020 7:15 PM

Unix Stamp: 1589570101 
```

# Run GPT-2-Crypto on Hourly Schedule
GPT-2 Runs on an hourly Cron Schedule but needs to be kept running using one of the following methods

### FOREVER

Show current jobs running on forever

```$ forever list```


Add  Task

```$ forever index.js```


Show Data

```$ /home/future/.forever/[foreverOutput].log```


Restart Bot

```$ forever restart index.js```


### CRONTAB

Stup crontab to restart program every hour

```$ sudo crontab -e```


Add to crontab file

```$ */36 * * * * restart /home/future/Code/DARK-labs/Projects/c-ai/C-AI_repo/M4pSK/M4pSK/build.sh```


Give cronjob access

```$ chmod +x /home/future/Code/DARK-labs/Projects/c-ai/C-AI_repo/M4pSK/M4pSK/build.sh```


### PM2 Methods

start pm2

```$ pm2 start index.js```


Start pm2 restarting script

```$ pm2 start pm2```

Monitor pm2

```$ pm2 monit```
