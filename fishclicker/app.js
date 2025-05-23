const btnCatchFish = document.getElementById("btnCatchFish");
const btnSellFish = document.getElementById("btnSellFish");
const btnBuyBait = document.getElementById("btnBuyBait");
const btnBuyBaitTen = document.getElementById("btnBuyBaitTen");
const btnBuyBaitHundred = document.getElementById("btnBuyBaitHundred");
const btnBuyBaitAll = document.getElementById("btnBuyBaitAll");
const btn1A = document.getElementById("btn1Angler");
const btn10A = document.getElementById("btn10Angler");
const btn100A = document.getElementById("btn100Angler");
const btn1000A = document.getElementById("btnAllAngler");

let startTime = new Date();
let totalFishCounter = 0;
let unsoldFishCounter = 0;
let moneyCounter = 100;
let baitCounter = 100;
let baitPrice = 10;
let baitTick = 20;
let fishPrice = 1.50;
let anglerCount = 0;
const totalOceanFish = 3500000000000;
let autoCounter = 0;
let anglerMultiplier = 1;
let autoBaitToggle = false;
let priceRangeLow = 0.25;
let priceRangeHigh = 1.75;
let fishPriceTimer = 15;
let sliderValue = 100;
let caughtLastTenSec = 0;
const alpha = 0.1;
let username = "Guest";
let finalCompletionTime;
let fishPerClick = 1;
let fishPerClickMultiplier = 1;
let currentRod = "Bare hands";
let currentHook = "Damp piece of wood";
let maxAnglers = false;

fishPrice = (Math.random() * (priceRangeHigh - priceRangeLow) + priceRangeLow).toFixed(2);
document.getElementById("anglerFishPrice").textContent = `Fish price: $${fishPrice} (range ${priceRangeLow.toFixed(2)}-${priceRangeHigh.toFixed(2)}) - ${fishPriceTimer}s`;

document.addEventListener("DOMContentLoaded", function() {
    populateLeaderboardTable(); 
    populateGlobalStats(); 
});

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('btnCatchFish');
    let autoClickInterval;

    function startAutoClick() {
        if (!autoClickInterval) {
            autoClickInterval = setInterval(() => {
                button.click();
            }, 33);
        }
    }

    function stopAutoClick() {
        clearInterval(autoClickInterval);
        autoClickInterval = null;
    }

    button.addEventListener('mousedown', startAutoClick);
    button.addEventListener('mouseup', stopAutoClick);
    button.addEventListener('mouseleave', stopAutoClick);

    button.addEventListener('touchstart', function(event) {
        event.preventDefault();
        startAutoClick();
    });
    button.addEventListener('touchend', stopAutoClick);
});

btnCatchFish.addEventListener("click", function() {
    if (baitCounter > 0 || autoBaitToggle) {
        let didYouGetLucky = Math.random();
        let fishCaught = didYouGetLucky < 0.25 ? fishPerClick * fishPerClickMultiplier : fishPerClick;

        totalFishCounter += fishCaught;
        unsoldFishCounter += fishCaught;
        caughtLastTenSec += fishCaught;

        if (!autoBaitToggle) {
            baitCounter -= fishCaught;
        }
    }
});

btnSellFish.addEventListener("click", function(){
    moneyCounter += Math.ceil(((unsoldFishCounter/100) * sliderValue) * fishPrice);
    unsoldFishCounter -= Math.ceil(((unsoldFishCounter/100) * sliderValue));
});

btnBuyBait.addEventListener("click", function(){
    if(moneyCounter >= baitPrice){
        baitCounter += baitTick;
        moneyCounter -= baitPrice;
    }
});

btnBuyBaitTen.addEventListener("click", function(){
    if(moneyCounter >= baitPrice * 10){
        baitCounter += baitTick * 10;
        moneyCounter -= baitPrice * 10;
    }
});

btnBuyBaitHundred.addEventListener("click", function(){
    if(moneyCounter >= baitPrice * 100){
        baitCounter += baitTick * 100;
        moneyCounter -= baitPrice * 100;
    }
});

btnBuyBaitAll.addEventListener("click", function(){
    if(moneyCounter >= baitPrice){
        let baitToBuy = Math.floor(moneyCounter / baitPrice);
        baitCounter += baitTick * baitToBuy;
        moneyCounter -= baitPrice * baitToBuy;
    }
});

