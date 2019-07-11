function clearErrors() {
	for (var loopCounter = 0; loopCounter < document.forms["lucky7"].elements.length; loopCounter++){
		if (document.forms["lucky7"].elements[loopCounter].parentElement.className.indexOf("has-") !=-1) {
				document.forms["lucky7"].elements[loopCounter].parentElement.className="form-group";
		}
	}
}
function resetGame() {
	location.reload();
	//clearErrors();
	//document.forms["lucky7"]["bet"].value = "";
	//document.getElementById("results").style.display = "none";
	//document.forms["lucky7"]["bet"].focus();
	//document.getElementById("resetbtn").style.display = "none";
}
	
function rollDiceAdder(numDie) {
	var sum=0;
	for(i=0; i<numDie; i++){
		sum = sum + Math.floor(Math.random()*6)+1;
	}
	return sum;
}
function inital(){
	var initalbet= (prompt("Please enter your starting bid in dollars."))
	document.forms["lucky7"]["bet"].value = Number(initalbet);
	document.forms["lucky7"]["play"].focus();
}
	

function playGame() {
	clearErrors();
	var bet= document.forms["lucky7"]["bet"].value;
	var betNum= Number(bet);
	var rollSum=0;
	var maxMoney=0;
	var maxMoneyRollSum=0;
	var gameMoney=betNum;
	if (betNum<=0){
		alert("Bet must be greater than 0");
		document.form["lucky7"]["bet"].parentElement.className = "form-group has-error";
		document.form["lucky7"]["bet"].focus();
		return false
	}
	while (gameMoney>0){
		rollSum++;
		if (maxMoney<=gameMoney){
			maxMoney=gameMoney;
			maxMoneyRollSum=rollSum;
		}
		if(rollDiceAdder(2) === 7){
			gameMoney = gameMoney+4;
		}else{
			gameMoney = gameMoney-1;
		}
		
		
	}
	
		document.getElementById("results").style.display = "block";
		document.getElementById("startBet").innerText = betNum;
		document.getElementById("rollSum").innerText = rollSum;
		document.getElementById("maxMoney").innerText = maxMoney;
		document.getElementById("maxMoneyRollSum").innerText = maxMoneyRollSum;
		document.getElementById("resetbtn").style.display = "block";
	
	return false;
}
	