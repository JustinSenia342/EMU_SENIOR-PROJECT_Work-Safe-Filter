/*
The function below adds an event listener to the optionsHub.html page so that it will run when
the options hub finally loads all of it's dom content. This then determines if it's the first
time running or not, if it is, then the user is redirected to a page where they can create their 
admin login, if its not, then the user is redirected to the login page for the admin console.
directory structure is also copied from optionHub.html's location to drive the censorship
pages later.
*/

document.addEventListener('DOMContentLoaded', function(){
	
	var tempAddress = "default";	//will store current page location
	var pinIsSet = false;			//will store whether pin is set or not
	
	//getting current URL and trimming to size for later use
	var stringPathName = window.location.href;
	var stringPathLastSlash = stringPathName.lastIndexOf("/");
	
	tempAddress = stringPathName.substring(0, stringPathLastSlash+1);
	
	//setting page location in synced variable for later use in redirecting to censorship pages
	chrome.storage.sync.set({
	  
	CENSURL: tempAddress
		
	}, 
	function() 
	{
		//alert("saved values correctly");
	}
	);
	

	//if pin isn't set yet, redirect to set pin page
	//if pin is set, redirect to login page
	// Use default values all = true.
	chrome.storage.sync.get({
	  
	pSet: 				false
	
	}, function(items) {
	  
	pinIsSet = items.pSet;
	
	if (pinIsSet == false)
	{
		window.open('pinSet.html','_self');
	}
	else
	{
		window.open('login.html','_self');
	}

	});
  
});