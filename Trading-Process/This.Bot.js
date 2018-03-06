﻿exports.newThisBot = function newThisBot(BOT, DEBUG_MODULE) {

    let bot = BOT;

    const MODULE_NAME = "This.Bot";
    const LOG_INFO = true;

    logger.fileName = MODULE_NAME;
    logger.bot = bot;

    interval = {
        initialize: initialize,
        start: start
    };

    let botContext;
    let processDatetime;
    let datasource;
    let assistant;

    return interval;

    function initialize(pBotContext, pProcessDatetime, pDatasource, pAssistant, callBackFunction) {

        try {

            logger.fileName = MODULE_NAME;

            /* Store local values. */

            botContext = pBotContext;
            processDatetime = pProcessDatetime;
            datasource = pDatasource;
            assistant = pAssistant;

            logger.write("[INFO] initialize -> Entering function 'initialize' ");

            callBackFunction(null);

        } catch (err) {
            logger.write("[ERROR] initialize -> onDone -> err = " + err);
            callBackFunction("Operation Failed.");
        }
    }

    function start(callBackFunction) {

        try {

            if (LOG_INFO === true) {
                logger.write("[INFO] Entering function 'start'");
            }

            /*

            This is an example. This bot will trade with a pseudo strategy based on candle and volumes stairs patterns.
            Essentially it will look at the patterns it is in at different time periods and try to make a guess if it is a good time to buy,
            sell, or do nothing.

            */

            businessLogic(onDone);

            function onDone(err) {
                try {

                    switch (err) {
                        case null: { 
                            callBackFunction(true);
                        }
                            break;
                        case 'Retry Later': {  // Something bad happened, but if we retry in a while it might go through the next time.
                            logger.write("[ERROR] start -> onDone -> Retry Later. Requesting Execution Retry.");
                            callBackFunction(true, nextIntervalLapse);
                            return;
                        }
                            break;
                        case 'Operation Failed': { // This is an unexpected exception that we do not know how to handle.
                            logger.write("[ERROR] start -> onDone -> Operation Failed. Aborting the process.");
                            callBackFunction(false);
                            return;
                        }
                            break;
                    }

                } catch (err) {
                    logger.write("[ERROR] start -> onDone -> err = " + err);
                    callBack("Operation Failed.");
                }
            }

            function businessLogic(callBack) {

                try {
                    /*

                    First thing we need to know is to see where we are:

                    Do we have open positions?

                    If not, shall we create one?
                    If yes, shall we move them?

                    As this is an example we can assume that we will have only one position, since we will be trading the whole allowed capital all at once.
                    You dont need to do this, you can have as many positions as you wish, and you will find them all at the positions array used below.

                    */

                    if (botContext.executionContext.positions.length > 0) {

                        if (botContext.executionContext.positions[0].type === "buy") {
                            decideAboutBuyPosition(botContext.executionContext.positions[0], callBack);
                        } else {
                            decideAboutSellPosition(botContext.executionContext.positions[0], callBack);
                        }
                        
                    } else {

                        /*

                        Because this is an example, this bot is expected to always have an open position, either buy or sell.
                        If it does not have one, that means that it is running for the first time. In which case, we will create one
                        sell position at a very high price. Later, once the bot executes again, it will take it and move it to a reasonable
                        place and monitor it during each execution round.

                        Lets see first which is the current price.

                        */

                        let candleArray = datasource.candlesMap.get("01-min");  // In this version of the platform, this array will contain the las 10 candles.
                        let candle = candleArray[candleArray.length - 1];       // The last candle of the 10 candles array for the 1 min Time Period.

                        let currentRate = candle.close;

                        /*
                        Now we verify that this candle is not too old. Lets say no more than 5 minutes old. This could happen if the datasets for
                        any reason stops being updated.
                        */

                        if (candle.begin < processDatetime.valueOf() - 5 * 60 * 1000) {

                            const logText = ;
                            logger.write("[WARN] start -> businessLogic -> Last one min candle more than 5 minutes old. Bot cannot operate with this delay. Retrying later.");
                            callBack('Retry Later');
                            return;
                        }

                        /*
                        As we just want to create the first order now and we do not want this order to get executed, we will put it at
                        the +50% of current exchange rate. Next Bot execution will move it strategically.
                        */

                        let rate = candle.close * 1.50;

                        /*
                        The rules of the this first competition states that the bot will have the following initial balance in USDT and BTC to trade with.
                        */

                        const INITIAL_BALANCE_A = 0.0000;
                        const INITIAL_BALANCE_B = 0.0001;

                        let AmountA = botContext.statusReport.initialBalance.amountA;
                        let AmountB = botContext.statusReport.initialBalance.amountB;

                        /* 
                        Here is this bot example, we are going to sell all AmountB at once. You can do this or whatever you think is better.
                        */

                        AmountA = AmountB * rate;

                        assistant.putPositionAtExchange("sell", rate, AmountA, AmountB, writeStatusAndContext, callBack);

                    }
                } catch (err) {
                    logger.write("[ERROR] start -> businessLogic -> err = " + err);
                    callBack("Operation Failed.");
                }
            }

            function decideAboutBuyPosition(pPosition, callBack) {

                try {

                /* For simplicity of this example bot, we will use here the same logic than when we are selling. */

                    decideAboutSellPosition(pPosition, callBack);

                } catch (err) {
                    logger.write("[ERROR] start -> decideAboutBuyPosition -> err = " + err);
                    callBack("Operation Failed.");
                }
            }

            function decideAboutSellPosition(pPosition, callBack) {

                try {
                    /*
    
                    Here is where you decide what to do with your current sell position. Option are:
    
                    1. Do not touch it.
                    2. Move it to another position by changing the rate.
                        a. Up
                        b. Down
                    3. Cancell it. (not yet implemented at the platform.)
    
                    You can use here the information provided, analize it however you want and finally make a decition.
    
                    */

                    let candleArray;
                    let candle;
                    let weight;

                    /*
    
                    Keeping in mind this is an example of traing bot, we are going to put some logic here that in the end will move the current position
                    up or down. It will move it down if the bot feels it is time to sell, and up if it feels that selling is not a good idea.
    
                    To achieve a final rate to move the current position at the exchange, we are going to go through the available candles and patterns
                    and each one is going to make a micro-move, and at the end we will have a final rate to send a move command to the exchange.
    
                    We will use a weight to give more or less importance to different Time Periods.
    
                    ------
                    NOTE: The code below is an example and you should replace it by your own logic. This is the key of your intervention here. 
                    ------
                    */

                    let diff;
                    let variationPercentage;
                    let timePeriodName;

                    let targetRate = pPosition.rate;

                    let weightArray = [1 / (24 * 60), 1 / (12 * 60), 1 / (8 * 60), 1 / (6 * 60), 1 / (4 * 60), 1 / (3 * 60), 1 / (2 * 60), 1 / (1 * 60)];

                    for (i = 0; i < marketFilesPeriods.length; i++) {

                        weight = weightArray[i];

                        timePeriodName = marketFilesPeriods[i][1];

                        candleArray = datasource.candlesMap.get(timePeriodName);
                        candle = candleArray[candleArray.length - 1];           // The last candle of the 10 candles array.

                        diff = candle.close - candle.open;
                        variationPercentage = diff * 100 / candle.open;         // This is the % of how much the rate increased or decreced from open to close.

                        targetRate = targetRate + targetRate * variationPercentage / 100 * weight;

                    }

                    /* Finally we move the order position to where we have just estimated is a better place. */

                    assistant.movePositionAtExchange(pPosition, targetRate, writeStatusAndContext, callBack);

                } catch (err) {
                    logger.write("[ERROR] start -> decideAboutSellPosition -> err = " + err);
                    callBack("Operation Failed.");
                }
            }

        } catch (err) {
            logger.write("[ERROR] start -> err = " + err);
            callBack("Operation Failed.");
        }
    }
};
