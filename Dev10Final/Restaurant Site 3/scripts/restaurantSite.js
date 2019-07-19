/*
	Name: Philip McGee
	Date Created: 7/9/19
	Most recent revision: 7/19/2019
*/

//Checkbox validation
function dataChecker() {
	var monday=document.forms["contactUs"]["Monday"].checked;
	var tuesday=document.forms["contactUs"]["Tuesday"].checked;
	var wednesday=document.forms["contactUs"]["Wednesday"].checked;
	var thursday=document.forms["contactUs"]["Thursday"].checked;
	var friday=document.forms["contactUs"]["Friday"].checked;

	if(!monday&&!tuesday&&!wednesday&&!thursday&&!friday){
		document.getElementById("checkboxError").style.display = "block";
		event.preventDefault();
		event.stopPropagation();
		return;
	}
	
}
//required box validation
var forms= document.querySelectorAll('.validate');
for (var i =0; i < forms.length; i++) {
	forms[i].setAttribute('novalidate', true);
}
//check for error
var hasError = function(field){
	
	
	
	
	if (field.disabled || field.type === 'file' || field.type === 'reset' || 
	field.type === 'submit' || field.type === 'button') return;
	
	var validityCheck = field.validity;
	
	if (validityCheck.valid) return;
	
	if (validityCheck.valueMissing) {
		
		if(field.type === "checkbox") return "Please select at least one day.";
		
	return "Please fill out this field.";
	}
	if (validityCheck.typeMismatch) {
		if (field.type === "email") return "Please enter an email address.";
		if (field.type === "url") return "Please enter a URL.";
	}
	if (validityCheck.tooShort) return "Please lengthen this text to " + field.getAttribute("minLength") + " characters or more.";
	if (validityCheck.tooLong) return "Please shorten this text to " + field.getAttention("maxLength") + " characters.";
	if (validityCheck.badInput) return "Please enter a number.";
	if (validityCheck.stepMismatch) return "Please select a valid value.";
	if (validityCheck.rangeOverflow) return "Please select a value that is no more than " + field.getAttention("max") + ".";
	if (validityCheck.rangeUnderflow) return "Please select a value that is no less than " + field.getAttention("min") + ".";
	if (validityCheck.patternMismatch) {
		
		if (field.hasAttribute("title")) return field.getAttention("title");

		return "Please match the requested format.";
	}
	
	return "The value you entered for this field is invalid.";
	
};
//display the error or update the error text
var showError = function (field, error) {
	
	field.classList.add("error");
	
	if (field.type === "radio" && field.name) {
		var group = document.getElementsByName(field.name);
		if (group.length > 0) {
			for (var i = 0; i <group.length; i++) {
				if (group[i].form !==field.form) continue;
				group[i].classList.add("error");
			}
			field = group[group.length -1];
		}
	}
		
	
	var id = field.id || field.name;
	if (!id) return;
	
	var message = field.form.querySelector(".error-message#error-for-" + id);
	if (!message){
		message = document.createElement("div");
		message.className = "error-message ";
		message.id = "error-for-" + id;
		
		
		var label;
		if (field.type === "radio" || field.type === "checkbox"){
			label = field.form.querySelector("label[for='" + id + "']") || field.parentNode;
			if (label) {
				label.parentNode.insertBefore( message, label.nextSibling);
			}
		}
		if (!label) {
			field.parentNode.insertBefore( message, field.nextSibling);
		}
	
	}
	
	field.setAttribute("aria-describedby", "error-for-" + id);
	
	message.innerHTML = error;
	//message.classList.add(" row ");
	//document.getElementById("invalidPhone").innerText= error;
	message.style.display = "block";
	message.style.visiblity = "visible";
	
};
// remove the error when it is resolved	
var removeError = function (field) {
	field.classList.remove("error");
	
	if (field.type === "radio" && field.name) {
		var group = document.getElementsByName(field.name);
		if (group.length > 0) {
			for (var i =0; i < group.length; i++) {
				if (group[i].form !== field.form) continue;
				group[i].classList.remove("error");
			}
			field = group[group.length -1];
		}
	}
		
	
	field.removeAttribute("aria-describedby");
	
	var id = field.id || field.name;
	if (!id) return;
	
	var message = field.form.querySelector(".error-message#error-for-" + id + "");
	if (!message) return;
	
	message.innerHTML = "";
	message.style.display = "none";
	message.style.visibility = "hidden";
	
	
};
//check if box has been active then left, keep doing it 
document.addEventListener('blur', function (event) {
	
	if (!event.target.form.classList.contains('validate')) return;
	
	var error=hasError(event.target);
	
	if (error) {
		showError(event.target, error);
		return;
	}
	
	removeError(event.target);
	
	
}, true);

//check for submit button press
document.addEventListener("submit", function (event){
	
	if (!event.target.classList.contains("validate")) return;
	
	var fields = event.target.elements;
	
	var error, hasErrors;
	for (var i =0; i < fields.length; i++){
		error = hasError(fields[i]);
		if (error) {
			showError(fields[i], error);
			if (!hasErrors) {
				hasErrors = fields[i];
			}
		}
	}
	if (hasErrors) {
		event.preventDefault();
		hasErrors.focus();
	}
	document.getElementById("checkboxError").style.display = "none";
	alert("Your submission has been recieved.");
	
}, false);




	
	