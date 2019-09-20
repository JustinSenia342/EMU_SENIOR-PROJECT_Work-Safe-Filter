
//opens a link to the main options menu
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById("homeLink");
	
	link.addEventListener('click', function() {
		window.open('optionsMenu.html','_self');
	});
});

//opens the "add to blacklist" html file in a new window
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById("addBLLink");
	
	link.addEventListener('click', function() {
		window.open('addBL.html','','height=500,width=500,left=50%,top=50%');
	});
});

//opens the "remove from blacklist" html file in a new window
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById("remBLLink");
	
	link.addEventListener('click', function() {
		window.open('removeBL.html','','height=500,width=500,left=50%,top=50%');
	});
});

//opens the "add to whitelist" html file in a new window
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById("addWLLink");
	
	link.addEventListener('click', function() {
		window.open('addWL.html','','height=500,width=500,left=50%,top=50%');
	});
});

//opens the "remove from whitelist" html file in a new window
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById("remWLLink");
	
	link.addEventListener('click', function() {
		window.open('removeWL.html','','height=500,width=500,left=50%,top=50%');
	});
});

//opens the "Set Link" html file in a new window
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById("settLink");
	
	link.addEventListener('click', function() {
		window.open('settings.html','','height=500,width=500,left=50%,top=50%');
	});
});

//checks to see if the save button is clicked, opens a new window with many
//and allows one to save their options
document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById("saveButton");
	
	link.addEventListener('click', function() {
		save_options();
		window.open('settings.html','_self');
	});
});
		
// Saves options to chrome.storage
function save_options() {

		var fbOpt		= document.getElementById('FACEBOOK').checked;
		var tmblrOpt 	= document.getElementById('TUMBLR').checked;
		var ytbeOpt 	= document.getElementById('YOUTUBE').checked;
		var amazOpt 	= document.getElementById('AMAZON').checked;
		var ebayOpt 	= document.getElementById('EBAY').checked;
		var redditOpt 	= document.getElementById('REDDIT').checked;
		var pntrstOpt 	= document.getElementById('PINTEREST').checked;
		var ostockOpt 	= document.getElementById('OVERSTOCK').checked;
		var crglstOpt 	= document.getElementById('CRAIGSLIST').checked;
		var twittOpt 	= document.getElementById('TWITTER').checked;
		var zillwOpt 	= document.getElementById('ZILLOW').checked;
		var mspaceOpt 	= document.getElementById('MYSPACE').checked;
		var vimeoOpt 	= document.getElementById('VIMEO').checked;
		var mtcafeOpt 	= document.getElementById('METACAFE').checked;
		var veohOpt		= document.getElementById('VEOH').checked;
		var inarcOpt 	= document.getElementById('INTERNETARCHIVE').checked;
		var crcklOpt 	= document.getElementById('CRACKLE').checked;
		var sjunkOpt 	= document.getElementById('SCREENJUNKIES').checked;
		var opvidOpt 	= document.getElementById('OPENVIDEOPROJECT').checked;
		var ninggOpt 	= document.getElementById('NINEGAG').checked;
		var nflixOpt 	= document.getElementById('NETFLIX').checked;
		var huluOpt 	= document.getElementById('HULU').checked;

  chrome.storage.sync.set({
	  
	FACEBOOK: fbOpt,
	TUMBLR: tmblrOpt,
	YOUTUBE: ytbeOpt,
	AMAZON: amazOpt,
	EBAY: ebayOpt,
	REDDIT: redditOpt,
	PINTEREST: pntrstOpt,
	OVERSTOCK: ostockOpt,
	CRAIGSLIST: crglstOpt,
	TWITTER: twittOpt,
	ZILLOW: zillwOpt,
	MYSPACE: mspaceOpt,
	VIMEO: vimeoOpt,
	METACAFE: mtcafeOpt,
	VEOH: veohOpt,
	INTERNETARCHIVE: inarcOpt,
	CRACKLE: crcklOpt,
	SCREENJUNKIES: sjunkOpt,
	OPENVIDEOPROJECT: opvidOpt,
	NINEGAG: ninggOpt,
	NETFLIX: nflixOpt,
	HULU: huluOpt
		
	}, 
	function() 
	{
		//alert("saved values correctly");
	}
	);
	
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values all = true.
  chrome.storage.sync.get({
	  
	FACEBOOK: 			true,
	TUMBLR: 			true,
	YOUTUBE: 			true,
	AMAZON: 			true,
	EBAY: 				true,
	REDDIT: 			true,
	PINTEREST: 			true,
	OVERSTOCK: 			true,
	CRAIGSLIST: 		true,
	TWITTER: 			true,
	ZILLOW: 			true,
	MYSPACE: 			true,
	VIMEO: 				true,
	METACAFE: 			true,
	VEOH: 				true,
	INTERNETARCHIVE: 	true,
	CRACKLE: 			true,
	SCREENJUNKIES: 		true,
	OPENVIDEOPROJECT: 	true,
	NINEGAG: 			true,
	NETFLIX: 			true,
	HULU: 				true
	
  }, function(items) {
	  
	//if (items.FACEBOOK == true){document.getElementById('FACEBOOK').label = after;}
	document.getElementById('FACEBOOK').checked = items.FACEBOOK;
	document.getElementById('TUMBLR').checked = items.TUMBLR;
	document.getElementById('YOUTUBE').checked = items.YOUTUBE;
	document.getElementById('AMAZON').checked = items.AMAZON;
	document.getElementById('EBAY').checked = items.EBAY;
	document.getElementById('REDDIT').checked = items.REDDIT;
	document.getElementById('PINTEREST').checked = items.PINTEREST;
	document.getElementById('OVERSTOCK').checked = items.OVERSTOCK;
	document.getElementById('CRAIGSLIST').checked = items.CRAIGSLIST;
	document.getElementById('TWITTER').checked = items.TWITTER;
	document.getElementById('ZILLOW').checked = items.ZILLOW;
	document.getElementById('MYSPACE').checked = items.MYSPACE;
	document.getElementById('VIMEO').checked = items.VIMEO;
	document.getElementById('METACAFE').checked = items.METACAFE;
	document.getElementById('VEOH').checked = items.VEOH;
	document.getElementById('INTERNETARCHIVE').checked = items.INTERNETARCHIVE;
	document.getElementById('CRACKLE').checked = items.CRACKLE;
	document.getElementById('SCREENJUNKIES').checked = items.SCREENJUNKIES;
	document.getElementById('OPENVIDEOPROJECT').checked = items.OPENVIDEOPROJECT;
	document.getElementById('NINEGAG').checked = items.NINEGAG;
	document.getElementById('NETFLIX').checked = items.NETFLIX;
	document.getElementById('HULU').checked = items.HULU;
	
  });
  
}

//calls method to restore most of the chrome sync variables to make sure admin
//console has correct enable/disable values
document.addEventListener('DOMContentLoaded', restore_options());