btn1A.addEventListener("click", function(){
    if (moneyCounter >= 100){
        autoCounter += 1;
        moneyCounter -= 100;
        anglerCount += 1;
    }
});

btn10A.addEventListener("click", function(){
    if (moneyCounter >= 1000){
        autoCounter += 10;
        moneyCounter -= 1000;
        anglerCount += 10;
    }
});

btn100A.addEventListener("click", function(){
    if (moneyCounter >= 10000){
        autoCounter += 100;
        moneyCounter -= 10000;
        anglerCount += 100;
    }
});

btn1000A.addEventListener("click", function(){
    if (moneyCounter >= 100){
        let maxAnglersToAdd = 8100000000 - anglerCount;
        let affordableAnglers = Math.floor(moneyCounter / 100);
        let anglersToAdd = Math.min(maxAnglersToAdd, affordableAnglers);

        anglerCount += anglersToAdd;
        autoCounter = anglerCount * anglerMultiplier;
        moneyCounter -= anglersToAdd * 100;
        
        if (anglerCount >= 8100000000) {
            allHumansHired();
        }
    }
});

document.addEventListener("DOMContentLoaded", function(){
    let slider = document.getElementById("fishSellSlider");
    slider.addEventListener("input", function(){
        sliderValue = slider.value;
    });
});

function Update() {
    let percentageOfOceanFished = ((totalFishCounter / totalOceanFish) * 100).toFixed(10);
    document.getElementById("totalFish").textContent = `Total fish caught: ${formatNumber(totalFishCounter.toFixed())}`;
    document.getElementById("unsoldFish").textContent = `Unsold fish: ${formatNumber(unsoldFishCounter.toFixed())}`;
    document.getElementById("moneyTotal").textContent = `Money: $${formatNumber(moneyCounter.toFixed(2))}`;
    document.getElementById("fishLeft").textContent = `% of ocean fished: ${percentageOfOceanFished}%`;
    document.getElementById("fishPerSec").textContent = `Fish per second: ${formatNumber(((anglerCount * anglerMultiplier) + caughtLastTenSec).toFixed())}`;
    document.getElementById("anglerHireCount").textContent = `Anglers hired: ${formatNumber(anglerCount)}`;
    document.getElementById("anglerFpsCount").textContent = `Anglers catch ${anglerMultiplier.toFixed()} fish per second each`;
    if (autoBaitToggle) document.getElementById("anglerBaitInfo").textContent = `Bait: ∞`;
    else document.getElementById("anglerBaitInfo").textContent = `Buy ${formatNumber(baitTick.toFixed())} bait for $${baitPrice.toFixed()}`;
    if (autoBaitToggle) document.getElementById("baitTotalCounter").textContent = `Bait left: ∞`;
    else document.getElementById("baitTotalCounter").textContent = `Bait left: ${baitCounter.toFixed()}`;
    document.getElementById("anglerFishPrice").textContent = `Fish price: $${fishPrice} (range ${priceRangeLow.toFixed(2)}-${priceRangeHigh.toFixed(2)}) - ${fishPriceTimer}s`;
    document.getElementById("percentageToSell").textContent = `${sliderValue}%`;
    if (baitCounter == 0 && moneyCounter < baitPrice && unsoldFishCounter == 0) baitCounter = 5;
    document.getElementById("currentFishingRod").textContent = `Rod: ${currentRod}`;
    document.getElementById("currentHook").textContent = `Hook: ${currentHook}`;
    if (currentHook != "Damp piece of wood") {
        document.getElementById("currentFishPerClick").textContent = `${fishPerClick} fish/click (25% chance to ${fishPerClickMultiplier}x)`;
    } else {
        document.getElementById("currentFishPerClick").textContent = `${fishPerClick} fish/click`;
    }
    if (anglerCount >= 8100000000) allHumansHired();
    if (unsoldFishCounter < 0) unsoldFishCounter = 0;
}

let decimalAccumulator = 0;

