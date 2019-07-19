/*
	Name: Philip McGee
	Date Created: 7/9/19
	Most recent revision: 7/19/2019

*/

function clearErrors() {
	for (var loopCounter = 0; loopCounter < document.forms["lucky7"].elements.length; loopCounter++){
		if (document.forms["lucky7"].elements[loopCounter].parentElement.className.indexOf("has-") !=-1) {
				document.forms["lucky7"].elements[loopCounter].parentElement.className="form-group";
		}
	}
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

function rollDiceAdder(numDie) {
	var sum=0;
	for(i=0; i<numDie; i++){
		sum = sum + Math.floor(Math.random()*6)+1;
	}
	return sum;
}
function inital(){
	var initalbet= (prompt("Please enter your starting bid in dollars."))
		if(!isNaN(Number(initalbet))){
			document.forms["lucky7"]["bet"].value = formatter.format(Number(initalbet));
		} else {
			document.forms["lucky7"]["bet"].value = initalbet;
	document.forms["lucky7"]["play"].focus();
		}
}
function playAgain(){
	if(confirm("Play Again")){
		document.forms["lucky7"]["bet"].value = "";
		document.getElementById("results").style.display = "none";
		setTimeout(inital, 100);
		
	}
}

function playGame() {
	clearErrors();
	var bet=  document.forms["lucky7"]["bet"].value;
	if (bet.charAt(0)==="$")
	{
		bet= bet.slice(1,bet.length+1);
	}
	while (bet.indexOf(",",)!=-1){
		bet=  bet.replace(/,/i,"");
	}
		
	var betNum= Number(bet);
	var rollSum=0;
	var maxMoney=0;
	var maxMoneyRollSum=0;
	var gameMoney=betNum;
	if (betNum<=0 || isNaN(betNum)){
		alert("Bet must be a number greater than 0");
		document.form["lucky7"]["bet"].parentElement.className = "form-group has-error";
		document.form["lucky7"]["bet"].focus();
		return false
	}
	while (gameMoney>0){
		
		if (maxMoney<=gameMoney){
			maxMoney=gameMoney;
			maxMoneyRollSum=rollSum;
		}
		rollSum++;
		if(rollDiceAdder(2) === 7){
			gameMoney = gameMoney+4;
		}else{
			gameMoney = gameMoney-1;
		}
		
	}
		document.getElementById("results").style.display = "block";
		document.getElementById("startBet").innerText = formatter.format(betNum);
		document.getElementById("rollSum").innerText = rollSum;
		//this is either maxMoney or maxMoney-betNum depending on if inital bet is included in money won.
		document.getElementById("maxMoney").innerText = formatter.format(maxMoney-betNum);
		document.getElementById("maxMoneyRollSum").innerText = maxMoneyRollSum;
		setTimeout(playAgain, 3000);
			
	return false;
}