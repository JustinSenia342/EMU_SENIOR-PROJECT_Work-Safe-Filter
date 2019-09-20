/*
function uses an eventlistener that waits for the DOMcontent to load on the login.html page
it's linked to. it checks the user input found in the text input field which also has an
event listener linked to it, retrieves the original saved pin from chrome's storage API
and compares to values, if they match: navigate to the extension options page,
if they dont match: kick back and error and ask them to try again.

Side Note: the chrome storage api has a limited number of calls it can make in a given period of time,
so while it's a high enough number that it shouldn't impede individual users, it's effective
against brute force attempts to crack the PIN.
*/

//adding event listener to run function when login.html has loaded
document.addEventListener('DOMContentLoaded', function() {

	//getting login button element reference by ID and assigning to variable
	var link = document.getElementById("logButton");
	
	//adding event listener to login button element to work on left click
	link.addEventListener('click', function() {
			
		//Retrieving PIN from cloud
		chrome.storage.sync.get({
			  
			pVal: 	"admin"
			
			}, function(items) {
			  
			//if textbox entry doesn't match admin PIN, alert user w/error message
			if (document.getElementById("PINEntry").value != items.pVal)
			{
				alert("Entered PIN is Incorrect! Please try again...");
			}
			
			//if textbox entry matches admin pin, redirect to extension options menu
			else if (document.getElementById("PINEntry").value == items.pVal)
			{
				window.open('optionsMenu.html','_self');
			}
			
		});
	});
});