function clearErrors() {
	for (var loopCounter = 0; loopCounter < document.forms["disEven"].elements.length; loopCounter++){
		if (document.forms["disEven"].elements[loopCounter].parentElement.className.indexOf("has-") !=-1) {
				document.forms["disEven"].elements[loopCounter].parentElement.className="form-group";
		}
	}
}
function checknums() {
	clearErrors();
	var startnum = document.forms["disEven"]["startnum"].value;
	var endnum = document.forms["disEven"]["endnum"].value;
	var stepnum = document.forms["disEven"]["stepnum"].value;
	
	var size=0;
	var start=Number(startnum);
	var end=Number(endnum);
	var step=Number(stepnum);
	var arraynum= new Array();
	var backString = "";
	if (startnum == "" || isNaN(startnum)){
		alert("Starting number must be filled in with a number.");
		document.forms["disEven"]["startnum"].parentElement.className = "form-group has-error";
		document.forms["disEven"]["startnum"].focus();
		return false;
	}
	if (endnum == "" || isNaN(endnum)){
		alert("Starting number must be filled in with a number.");
		document.forms["disEven"]["endnum"].parentElement.className = "form-group has-error";
		document.forms["disEven"]["endnum"].focus();
		return false;
	}
	if (stepnum == "" || isNaN(stepnum)){
		alert("Starting number must be filled in with a number.");
		document.forms["disEven"]["stepnum"].parentElement.className = "form-group has-error";
		document.forms["disEven"]["stepnum"].focus();
		return false;
	}
	if (step <= 0){
		alert("Step must be greater than zero.");
		document.forms["disEven"]["stepnum"].parentElement.className = "form-group has-error";
		document.forms["disEven"]["stepnum"].focus();
		return false;
	}
if (start >= end){
		alert("Starting number must be less than ending number.");
		document.forms["disEven"]["startnum"].parentElement.className = "form-group has-error";
		document.forms["disEven"]["startnum"].focus();
		return false;
	}
	for (start; start<=end; start=start+step){
		if (start%2===0){
			arraynum.push(start);
			size++;
		}
	}
	document.getElementById("results").style.display = "block";
	document.getElementById("startnumDis").innerText= startnum;
	document.getElementById("endnumDis").innerText = endnum;
	document.getElementById("stepnumDis").innerText = stepnum;
	for (var i=0;i<size; i++){
		backString=backString+arraynum[i]+"\n"
	}
	document.getElementById("returnedResult").innerText = backString;
	
	return false;
}
