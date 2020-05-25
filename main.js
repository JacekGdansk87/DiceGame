let diceGame = {
    'divName1': ['','','','',''],
    'divName2': ['','','','',''],
    'roundDice' : {'1':0,'2':0,'3':0,'4':0,'5':0},
    'drawnDice' : {'1':0,'2':0,'3':0,'4':0,'5':0},
    'turnCounter':3,
    'roundCounter': 10,
    'dicePoints': 0,
    'diceBonusCheck':0,
    'diceBonus':0,
    'diceStraightCheck':{'1':0,'6':0,'10':1},
    'bonusPoints': {'three':5,'four':10,'full':15,'smallStraight':20,'bigStraight':25,'general':50},
    'totalScore': {player:0,bot:0},
    'yourTurn': 1,
    'BotLogic': {'type1':0,'type2':0},
}

let idBonus = '';
let playerTab;
let cleaningTab;

document.querySelector('#roundDice').addEventListener('click', roundDices);
document.querySelector('#endTurn').addEventListener('click', endTurn);
//document.querySelector('#botButton').addEventListener('click', botAction);

function roundDices() {
    if(diceGame['turnCounter']>0){
    --diceGame['turnCounter'];
    document.querySelector('#turnLeft').textContent = "Turn left: " + diceGame['turnCounter'];

    for(i=1; i<=5; ++i){
        if(diceGame['drawnDice'][i] == 0){
            diceGame['roundDice'][i] = Math.floor(Math.random()*6+1);
            if(diceGame['yourTurn'] == 1){
                diceGame['divName1'][i] = "#drawnDiceP" + i;
                diceGame['divName2'][i] = "#chosenDiceP" + i;
            }else{
                diceGame['divName1'][i] = "#drawnDiceB" + i;
                diceGame['divName2'][i] = "#chosenDiceB" + i;
            }
            drawDice(i);
        } 
     }
    }else{
        document.querySelector('#gamePrompt').textContent = "You used 3 turns. End your turn";
    }
}

function drawDice(i) {
    let diceUrl = "url(img/dice" + diceGame['roundDice'][i] + ".png)";
    let divName1 = document.querySelector(diceGame['divName1'][i]);
    let divName2 = document.querySelector(diceGame['divName2'][i]);

    divName1.style.backgroundImage=diceUrl;

    if(diceGame['turnCounter']==2 && diceGame['roundCounter']==10){    
        divName1.addEventListener('click', () => takeDice(i));
        divName2.addEventListener('click', () => changeDice(i));
    }
}


function takeDice(diceNum){

    let diceUrl = "url(img/dice" + diceGame['roundDice'][diceNum] + ".png)";
    let divName1 = document.querySelector(diceGame['divName1'][diceNum]);
    let divName2 = document.querySelector(diceGame['divName2'][diceNum]);
    //move dice to hand
    if(diceGame['drawnDice'][diceNum]==0){
        divName1.style.backgroundImage='';
        divName2.style.backgroundImage=diceUrl;

        diceGame['drawnDice'][diceNum] = diceGame['roundDice'][diceNum];
        diceGame['dicePoints'] += diceGame['roundDice'][diceNum];
        countBonus();
        drawTable();
    }
}

function changeDice(diceNum){

    let diceUrl = "url(img/dice" + diceGame['roundDice'][diceNum] + ".png)";
    let divName1 = document.querySelector(diceGame['divName1'][diceNum]);
    let divName2 = document.querySelector(diceGame['divName2'][diceNum]);

    //move dice too exchange
    if(diceGame['drawnDice'][diceNum]>0){
        divName2.style.backgroundImage='';
        divName1.style.backgroundImage=diceUrl;

        diceGame['dicePoints'] -= diceGame['roundDice'][diceNum];
        diceGame['drawnDice'][diceNum] = 0;
        countBonus();
        drawTable();
    }
}