function fpsUpdate() {
    if (autoBaitToggle) {
        totalFishCounter += (anglerCount * anglerMultiplier) / 100;
        unsoldFishCounter += (anglerCount * anglerMultiplier) / 100;
    } else {
        let newFish = (autoCounter * anglerMultiplier) / 100;
        decimalAccumulator += newFish;

        if (decimalAccumulator >= 1) {
            let fishAddition = Math.floor(decimalAccumulator);

            if (baitCounter >= fishAddition) {
                baitCounter -= fishAddition; 
                totalFishCounter += fishAddition;
                unsoldFishCounter += fishAddition;
                decimalAccumulator -= fishAddition;
            } else {
                totalFishCounter += baitCounter;
                unsoldFishCounter += baitCounter;
                decimalAccumulator -= baitCounter;
                baitCounter = 0;
            }
        }

        if (autoBaitToggle && baitCounter <= 500 && moneyCounter >= baitPrice) {
            baitCounter += baitTick; 
            moneyCounter -= baitPrice;  
        } 

        if (baitCounter < 0) baitCounter = 0; 
    }

    if (totalFishCounter >= totalOceanFish) {
        clearInterval(fpsUpdateInterval);
        clearInterval(updateInterval);
        clearInterval(displayTimeInterval);
        clearInterval(updateFishPrice);
        clearInterval(checkUpgradesInterval);
        endGame();
    }

    if (anglerCount > 8100000000) anglerCount = 8100000000;
}

function maxAnglersReached() {
    clearInterval(fpsUpdateInterval);
    anglerCount = 8100000000;
    autoCounter = anglerCount * anglerMultiplier;
    document.getElementById("anglerInfo").textContent = "All 8.1 billion humans on earth now employed as anglers!";
}


function maxAnglersReached(){
    clearInterval(fpsUpdate);
    anglerCount = 8100000000;
}


function displayTime(){
    let tempTime = new Date();
    let difference = tempTime - startTime;
    let seconds = Math.floor((difference/1000) % 60);
    let minutes = Math.floor((difference/(1000 * 60)) % 60);
    let hours = Math.floor((difference/(1000 * 60 * 60)) % 24);
    
    let padSec = "";
    let padMin = "";
    let padHour = "";

    if (seconds < 10) padSec = "0";
    if (minutes < 10) padMin = "0";
    if (hours < 10) padHour = "0";
    
    document.getElementById("timeElapsed").textContent = `Time elapsed: ${padHour}${hours}:${padMin}${minutes}:${padSec}${seconds}`;
}

function formatNumber(inputNum){
    if (inputNum < 1000) return inputNum;
    else if (inputNum < 1000000) return (inputNum/1000).toFixed(2) + " thousand";
    else if (inputNum < 1000000000) return (inputNum/1000000).toFixed(2) + " million";
    else if (inputNum < 1000000000000) return (inputNum/1000000000).toFixed(2) + " billion";
    else if (inputNum < 1000000000000000) return (inputNum/1000000000000).toFixed(2) + " trillion";
    else if (inputNum < 1000000000000000000n) return (inputNum/1000000000000000n).toFixed(2) + " quadrillion";
    else if (inputNum < 1000000000000000000000) return (inputNum/1000000000000000000000).toFixed(2) + " quintillion";
    else if (inputNum < 1000000000000000000000000) return (inputNum/1000000000000000000000000).toFixed(2) + " sextillion";
    else if (inputNum < 1000000000000000000000000000) return (inputNum/1000000000000000000000000000).toFixed(2) + " septillion";
    else if (inputNum < 1000000000000000000000000000000) return (inputNum/1000000000000000000000000000000).toFixed(2) + " octillion";
    else if (inputNum < 1000000000000000000000000000000000) return (inputNum/1000000000000000000000000000000000).toFixed(2) + " nonillion";
}

