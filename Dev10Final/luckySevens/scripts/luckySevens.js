/*
	Name: Philip McGee
	Date Created: 7/9/19
	Most recent revision: 7/19/2019

*/
//remove any errors in the form
function clearErrors() {
	for (var loopCounter = 0; loopCounter < document.forms["lucky7"].elements.length; loopCounter++){
		if (document.forms["lucky7"].elements[loopCounter].parentElement.className.indexOf("has-") !=-1) {
				document.forms["lucky7"].elements[loopCounter].parentElement.className="form-group";
		}
	}
}
//formate the number with dollar sign and two decimals 
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
//data the number of die that are passed to the function
function rollDiceAdder(numDie) {
	var sum=0;
	for(i=0; i<numDie; i++){
		sum = sum + Math.floor(Math.random()*6)+1;
	}
	return sum;
}
//run on page load and when called to take a bet from the user
function inital(){
	var initalbet= (prompt("Please enter your starting bid in dollars."))
		if(!isNaN(Number(initalbet))){
			document.forms["lucky7"]["bet"].value = formatter.format(Number(initalbet));
		} else {
			document.forms["lucky7"]["bet"].value = initalbet;
	document.forms["lucky7"]["play"].focus();
		}
}

//run when called to reset form and table
function playAgain(){
	if(confirm("Play Again")){
		document.forms["lucky7"]["bet"].value = "";
		document.getElementById("results").style.display = "none";
		setTimeout(inital, 100);
		
	}
}
//main game function take bet then play until no money remains 
function playGame() {
	clearErrors();
	var bet=  document.forms["lucky7"]["bet"].value;
	if (bet.charAt(0)==="$")
	{
		bet= bet.slice(1,bet.length+1); //get the dollar sign removed
	}
	while (bet.indexOf(",",)!=-1){	//remove any commas
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
	while (gameMoney>0){ //play only when there is money
		
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
		//display table and results
		document.getElementById("results").style.display = "block";
		document.getElementById("startBet").innerText = formatter.format(betNum);
		document.getElementById("rollSum").innerText = rollSum;
		//this is either maxMoney or maxMoney-betNum depending on if inital bet is included in money won.
		document.getElementById("maxMoney").innerText = formatter.format(maxMoney-betNum);
		document.getElementById("maxMoneyRollSum").innerText = maxMoneyRollSum;
		setTimeout(playAgain, 3000);
			
	return false;
}