function countBonus(){
    diceGame['diceBonusCheck']=0;
    diceGame['diceStraightCheck'][1]=0;
    diceGame['diceStraightCheck'][6]=0;
    diceGame['diceStraightCheck'][10]=1;

    for(i=1; i <= 5; ++i){
        if(diceGame['drawnDice'][i]!==0){
            for(j=i+1 ; j<=5; ++j){
                if(diceGame['drawnDice'][i]==diceGame['drawnDice'][j]){
                    ++diceGame['diceBonusCheck'];
                }
            }
        }

        //data for straight's 
        if(diceGame['drawnDice'][i]===0){
            diceGame['diceStraightCheck'][10]=0;
        }else if(diceGame['drawnDice'][i]===1){
            diceGame['diceStraightCheck'][1]=1;
        }else if(diceGame['drawnDice'][i]===6){
            diceGame['diceStraightCheck'][6]=1;
        }
    }

        idBonus = 0;

    if(diceGame['diceBonusCheck']===3){
        idBonus = 1;
        diceGame['diceBonus'] = diceGame['bonusPoints']['three'];
 
    }else if(diceGame['diceBonusCheck']===6){
        idBonus = 2;
        diceGame['diceBonus'] = diceGame['bonusPoints']['four'];
    }else if(diceGame['diceBonusCheck']===4){
        idBonus = 3;
        diceGame['diceBonus'] = diceGame['bonusPoints']['full'];
    }else if(diceGame['diceStraightCheck'][10]===1 && diceGame['diceStraightCheck'][1]===1 
           && diceGame['diceStraightCheck'][6]!==1 && diceGame['diceBonusCheck']===0) {
        idBonus = 4;
        diceGame['diceBonus'] = diceGame['bonusPoints']['smallStraight'];
    }else if(diceGame['diceStraightCheck'][10]===1 && diceGame['diceStraightCheck'][6]===1 
           && diceGame['diceStraightCheck'][1]!==1 && diceGame['diceBonusCheck']===0){
        idBonus = 5;
        diceGame['diceBonus'] = diceGame['bonusPoints']['bigStraight'];
    }else if(diceGame['diceBonusCheck']===10){
        idBonus = 6;
        diceGame['diceBonus'] = diceGame['bonusPoints']['general'];
    }else{
        console.log("nothing");
    }

    diceGame['turnPoints'] = diceGame['dicePoints'] + diceGame['diceBonus'];
}

function drawTable(){
    if(diceGame['yourTurn'] == 1){
        playerTab = document.querySelectorAll('#yourTable');
    }else{
        playerTab = document.querySelectorAll('#botTable');
    }

    playerTab[0].textContent = diceGame['dicePoints'];

    if(idBonus == 1){playerTab[1].textContent = diceGame['diceBonus'];
    }else{playerTab[1].textContent = 0;}

    if(idBonus == 2){playerTab[2].textContent = diceGame['diceBonus'];
    }else{playerTab[2].textContent = 0;}

    if(idBonus == 3){playerTab[3].textContent = diceGame['diceBonus'];
    }else{playerTab[3].textContent = 0;}

    if(idBonus == 4){playerTab[4].textContent = diceGame['diceBonus'];
    }else{playerTab[4].textContent = 0;}

    if(idBonus == 5){playerTab[5].textContent = diceGame['diceBonus'];
    }else{playerTab[5].textContent = 0;}

    if(idBonus == 6){playerTab[6].textContent = diceGame['diceBonus'];
    }else{playerTab[6].textContent = 0;}

    playerTab[7].textContent = diceGame['turnPoints'];

}

