/*
through event listeners, when the user hits the submit button, the potential PIN
entered is checked against multiple fields, if it fails you ge tto retry, if it
succeeds then it stores the value in the cloud via chrome's storage API and sets
the stored cloud variable to true, so the optionshub page will redirect to the login
page from now on
*/

document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById("createPinButton");
	
	link.addEventListener('click', function() {
		
		if (document.getElementById("PINActual").value.length == 0 ||
			document.getElementById("PINVerify").value.length == 0)
		{
			alert ("Neither PIN field can be left empty! Please try again...");
		}
			
		else if (document.getElementById("PINActual").value != document.getElementById("PINVerify").value)
		{
			alert ("Pin and Re-entry of pin do not match! Please try again...");
		}
		
		else if (document.getElementById("PINActual").value.length < 8)
		{
			alert ("Pin must be longer than seven alphanumeric characters! Please try again...");
		}
		
		else
		{
			
			chrome.storage.sync.set({
	  
			pSet:	true,
			pVal:	document.getElementById("PINActual").value
				
			}, 
			function() 
			{
				window.open('optionsHub.html','_self');
			}
			);
		}

	});
});