const upgrades = [
    { "id": "cheekyChumChest", "minFish": 1, "minMoney": 500, "bought": false, "aMulti": 0, "bMulti": 1.5, "bCost": 1 },
    { "id": "wigglyWormWarehouse", "minFish": 50, "minMoney": 1000, "bought": false, "aMulti": 0, "bMulti": 1.5, "bCost": 1 },
    { "id": "plasticHook", "minFish": 2000, "minMoney": 2500, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "hookMulti": 10},
    { "id": "wealthyWaterway", "minFish": 1000, "minMoney": 2500, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "minPrice": 0.75, "maxPrice": 2.25 },
    { "id": "feebleTwig", "minFish": 3000, "minMoney": 5000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "fishClick": 5 },
    { "id": "captainsCap", "minFish": 40000, "minMoney": 110000, "bought": false, "aMulti": 2, "bMulti": 1, "bCost": 1 },
    { "id": "craftyCrabCache", "minFish": 5000, "minMoney": 8500, "bought": false, "aMulti": 0, "bMulti": 1.5, "bCost": 1 },
    { "id": "luckyLighthouse", "minFish": 1172000, "minMoney": 1300000, "bought": false, "aMulti": 3, "bMulti": 1, "bCost": 1 },
    { "id": "slightlyBentStick", "minFish": 15000, "minMoney": 20500, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "fishClick": 25 },
    { "id": "nimbleNoodleRod", "minFish": 187999, "minMoney": 250000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "fishClick": 100 },
    { "id": "profitablePond", "minFish": 130000, "minMoney": 157500, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "minPrice": 1.25, "maxPrice": 2.75 },
    { "id": "fishfinder500", "minFish": 1340000, "minMoney": 1980000, "bought": false, "aMulti": 4, "bMulti": 1, "bCost": 1 },
    { "id": "goldenGulf", "minFish": 2400000, "minMoney": 3000000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "minPrice": 1.75, "maxPrice": 3.25 },
    { "id": "ironHook", "minFish": 50000, "minMoney": 62500, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "hookMulti": 25 },
    { "id": "funkyFishFridge", "minFish": 150000, "minMoney": 162500, "bought": false, "aMulti": 0, "bMulti": 1.5, "bCost": 1 },
    { "id": "bargainBaitBasket", "minFish": 180000, "minMoney": 1100000, "bought": false, "aMulti": 0, "bMulti": 1.5, "bCost": 1 },
    //{ "id": "seafarersSail", "minFish": 850000, "minMoney": 2500000, "bought": false, "aMulti": 2, "bMulti": 1, "bCost": 1 },
    { "id": "slickShrimpSilo", "minFish": 1190000, "minMoney": 1552500, "bought": false, "aMulti": 0, "bMulti": 1.5, "bCost": 1 },
    { "id": "efficientNetting", "minFish": 550000, "minMoney": 800000, "bought": false, "aMulti": 0, "bMulti": 1.5, "bCost": 1 },
    { "id": "platinumHook", "minFish": 1200000, "minMoney": 3375000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "hookMulti": 250 },
   // { "id": "turtleTrawler", "minFish": 4000000, "minMoney": 10000000, "bought": false, "aMulti": 2, "bMulti": 1, "bCost": 1 },
    { "id": "krakenKatch", "minFish": 40000000, "minMoney": 170000000, "bought": false, "aMulti": 5, "bMulti": 1, "bCost": 1 },
    { "id": "marlinMaster", "minFish": 2000000, "minMoney": 6000000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "fishClick": 500 },
    { "id": "whaleWhisperer", "minFish": 120000000, "minMoney": 500000000, "bought": false, "aMulti": 6, "bMulti": 1, "bCost": 1 },
    { "id": "sharkShooter", "minFish": 32000000, "minMoney": 65750000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "fishClick": 1000 },
    { "id": "coralCrusher", "minFish": 40000000, "minMoney": 1300000000, "bought": false, "aMulti": 7, "bMulti": 1, "bCost": 1 },
    { "id": "autoBaiter", "minFish": 3000000, "minMoney": 6000000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1 },
    { "id": "deepDiveDynamo", "minFish": 50000000, "minMoney": 1900000000, "bought": false, "aMulti": 8, "bMulti": 1, "bCost": 1 },
   // { "id": "soggyLog", "minFish": 100000000, "minMoney": 250000000, "bought": false, "aMulti": 2, "bMulti": 1, "bCost": 1 },
    //{ "id": "turboTackleTitan", "minFish": 200000000, "minMoney": 500000000, "bought": false, "aMulti": 2, "bMulti": 1, "bCost": 1 },
   // { "id": "dinkyDinghy", "minFish": 300000000, "minMoney": 700000000, "bought": false, "aMulti": 2, "bMulti": 1, "bCost": 1 },
    { "id": "barnacleBuster", "minFish": 1375000000, "minMoney": 651250000000, "bought": false, "aMulti": 20, "bMulti": 1, "bCost": 1 },
    { "id": "merryMariner", "minFish": 500000000, "minMoney": 251250000000, "bought": false, "aMulti": 15, "bMulti": 1, "bCost": 1 },
    { "id": "lavishLagoon", "minFish": 175000000, "minMoney": 493750000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "minPrice": 2.25, "maxPrice": 3.75 },
    { "id": "valiantVoyager", "minFish": 1000000000, "minMoney": 4500000000, "bought": false, "aMulti": 9, "bMulti": 1, "bCost": 1 },
    { "id": "nauticalNemesis", "minFish": 1500000000, "minMoney": 7750000000, "bought": false, "aMulti": 10, "bMulti": 1, "bCost": 1 },
    { "id": "diamondHook", "minFish": 130000000, "minMoney": 340000000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "hookMulti": 1000 },
    { "id": "omegaFishblaster6000", "minFish": 140000000, "minMoney": 330000000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "fishClick": 200000 },
    { "id": "diamondDepths", "minFish": 250000000, "minMoney": 500000000, "bought": false, "aMulti": 0, "bMulti": 1, "bCost": 1, "minPrice": 2.75, "maxPrice": 4.25 }
];