function botMechanism() {

        roundDices();
        for(i=1; i <= 5; ++i){
            if(diceGame['roundDice'][i]!==0){
                for(j=i+1 ; j<=5; ++j){
                    if(diceGame['roundDice'][i]==diceGame['roundDice'][j]){

                        if(diceGame['BotLogic']['type1'] === 0){
                        diceGame['BotLogic']['type1'] = diceGame['roundDice'][i];
                        }
                        if(diceGame['BotLogic']['type1'] !== diceGame['roundDice'][i]){
                        diceGame['BotLogic']['type2'] = diceGame['roundDice'][i];
                        } 
                    }
                }
            }
        }

        for (var i in diceGame['roundDice']) {  
            if(diceGame['turnCounter']===0){
                    takeDice(i);  
            }else{
                if(diceGame['roundDice'][i]==diceGame['BotLogic']['type1']){
                    takeDice(i);   
                }
                if(diceGame['roundDice'][i]==diceGame['BotLogic']['type2']){
                    takeDice(i); 
                }
            }
        }
}   

function botAction() {

    if(diceGame['turnCounter']==0){ 
            //player cube's going down
    for (var i in diceGame['roundDice']) {  
            diceGame['roundDice'][i] = 0;     
            diceGame['drawnDice'][i] = 0;     
    }
        turnReset(); 
        cleaningTab = document.querySelectorAll('.goodDice');
        cleaningTab.forEach(element => {
            element.style.backgroundImage='';
            
        });
    }else{
        setTimeout(()=>{botMechanism()},1000);
        setTimeout(()=>{botMechanism()},2000);
        setTimeout(()=>{botMechanism()},3000);
        setTimeout(()=>{botAction()},5000);
    }
}

function endTurn(){   
    if(diceGame['yourTurn'] == 1 && diceGame['turnCounter'] != 3){
    for (var i in diceGame['roundDice']) {  
        if(diceGame['roundDice'][i]!=0){
            takeDice(i);   
        }
        ['roundDice'][i] = 0;   
       //diceGame['drawnDice'][i] = 0;
    }
    for (var i in diceGame['drawnDice']) {  
       diceGame['drawnDice'][i] = 0;
    }

    turnReset();
    }
}



function turnReset() {
    diceGame['turnCounter'] = 3;
    diceGame['dicePoints'] = 0;
    diceGame['diceBonus'] = 0;
    diceGame['BotLogic']['type1'] = '';
    diceGame['BotLogic']['type2'] = '';
    document.querySelector('#turnLeft').textContent = "Turn left: " + diceGame['turnCounter'];

    if(diceGame['yourTurn'] == 1){
        diceGame['totalScore']['player'] += diceGame['turnPoints'];
        document.querySelector('#yourTotalScore').textContent = diceGame['totalScore']['player'];
        document.querySelector('#gamePrompt').textContent = "Bot turn.";
        diceGame['yourTurn'] = 0;
        botAction(); 
    }else{
        diceGame['totalScore']['bot'] += diceGame['turnPoints'];
        document.querySelector('#botTotalScore').textContent = diceGame['totalScore']['bot'];
        diceGame['yourTurn'] = 1;
        --diceGame['roundCounter'];
        document.querySelector('#roundsLeft').textContent = diceGame['roundCounter'] ;

        if(diceGame['roundCounter'] == 0 && diceGame['totalScore']['bot']>=diceGame['totalScore']['player']){
            document.querySelector('#gamePrompt').textContent = "Game over. BOT WIN.";
            document.querySelector('.buttons').textContent = "Game over. BOT WIN.";
            buttons.setAttribute("style", "color:red; border: 1px solid blue; font-size:50px; grid-template-columns: 100%;");
        }else if(diceGame['roundCounter'] == 0){
            document.querySelector('#gamePrompt').textContent = "Game over. YOU WIN.";
            document.querySelector('.buttons').textContent = "Game over. YOU WIN.";
            buttons.setAttribute("style", "color:red; border: 1px solid blue; font-size:50px; grid-template-columns: 100%;");
        }else{
            document.querySelector('#gamePrompt').textContent = "Player turn. Round and choose dice's.";
        }
    }
    diceGame['turnPoints'] = 0;
}
