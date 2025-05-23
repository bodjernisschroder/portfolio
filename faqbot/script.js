var faqData = [
    {
        category: 'General',
        subcategories: [
            {
                subcategory: 'Account',
                questions: [
                    {
                        question: 'Why are you to cheap compared to other high-end EAs?',
                        answer:'Our goal is to provide high-quality forex EAs at an affordable price for traders of all levels. While some EAs in the market may have higher price tags, we believe that cost should not be a barrier to accessing powerful trading tools. We have optimized our strategies and streamlined our operations to offer competitive pricing without compromising on performance. By keeping our prices accessible, we aim to empower a wider community of traders to benefit from our reliable and effective EAs, ultimately helping them achieve their trading goals.'
                    },
                    {
                        question: 'Are there any additional costs besides the membership fee?',
                        answer:'No, never. Many other programs offer a ton of upsells for this and that, creating a paywall that will leave most members feel left out in the cold. At MMFX, we will never have any upsells. The monthly fee is the only cost to get complete access to everything, and it will stay that way.'
                    },
                    {
                        question: 'What are your different policies?',
                        answer:'We strongly encourage you to take a look at our legal section, to get a full understanding of the conditions, disclaimers, and various policies of MMFX.'
                    },
                    {
                        question: 'Do you offer refunds?',
                        answer:'We value customer satisfaction and strive to deliver a high-quality product and service. While we do not offer refunds, we have implemented a zero commitment payment plan to ensure your peace of mind. With our payment plan, you have the flexibility to cancel your subscription at any time, providing you the freedom to evaluate and assess our program without any long-term commitment. Please note that cancelling your membership will make you lose access to the EA, and it will stop trading on your account.'
                    },
                    
                ]
            },
            {
                subcategory: 'Trading',
                questions: [
                    {
                        question: 'Can I use the EA on multiple trading platforms or accounts?',
                        answer:'The MMFX EA can only be used with MetaTrader5 (MT5). You can however use it on as many accounts as you want at the same time.'
                    },
                    {
                        question: 'Can I use my existing trading account with your EA?',
                        answer:'Yes, our EA is designed to be compatible with various trading accounts, as long as your account operates on the supported platform (MetaTrader 5), you can easily integrate our EA into your existing account without any issues.'
                    },
                    {
                        question:'What are news, and why do we need to be careful?',
                        answer: 'Monitoring and avoiding heavy news events in forex trading is crucial due to the unpredictability and increased volatility these events can cause. They can lead to rapid price movements, fluctuating liquidity, and widened spreads, which can disrupt trading strategies, particularly those used by automated systems like EAs. By avoiding these periods, traders can better manage risk and protect their capital. We highly recommend checking our automated news calendar every week to watch out for heavy news events. You can find it in the main menu of the members area.'
                    },
                ]
            },
            {
                subcategory: 'The MMFX EA',
                questions: [
                    {
                        question: 'Do you update the MMFX EA?',
                        answer:'Whenever we come up with great new ideas, we will release an update and announce it to every member. The current version is the product of years of testing though, so new additions will be rare as the current version is already very comprehensive.'
                    },
                    {
                        question: 'What are the minimum system requirements to run your EA?',
                        answer:'You can run the EA on any device that can run MetaTrader 5.'
                    },
                    {
                        question: 'MMFX EA Backstory',
                        answer:'The MMFX EA, our proprietary trading bot, is the culmination of years of hard work, dedication, and a relentless pursuit of excellence. The journey began with a simple idea - to create a powerful, reliable, and accessible trading tool that could empower traders of all levels. Over the years, our team of experienced traders and skilled programmers worked tirelessly to bring this vision to life. The process was challenging and required a deep understanding of both trading strategies and programming. The result is a sophisticated trading bot that boasts over 10,000 lines of code, making it one of the most complex and comprehensive EAs in the market. The MMFX EA is more than just a trading tool; it\'s a testament to our commitment to quality and innovation. It embodies our belief in the power of technology to transform trading, making it more efficient, profitable, and accessible to everyone. We\'re incredibly proud of what we\'ve created with the MMFX EA. But what gives us the greatest satisfaction is seeing it in action, helping traders navigate the forex market, and achieving their trading goals. The positive feedback and success stories we\'ve received from our users are a constant reminder of why we embarked on this journey. We\'re excited about the future and committed to continuously improving and updating the MMFX EA to ensure it remains at the forefront of trading technology. We\'re grateful to our users for their trust and support, and we look forward to continuing to serve them in the years to come.'
                    },
                ]
            },
        ]
    },
    {
        category: 'Backtesting',
        subcategories: [
            {
                subcategory: 'Setting Up the Backtest',
                questions: [
                    {
                        question: 'How to open the strategy tester in MT5',
                        answer:'Open the Strategy Tester by clicking on \'View\' in the top menu and then selecting \'Strategy Tester\'.'
                    },
                    {
                        question: 'How to install the MMFX EA in MT5',
                        answer:'Download the MMFX EA file from the members area. In MT5, click on \'File\' and then \'Open Data Folder\'. Navigate to \'MQL5\', then \'Experts\' and lastly \'Advisors\'. Paste your MMFX EA into the advisors folder.'
                    },
                    {
                        question: 'How to set up the strategy tester correctly before backtesting',
                        answer:'After opening the Strategy Tester, click on \'Single\'. Choose the MMFX EA, select the symbol you wish to test (we recommend starting with EURUSD), and set the frequency at which the bot looks for trades (M1 = Every minute, M5 = every 5 minutes, etc.). Set the test period to the previous 2-3 months. Leave the \'Use date\' option unchecked. Set the delay to \'last ping to your server is…\'. Set the accuracy to \'Every tick based on real ticks\' for the most accurate results, or \'1 Minute OHLC\' for quicker results. Leave \'profit in pips\' unchecked. Set the account balance for the test to 100k or 200k. Leave the leverage at 1:100. Select the appropriate option from the dropdown for the type of split test you\'re running.'
                    },
                    
                ]
            },
            {
                subcategory: 'Running and Optimizing the Backtest',
                questions: [
                    {
                        question: 'The different optimization types explained',
                        answer:'\'Disabled\': Allows you to run your settings in a backtest without split testing any of the variables.\'Slow Complete Algorithm\': The most accurate way to run split tests. For the 2nd dropdown we always use \'Complex Criterion Max\'.\'Fast genetic based algorithm\': Similar to the above, but where accuracy is sacrificed for speed.\'All symbols selected in MarketWatch\': Similar to \'Disabled\' where it only runs a single test. But here, it does it across all the currency pairs in your Market Watch simultaneously.'
                    },
                    {
                        question: 'How to run a thorough split test (important)',
                        answer:'Go into the settings tab at the bottom, set your optimization to Slow Complete Algorithm, and then go into your Inputs tab and pick what variables you want to split test. Tick the box on the far left side of the lines you want to test, and then pick the range you want to test.'
                    },
                    {
                        question: 'What to look for when picking a winner of a split test',
                        answer:'After running a split test, the results will show up in the \'Optimization\' tab at the bottom. Look for high profit while keeping the drawdown% as low as possible. We recommend using only settings with a drawdown% lower than 5%, preferably under 3%.'
                    },
                    {
                        question: 'How to optimize your newly found winner',
                        answer:'Once you have a promising result, continue to split test different settings to try and increase the profits for the same period chosen, while keeping the drawdown below 3%. Set your ranges in the inputs tab and then click start test.'
                    },
                ]
            },
            {
                subcategory: 'Saving and Applying the Results',
                questions: [
                    {
                        question: 'How to save a report',
                        answer:'After running a backtest with the optimization set to disabled, click on the \'Backtest\' tab at the bottom of your screen. Right click anywhere and pick \'Report\' and then \'HTML (Internet Explorer)\'. Save the report on your computer with a name that\'s easy to remember.'
                    },
                    {
                        question: 'How to save your winning settings as a setfile',
                        answer:'Go into the \'inputs\' tab at the bottom, right click anywhere, andthen click \'Save\'. This will save a setfile that you can upload directly into your live MMFX EA, so you can use your winning settings on the live markets.'
                    },
                    {
                        question: 'What to do when you\'re happy with your winner',
                        answer:'If you\'re satisfied with the outcome and want to try these settings on a live account, right click the winner in the list, click \'Run Single Test\' and let it finish. This will put the results of this particular winner in the \'Backtest\' tab and its settings in the \'Inputs\' tab. Now you simply follow the steps in \'How to save a report\' and \'How to save your winning settings as a setfile\'.'
                    },
                    {
                        question: 'What settings we recommend you to split test',
                        answer:'We recommend trying to run combinations with all of the settings. Not all at the same time, but take them 1 by 1 or just a few at a time, then slowly work your way through until you\'re happy with the outcome.'
                    },
                ]
            },
            {
                subcategory: 'Troubleshooting',
                questions: [
                    {
                        question: 'My backtest is horribly slow, how can I speed it up?',
                        answer:'Make sure you don\'t test more than 1000 combinations in one go. If you tick a lot of settings at the same time, it could go into the hundreds of thousands or even millions of combinations that need testing, which will take a long time. You can check in the bottom right corner of the screen near the start button how many combinations your currently picked settings would run. Try to keep it fairly low! Also, backtesting speed is tied to your computers processing power. If your own personal computer is very slow, then we recommend backtesting through the VPS.'
                    },
                ]
            },
        ]
    },
    {
        category: 'Propfirms',
        subcategories: [
            {
                subcategory: 'General Information about Prop Firms',
                questions: [
                    {
                        question: 'What is a prop firm?',
                        answer:'A prop firm, or proprietary trading firm, is a company that allocates its own capital to its traders to trade on financial markets. The firm\'s traders use the firm\'s resources and capital. We use the Market Momentum FX EA to trade on our behalf using the prop firms money, and then they split the profit with us.'
                    },
                    {
                        question: 'How do prop firms operate?',
                        answer:'Prop firms operate by providing their traders with capital, resources, and tools to trade. The profits from the trades are then split between the trader and the firm, typically on a predetermined percentage basis.'
                    },
                    {
                        question: 'What are the benefits of trading with a prop firm?',
                        answer:'Trading with a prop firm allows traders to access significant capital, which can amplify profits. It also allows traders to learn from experienced professionals, access advanced trading tools, and trade without risking their own money.'
                    },
                    {
                        question: 'What markets do prop firms trade in?',
                        answer:'Prop firms can trade in a variety of markets, including stocks, forex, commodities, futures, and options. We focus exclusively on the Forex market with MMFX.'
                    },
                    
                ]
            },
            {
                subcategory: 'Risk and Profit Management',
                questions: [
                    {
                        question: 'Is there any risk to the user in a prop firm?',
                        answer:'The primary risk to the user in a prop firm is the loss of their time and effort if they are not successful in generating profits. However, since the capital used for trading is the firm\'s, the financial risk is borne by the firm, not the trader.'
                    },
                    {
                        question: 'What is a typical profit split between a trader and a prop firm?',
                        answer:'Profit splits can vary widely, but a common arrangement is a 75/25 with 75% going to you, the trader. This split can go all the way up to 90% depending on the propfirm chosen.'
                    },
                    {
                        question: 'What is a drawdown limit?',
                        answer:'A drawdown limit is a predetermined amount that a trader\'s account can lose before trading is halted. This is a risk management tool used by prop firms to protect their capital.'
                    },
                    {
                        question: 'What happens if I hit the drawdown limit?',
                        answer:'If a trader hits the drawdown limit, trading is typically halted. The trader may then need to review their strategy with the firm\'s risk management team before they can resume trading.'
                    },
                ]
            },
            {
                subcategory: 'Getting Started and Regulations',
                questions: [
                    {
                        question: 'Do I need a qualification or license to trade with a prop firm?',
                        answer:'Nope. What they do is have you go through a trading challenge, where you have to prove your worth in a simulated environment with no real money on the line. If you pass this challenge, they give you an account with real money to trade.'
                    },
                    {
                        question: 'Can I trade remotely with a prop firm?',
                        answer:'Of course, everything takes place from your own device wherever you are!'
                    },
                    {
                        question: 'How do I get started with a prop firm?',
                        answer:'You simply go to one of our recommended prop firms when you\'re ready. You can find the links in the Useful Links section of the members area.'
                    },
                    {
                        question: 'Are prop firms regulated?',
                        answer:'Yes, prop firms are typically regulated by financial authorities in the country where they operate. For example, in the U.S., they may be regulated by the Securities and Exchange Commission (SEC) or the Financial Industry Regulatory Authority (FINRA). It\'s important to check the regulatory status of a prop firm before trading with them to ensure they are operating legally and ethically.'
                    },
                ]
            },
        
        ]
    },
    {
        category: 'Troubleshooting',
        subcategories: [
            {
                subcategory: 'Installation and Setup',
                questions: [
                    {
                        question: 'How to install the MMFX EA in MT5',
                        answer:'Download the MMFX EA file from the members area. In MT5, click on \'File\' and then \'Open Data Folder\'. Navigate to \'MQL5\', then \'Experts\' and lastly \'Advisors\'. Paste your MMFX EA into the advisors folder.'
                    },
                    {
                        question: 'How to set up the strategy tester correctly before backtesting',
                        answer:'Open the Strategy Tester and click on Single. Choose the MMFX EA, select the symbol you wish to test (we recommend starting with EURUSD), and set the frequency at which the bot looks for trades (M1 = Every minute, M5 = every 5 minutes, etc.). Set the test period to the previous 2-3 months. Leave the Use date option unchecked. Set the delay to last ping to your server is…. Set the accuracy to Every tick based on real ticks for the most accurate results, or 1 Minute OHLC for quicker results. Leave \'profit in pips\' unchecked. Set the account balance for the test to 100k or 200k and leave the leverage at 1:100. Use the options in the dropdown to control the type of split test you\'re running and its accuracy.'
                    },
                    {
                        question: 'How do I log into my trading account inside MetaTrader',
                        answer:'Click on File > Login to Trade Account. Then login with the credentials provided by the broker or prop firm you signed up with.'
                    },
                    {
                        question: 'My bot is not on the list inside MetaTrader',
                        answer:'Make sure you\'ve followed the steps to install the MMFX EA in MT5. After doing that, right click on \'Advisors\' in the navigator window and click Refresh. The MMFX EA should appear in the list.'
                    },
                    {
                        question: 'How do I open the bot settings on the chart?',
                        answer:'If you\'re on a windows computer, press F7 while the chart with the bot is open. Alternatively, you can right click on the chart, click \'Expert List\' and then highlight the MMFX EA and click \'Properties\'.'
                    },
                    {
                        question: 'How do I delete the bot from a chart?',
                        answer:'Right click on the chart with the bot attached to it, then click \'Expert List\', then highlight the bot you want to delete and click \'Remove\'.'
                    },
                    {
                        question: 'How do I open a new chart with a different forex pair?',
                        answer:'In the Market Watch window, right click on the pair you want to open a chart for, and then click on \'Chart Window\'.'
                    },
                    {
                        question: 'How do I close an open chart I don\'t need anymore?',
                        answer:'Right click on the chart tab at the bottom of your screen and click \'Close\'.'
                    },
                    {
                        question: 'How do I change the chart timeframe, and what does it do?',
                        answer:'Ensure you have the timeframes toolbar enabled by going to View > Toolbars > Timeframes. When that\'s enabled, you\'ll see the timeframe options near the top of the MT5 terminal. This controls how often the bot will check for a possible trade. M1 = every minute, M5 = every 5 minutes, and so on.'
                    },
                ]
            },
            {
                subcategory: 'Trading and Performance',
                questions: [
                    {
                        question: 'My backtest is slow, how can I speed it up?',
                        answer:'Don\'t test more than 1000 combinations at once. If you select many settings simultaneously, the number of combinations that need testing could be very high, slowing down the process. Try to keep the number of combinations low. Backtesting speed is also tied to your computer\'s processing power. If your computer is slow, consider backtesting through the VPS.'
                    },
                    {
                        question: 'My bot isn\'t taking any trades',
                        answer:'Check the bot settings on the chart after you\'ve attached it. Go into the \'Common\' tab and make sure \'Allow Algo Trading\' is checked. If there\'s a \'Dependencies\' tab, make sure \'Allow DLL imports\' is checked. Inside the MT5 terminal click on Tools -> Options, and then go into \'Expert Advisors\' and check the same boxes as indicated in the guide. Make sure \'Algo Trading\' is enabled in the toolbar of MT5. If your bot has expired, download a fresh bot file from the members area and install it. Note that the bot doesn\'t always find a trade entry every day. Check your scheduling settings to see when the bot will look for trades. If the bot isn\'t trading despite these checks, try re-attaching the bot to the chart and loading your settings again, or restart your MT5 terminal. If that still doesn\'t work, try rebooting your VPS.'
                    },
                    {
                        question: 'I can\'t find the forex pair I need on the list',
                        answer:'Inside the Market Watch window, right click anywhere and hit \'Show All\' to get a complete list of all the available Forex pairs.'
                    },
                    {
                        question: 'How do I close an open trade manually?',
                        answer:'Click on \'Trade\' in the toolbox at the bottom of the screen. Here you\'ll see a list of the current open trades, if any. On the far right side of each open trade, you\'ll see a little X. Click that to close the trade manually.'
                    },
                    {
                        question: 'I want to prevent my bot from trading a certain day, how do I do that?',
                        answer:'Follow the steps in "How do I open the bot settings on the chart?" and then go into the \'Common\' tab once the settings window pops up. Once here, uncheck \'Allow Algo Trading\' to prevent the bot from trading entirely. If you still want it to trade, but only want to skip a certain day, go into the \'Inputs\' tab and scroll down to the \'Scheduling Settings\'. Here you simply set the specific day during the week you don\'t wish to trade to \'False\', which will make the bot skip that day entirely. If you want to skip a day further into the future, you can add the date in the \'Days To Avoid Trading\' field, using the following format: DD.MM.YYYY and separated with commas, no spaces.'
                    },
                    {
                        question: 'How do I make the bot stop trading when it has reached my goal?',
                        answer:'Open the bot settings window as explained in "How do I open the bot settings on the chart?" and then go into the inputs tab. At the top, you\'ll see a setting called \'Overall Profit Goal\'. Input your goal plus a small buffer to account for broker commission and/or slippage. Once that overall profit has been hit, the entire bot will be removed from the chart to prevent any further trading. The overall profit goal is disabled if you set it to 0.'
                    },
                    {
                        question: 'I\'ve hit the max allowed loss today, what happened?',
                        answer:'This can happen due to market volatility and unpredictability. It\'s important to average out every month in great profit, despite the occasional bad day. Bookmark https://www.myfxbook.com/forex-economic-calendar and check it once a week. It shows all the news and publications scheduled to hit every day, and what their impact might be on the Forex market. If you see a day with heavy news for your trading pair, you can go into your bot settings and set that day to False to avoid it entirely.'
                    },
                ]
            },
            {
                subcategory: 'Account and Login Issues',
                questions: [
                    {
                        question: 'I\'ve tried logging into my trading account multiple times but it doesn\'t work:',
                        answer:'Ensure you\'ve used the correct credentials, particularly the server you pick. Some brokers and prop firms have multiple different servers to choose from, so make sure you use the exact details that were sent to you via email from them. If your problem persists, reach out to them for assistance.'
                    },
                    {
                        question: 'My bot has expired, what now?',
                        answer:'If you\'re still an active member of MMFX, you can always find a fresh bot file in the members area. So if your current bot has expired, simply go in there and pick up the fresh file, and then follow the steps in "How To Install the MMFX EA in MT5" again.'
                    },
                ]
            },
            {
                subcategory: 'Interface and Navigation',
                questions: [
                    {
                        question: 'My symbols list, navigator or something else has gone missing, how do I get it back?',
                        answer:'Click \'View\' in the top menu to see the different sections you can hide orshow. Under \'Toolbars\' you can check everything to make sure the different timeframe options etc are shown. You\'ll also see Market Watch, Navigator, Toolbox, and the Strategy Tester. We recommend having all of those enabled.'
                    },
                ]
            },
        ]
    },
    
    
        
];