let visibleUpgrades = 0;

function checkUpgrades() {
    visibleUpgrades = 0;
    upgrades.forEach(upgrade => {
        if (totalFishCounter >= upgrade.minFish && !upgrade.bought && visibleUpgrades < 10) {
            const elem = document.getElementById(upgrade.id);
            if (elem) {
                elem.style.display = "block";
                visibleUpgrades++;
                if (moneyCounter > upgrade.minMoney) {
                    elem.style.cursor = "pointer";
                    elem.style.color = "#272727";
                    elem.style.backgroundColor = "#aaaaaa";
                    addUpgradeClickListener(upgrade);
                } else {
                    elem.style.cursor = "default";
                    elem.style.color = "#a8a8a8";
                    elem.style.backgroundColor = "#dbdbdb";
                }
            } else {
                console.error(`Element not found for upgrade: ${upgrade.id}`);
            }
        }
    });
}

function addUpgradeClickListener(upgrade) {
    const elem = document.getElementById(upgrade.id);
    elem.addEventListener('click', function() {
        if (moneyCounter >= upgrade.minMoney && !upgrade.bought) {
            elem.style.display = "none";
            upgrade.bought = true;
            if (upgrade.aMulti > anglerMultiplier) {
                anglerMultiplier = upgrade.aMulti;
                upgrades.forEach(function(upg) {
                    if (upg.aMulti < anglerMultiplier && !upg.bought && upg.aMulti > 0) {
                        upg.bought = true;
                        document.getElementById(upg.id).style.display = "none";
                    }
                });
            }
            baitTick *= upgrade.bMulti;
            baitPrice *= upgrade.bCost;
            visibleUpgrades--; 

            if (upgrade.id == "wealthyWaterway" ||
                upgrade.id == "profitablePond" ||
                upgrade.id == "goldenGulf" ||
                upgrade.id == "lavishLagoon" ||
                upgrade.id == "diamondDepths") {
                
                if (upgrade.minPrice > priceRangeLow) {
                    priceRangeLow = upgrade.minPrice;
                    priceRangeHigh = upgrade.maxPrice;
                }

                if (upgrade.id == "profitablePond") {
                    upgrades.find(upg => upg.id == "wealthyWaterway").bought = true;
                    document.getElementById("wealthyWaterway").style.display = "none";
                } else if (upgrade.id == "goldenGulf") {
                    upgrades.find(upg => upg.id == "wealthyWaterway").bought = true;
                    upgrades.find(upg => upg.id == "profitablePond").bought = true;
                    document.getElementById("wealthyWaterway").style.display = "none";
                    document.getElementById("profitablePond").style.display = "none";
                } else if (upgrade.id == "lavishLagoon") {
                    upgrades.find(upg => upg.id == "wealthyWaterway").bought = true;
                    upgrades.find(upg => upg.id == "profitablePond").bought = true;
                    upgrades.find(upg => upg.id == "goldenGulf").bought = true;
                    document.getElementById("wealthyWaterway").style.display = "none";
                    document.getElementById("profitablePond").style.display = "none";
                    document.getElementById("goldenGulf").style.display = "none";
                } else if (upgrade.id == "diamondDepths") {
                    upgrades.find(upg => upg.id == "wealthyWaterway").bought = true;
                    upgrades.find(upg => upg.id == "profitablePond").bought = true;
                    upgrades.find(upg => upg.id == "goldenGulf").bought = true;
                    upgrades.find(upg => upg.id == "lavishLagoon").bought = true;
                    document.getElementById("wealthyWaterway").style.display = "none";
                    document.getElementById("profitablePond").style.display = "none";
                    document.getElementById("goldenGulf").style.display = "none";
                    document.getElementById("lavishLagoon").style.display = "none";
                }
            }
            if (upgrade.id == "diamondHook"){
                fishPerClickMultiplier = upgrade.hookMulti;
                upgrades[2].bought = true;
                document.getElementById("plasticHook").style.display = "none";
                upgrades[13].bought = true;
                document.getElementById("ironHook").style.display = "none";
                upgrades[18].bought = true;
                document.getElementById("platinumHook").style.display = "none";
                currentHook = "Diamond hook";
            }
            else if (upgrade.id == "platinumHook"){
                fishPerClickMultiplier = upgrade.hookMulti;
                upgrades[2].bought = true;
                document.getElementById("plasticHook").style.display = "none";
                upgrades[10].bought = true;
                document.getElementById("ironHook").style.display = "none";
                currentHook = "Platinum hook";
            } else if (upgrade.id == "ironHook"){
                fishPerClickMultiplier = upgrade.hookMulti;
                upgrades[2].bought = true;
                document.getElementById("plasticHook").style.display = "none";
                currentHook = "Iron hook";
            } else if (upgrade.id == "plasticHook"){
                fishPerClickMultiplier = upgrade.hookMulti;
                document.getElementById("plasticHook").style.display = "none";
                currentHook = "Plastic hook";
            }

            if (upgrade.id == "feebleTwig") {
                fishPerClick = 5;
                currentRod = "Feeble twig";
            } else if (upgrade.id == "slightlyBentStick") {
                fishPerClick = 25;
                currentRod = "Slightly bent stick";
                upgrades.find(upg => upg.id === "feebleTwig").bought = true;
                document.getElementById("feebleTwig").style.display = "none";
                visibleUpgrades--;
            } else if (upgrade.id == "nimbleNoodleRod") {
                fishPerClick = 100;
                currentRod = "Nimble noodle rod";
                upgrades.find(upg => upg.id === "feebleTwig").bought = true;
                document.getElementById("feebleTwig").style.display = "none";
                upgrades.find(upg => upg.id === "slightlyBentStick").bought = true;
                document.getElementById("slightlyBentStick").style.display = "none";
                visibleUpgrades -= 2;
            } else if (upgrade.id == "marlinMaster") {
                fishPerClick = 500;
                currentRod = "Marlin master";
                upgrades.find(upg => upg.id === "feebleTwig").bought = true;
                document.getElementById("feebleTwig").style.display = "none";
                upgrades.find(upg => upg.id === "slightlyBentStick").bought = true;
                document.getElementById("slightlyBentStick").style.display = "none";
                upgrades.find(upg => upg.id === "nimbleNoodleRod").bought = true;
                document.getElementById("nimbleNoodleRod").style.display = "none";
                visibleUpgrades -= 3;
            } else if (upgrade.id == "sharkShooter") {
                fishPerClick = 5000;
                currentRod = "Shark shooter";
                upgrades.find(upg => upg.id === "feebleTwig").bought = true;
                document.getElementById("feebleTwig").style.display = "none";
                upgrades.find(upg => upg.id === "slightlyBentStick").bought = true;
                document.getElementById("slightlyBentStick").style.display = "none";
                upgrades.find(upg => upg.id === "nimbleNoodleRod").bought = true;
                document.getElementById("nimbleNoodleRod").style.display = "none";
                upgrades.find(upg => upg.id === "marlinMaster").bought = true;
                document.getElementById("marlinMaster").style.display = "none";
                visibleUpgrades -= 4;
            } else if (upgrade.id == "omegaFishblaster6000") {
                fishPerClick = 200000;
                currentRod = "Omega Fishblaster 6000";
                upgrades.find(upg => upg.id === "feebleTwig").bought = true;
                document.getElementById("feebleTwig").style.display = "none";
                upgrades.find(upg => upg.id === "slightlyBentStick").bought = true;
                document.getElementById("slightlyBentStick").style.display = "none";
                upgrades.find(upg => upg.id === "nimbleNoodleRod").bought = true;
                document.getElementById("nimbleNoodleRod").style.display = "none";
                upgrades.find(upg => upg.id === "marlinMaster").bought = true;
                document.getElementById("marlinMaster").style.display = "none";
                upgrades.find(upg => upg.id === "sharkShooter").bought = true;
                document.getElementById("sharkShooter").style.display = "none";
                visibleUpgrades -= 5;
            }
            
            if (upgrade.id == "autoBaiter") {
                autoBaitToggle = true;
                baitCounter = 4 * 10**12;
                btnBuyBait.classList.add("disabled-button");
                btnBuyBaitTen.classList.add("disabled-button");
                btnBuyBaitHundred.classList.add("disabled-button");
                btnBuyBaitAll.classList.add("disabled-button");

                upgrades.forEach((upg) => {
                    if (
                        upg.id === "cheekyChumChest" ||
                        upg.id === "wigglyWormWarehouse" ||
                        upg.id === "craftyCrabCache" ||
                        upg.id === "funkyFishFridge" ||
                        upg.id === "bargainBaitBasket" ||
                        upg.id === "slickShrimpSilo" ||
                        upg.id === "efficientNetting"
                    ) {
                        upg.bought = true;
                        document.getElementById(upg.id).style.display = "none";
                        visibleUpgrades--; 
                    }
                });
            }
            moneyCounter -= upgrade.minMoney;
        }
    });
}

function endGame() {
    let temp = new Date();
    finalCompletionTime = Math.floor((temp - startTime) / 1000);
    clearInterval(fpsUpdateInterval);
    clearInterval(updateInterval);
    clearInterval(displayTimeInterval);
    clearInterval(checkUpgradesInterval);
    clearInterval(updateFishPrice);
    totalFishCounter = totalOceanFish;
}

let updateFishPrice = setInterval(function(){
    if (fishPriceTimer > 0) {
        fishPriceTimer--; 
    } else {
        fishPrice = (Math.random() * (priceRangeHigh - priceRangeLow) + priceRangeLow).toFixed(2); // Update fish price
        fishPriceTimer = 15; 
    }
    document.getElementById("anglerFishPrice").textContent = `Fish price: $${fishPrice} (range ${priceRangeLow.toFixed(2)}-${priceRangeHigh.toFixed(2)}) - ${fishPriceTimer}s`;
}, 1000); 

let fpsUpdateInterval = setInterval(fpsUpdate, 10);
let updateInterval = setInterval(Update, 10);
let displayTimeInterval = setInterval(displayTime, 1000);
let checkUpgradesInterval = setInterval(checkUpgrades, 10);


setInterval(function(){
    caughtLastTenSec = caughtLastTenSec * (1 - alpha);
}, 100);