var chosenCategory = null;
var chosenSubcategory = null;
var chosenQuestion = null;

$(document).ready(function() {
    var chatbox = $('#chatbox');
    var options = $('#options');

    function showOptions(optionsArray, callback) {
        options.empty();
        optionsArray.forEach(function(option, index) {
            $('<div class="option">' + option + '</div>').click(function() {
                callback(index);
            }).appendTo(options);
        });
    }

    function showBotMessage(message, isTyping = false) {
        $(".typing-indicator").parent().remove(); // remove the typing indicator
        $(".chat-entry.bot.typing").remove(); // remove the previous bot typing message
        if (isTyping) {
            $('<div class="chat-entry bot typing"><div class="profile-pic"></div><p><span class="typing-indicator"><span>.</span><span>.</span><span>.</span></span></p></div>').hide().appendTo(chatbox).fadeIn(500, function() {
                chatbox.animate({scrollTop: chatbox[0].scrollHeight}, 500); // animate scrolling
            });
        } else {
            $('<div class="chat-entry bot"><div class="profile-pic"></div><p>' + message + '</p></div>').hide().appendTo(chatbox).fadeIn(500, function() {
                chatbox.animate({scrollTop: chatbox[0].scrollHeight}, 500); // animate scrolling
            });
        }
    }

    function showUserMessage(message) {
        $('<div class="chat-entry user"><p>' + message + '</p></div>').hide().appendTo(chatbox).fadeIn(500);
        chatbox.scrollTop(chatbox[0].scrollHeight);
    }

    function hello() {
        showBotMessage('Hello! Please choose a category to get started.');
        showOptions(faqData.map(function(data) { return data.category; }), function(index) {
            chosenCategory = faqData[index];
            showUserMessage(chosenCategory.category);
            showBotMessage('', true); // show a typing indicator
            setTimeout(function() {
                showBotMessage('Please choose a subcategory:');
                showOptions(chosenCategory.subcategories.map(function(data) { return data.subcategory; }), function(index) {
                    chosenSubcategory = chosenCategory.subcategories[index];
                    showUserMessage(chosenSubcategory.subcategory);
                    showBotMessage('', true); // show a typing indicator
                    setTimeout(function() {
                        showBotMessage('Please choose a question:');
                        showOptions(chosenSubcategory.questions.map(function(data) { return data.question; }), function(index) {
                            chosenQuestion = chosenSubcategory.questions[index];
                            showUserMessage(chosenQuestion.question);
                            showBotMessage('', true); // show a typing indicator
                            setTimeout(function() {
                                $(".chat-entry.bot.typing").remove(); // remove the loading dot message
                                $(".chat-entry.bot .profile-pic").remove(); // remove the profile picture
                                showBotMessage(chosenQuestion.answer);
                                showOptions(['I have another question', 'Bye!'], function(index) {
                                    if (index === 0) {
                                        hello();
                                    } else {
                                        showUserMessage('Bye!');
                                        showBotMessage('Goodbye for now, always happy to help!');
                                    }
                                });
                            }, 1500);
                        });
                    }, 1500);
                });
            }, 1500);
        });
    }
    hello();
});