let asciiFrames = [
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                          <')"={                  }-<('c \n       |          }<('>              }-<('c                                         ><> \n       |    ><>                                 }<('>             }<('>\n       |\n       |                   }-<('c                           <')"={          }-<('c\n       |\n       |      <><                        <')"={                        }-<('c \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                          <')"={                  }-<('c \n       |          }<('>              }-<('c                                             \n       |    ><>                                 }<('>             }<('>\n       |\n       |                   }-<('c                           <')"={          }-<('c\n       |\n       |      <><                        <')"={                        }-<('c \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                          <')"={                         \n       |          }<('>              }-<('c                                             \n       |    ><>                                 }<('>             }<('>\n       |\n       |                   }-<('c                           <')"={          }-<('c\n       |\n       |      <><                        <')"={                        }-<('c \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                          <')"={                         \n       |          }<('>              }-<('c                                             \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                    <')"={          }-<('c\n       |\n       |      <><                        <')"={                        }-<('c \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                          <')"={                         \n       |          }<('>              }-<('c                                             \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                    <')"={          }-<('c\n       |\n       |      <><                        <')"={                               \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |          }<('>              }-<('c                                             \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                    <')"={          }-<('c\n       |\n       |      <><                        <')"={                               \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |          }<('>              }-<('c                                             \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                    <')"={                \n       |\n       |      <><                        <')"={                               \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                             }-<('c                                             \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                    <')"={                \n       |\n       |      <><                        <')"={                               \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                    <')"={                \n       |\n       |      <><                        <')"={                               \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                    <')"={                \n       |\n       |      <><                                                             \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                                          \n       |\n       |      <><                                                             \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J   <')"={                                       }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                                          \n       |\n       |      <><                                                             \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J                                                }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |    ><>                                 }<('>             }<('>\n       |\n       |                                                                          \n       |\n       |                                                                      \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J                                                }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |    ><>                                 }<('>                  \n       |\n       |                                                                          \n       |\n       |                                                                      \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J                                                }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |    ><>                                                        \n       |\n       |                                                                          \n       |\n       |                                                                      \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J                                                }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |                                                               \n       |\n       |                                                                          \n       |\n       |                                                                      \n       |                                                <><\n       |             }<('>             }<('>                                <')"={\n       J                                                }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |                                                               \n       |\n       |                                                                          \n       |\n       |                                                                      \n       |                                                <><\n       |             }<('>             }<('>                                      \n       J                                                }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |                                                               \n       |\n       |                                                                          \n       |\n       |                                                                      \n       |                                                <><\n       |             }<('>                                                        \n       J                                                }<('>\n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |                                                               \n       |\n       |                                                                          \n       |\n       |                                                                      \n       |                                                <><\n       |             }<('>                                                        \n       J                                                     \n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |                                                               \n       |\n       |                                                                          \n       |\n       |                                                                      \n       |                                                <><\n       |                                                                          \n       J                                                     \n`,
    `        ,-.\n      _n_  \\ \n     (---)  \`-._______________________________________________________________________________________________________________\n  ~^~^~|~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^\n       |                                                                         \n       |                                                                                \n       |                                                               \n       |\n       |                                                                          \n       |\n       |                                                                      \n       |                                                   \n       |                                                                          \n       J                                                     \n`,
];
let currentFrame = 0;

setInterval(function() {
    currentFrame = Math.floor((totalFishCounter / totalOceanFish * 100) / 5);
    document.getElementById("asciiSea").textContent = asciiFrames[currentFrame];
    currentFrame = (currentFrame + 1) % asciiFrames.length;
}, 1000);

let buttonStates = setInterval(function(){
    if (!autoBaitToggle){
        if (moneyCounter < baitPrice) {
            btnBuyBait.classList.add("disabled-button");
            btnBuyBait.classList.remove("button");
            btnBuyBaitAll.classList.add("disabled-button");
            btnBuyBaitAll.classList.remove("button");
        } else {
            btnBuyBait.classList.add("button");
            btnBuyBait.classList.remove("disabled-button");
            btnBuyBaitAll.classList.add("button");
            btnBuyBaitAll.classList.remove("disabled-button");
        } 
    
        if (moneyCounter < baitPrice*10) {
            btnBuyBaitTen.classList.add("disabled-button");
            btnBuyBaitTen.classList.remove("button");
        } else {
            btnBuyBaitTen.classList.add("button");
            btnBuyBaitTen.classList.remove("disabled-button");
        } 
    
        if (moneyCounter < baitPrice*100) {
            btnBuyBaitHundred.classList.add("disabled-button");
            btnBuyBaitHundred.classList.remove("button");
        } else {
            btnBuyBaitHundred.classList.add("button");
            btnBuyBaitHundred.classList.remove("disabled-button");
        } 
    }
    if (!maxAnglers){
        if (moneyCounter >= 100) {
            btn1A.classList.add("button");
            btn1A.classList.remove("disabled-button");
        } else {
            btn1A.classList.add("disabled-button");
            btn1A.classList.remove("button");
        } 
        if (moneyCounter >= 1000) {
            btn10A.classList.add("button");
            btn10A.classList.remove("disabled-button");
        } else {
            btn10A.classList.add("disabled-button");
            btn10A.classList.remove("button");
        } 
        if (moneyCounter >= 10000) {
            btn100A.classList.add("button");
            btn100A.classList.remove("disabled-button");
        } else {
            btn100A.classList.add("disabled-button");
            btn100A.classList.remove("button");
        } 
        if (moneyCounter >= 100) {
            btn1000A.classList.add("button");
            btn1000A.classList.remove("disabled-button");
        } else {
            btn1000A.classList.add("disabled-button");
            btn1000A.classList.remove("button");
        } 
        if (unsoldFishCounter == 0) {
            btnSellFish.classList.add("disabled-button");
            btnSellFish.classList.remove("button");
        } else {
            btnSellFish.classList.add("button");
            btnSellFish.classList.remove("disabled-button");
        } 
    }  
}, 100);

function allHumansHired(){
    maxAnglers = true;
    document.getElementById("anglerInfo").textContent = "All 8.1 billion humans on earth now employed as anglers!";
    btn1000A.classList.add("disabled-button");
    btn1000A.classList.remove("button");
    btn100A.classList.add("disabled-button");
    btn100A.classList.remove("button");
    btn10A.classList.add("disabled-button");
    btn10A.classList.remove("button");
    btn1A.classList.add("disabled-button");
    btn1A.classList.remove("button");
    anglerCount = 8100000000;
    autoCounter = anglerCount * anglerMultiplier;
}

