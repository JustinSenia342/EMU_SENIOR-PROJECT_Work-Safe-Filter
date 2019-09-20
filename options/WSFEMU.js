/*
*****************************************************************************************************************
***                           Work Safe Filter Main Program Javascript File                                   ***
*****************************************************************************************************************
		This is the main javascript file that runs in the background as long as the extension
		is loaded and on. It contains the main content filtering functions that are run
		on the intercepted webrequest data via chrome's webrequest API.
		"Work Safe Filter" detects violations of blacklisted search terms and website
		URLs (as well as redirecting to nonblacklisted sites based on those search results),
		It allows administrators to enable/disable timewasting websites with a large number
		of website toggles, it forces the user to use google, bing or yahoo with the most
		strict version of each of their respective safesearches enabled (these three currently
		are the most popular choices when it comes to using search engines online)
		by redirecting to them if users try and get around the filter by trying to access
		search engines that have more "laxed" content filtering policies.




*****************************************************************************************************************
***             Variables used to maintain consistency despite Asynchronicity in Chrome storage API           ***
*****************************************************************************************************************
		These are the variables used to determine if specific "timewaster" websites are
		enabled via the series of toggle switches in the administrator console.
		necessary due to the Asynchronous nature of chrome's synced storage API,
		thus these provide consistent values to pull from when running content analysis
		functions and won't lock up the storage API with too many requests happening 
		all at the same time.
*/

		var fbFlag 		= true;	//facebook flag
		var tmblrFlag 	= true;	//tumblr flag
		var ytbeFlag 	= true;	//youtube flag
		var amazFlag 	= true;	//amazon flag
		var ebayFlag 	= true;	//ebay flag
		var redditFlag 	= true;	//reddit flag
		var pntrstFlag 	= true;	//pinterest flag
		var ostockFlag 	= true; //overstock flag
		var crglstFlag 	= true;	//craigslsit flag
		var twittFlag 	= true;	//twitter flag
		var zillwFlag 	= true;	//zillow flag
		var mspaceFlag 	= true;	//myspace flag
		var vimeoFlag 	= true;	//vimeo flag
		var mtcafeFlag 	= true;	//metacafe flag
		var veohFlag 	= true; //veoh flag
		var inarcFlag 	= true;	//the internet archive flag
		var crcklFlag 	= true;	//crackle flag
		var sjunkFlag 	= true;	//screen junkies flag
		var opvidFlag 	= true;	//the open video project flag
		var ninggFlag 	= true;	//9 gag flag
		var nflixFlag 	= true;	//netflix flag
		var huluFlag 	= true;	//hulu flag
		
		var CensLoc		= "default"; 	//used to store location of Web Page Error files
		var pSet		= "false";		//used to determine if pin is set or not

		
	
/*
*****************************************************************************************************************
***             Variables used to maintain consistency despite Asynchronicity in Chrome storage API           ***
*****************************************************************************************************************
		Checks if the extension was just installed, if it wasn't: skip this step, if it was: 
		-clears all previously synced variables/PIN/Info that was stored online via the chrome storage API. 
		(This helps to prevent online storage issues as online space provided by the API has limitations) 
		(Also helps with network system updates, migrations or new implementations of this extension, 
		as it prevents old data from interfering with the new data)
		-Declares & Initializes all variables to be used for website toggle switches, Navigation URL
		location information, Navigation Flags, and the PIN value  
*/

chrome.runtime.onInstalled.addListener(function(details)
{
    if(details.reason == "install")
	{
		//StorageArea.clear();
		chrome.storage.sync.clear(),
		chrome.storage.sync.set({  
		FACEBOOK: true,
		TUMBLR: true,
		YOUTUBE: true,
		AMAZON: true,
		EBAY: true,
		REDDIT: true,
		PINTEREST: true,
		OVERSTOCK: true,
		CRAIGSLIST: true,
		TWITTER: true,
		ZILLOW: true,
		MYSPACE: true,
		VIMEO: true,
		METACAFE: true,
		VEOH: true,
		INTERNETARCHIVE: true,
		CRACKLE: true,
		SCREENJUNKIES: true,
		OPENVIDEOPROJECT: true,
		NINEGAG: true,
		NETFLIX: true,
		HULU: true,
		CENSURL: "default",
		pSet: false,
		pVal: "admin"
		
		}, 	function() 
			{
				//alert("variables initialized in memory");
				chrome.runtime.openOptionsPage();
			}
		);
		
	}
	
	//detects if this google chrome extension was updated, runs an alert if it was (for testing)
    else if(details.reason == "update"){
        //alert("i just got updated!");
    }
});



/*
*****************************************************************************************************************
***                                   Work Safe Filter Main Function                                          ***
*****************************************************************************************************************
		Main function that will constantly be run in the background.
		Utilizes chrome's webrequest API to intercept page communications which therefore allows
		this program to analyze communication requests, and modify them before they arrive at the
		user, making this an effective way of preventing undesired access to specific content.
*/
 
chrome.webRequest.onBeforeRequest.addListener(
	function(info) 
	{ 

		//*****************************************************************************************************************//
		//***                           Productivity Killer Websites Enable/Disable Flags                               ***//
		//*****************************************************************************************************************//
		
		//Flags used to enable or disable access to particular websites that are known to be problematic in the workplace
		
		
		//true is used as a default variable values if values are missing 
		//to err on the side of caution just in case there's an issue.
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
			HULU: 				true,
			CENSURL:			"default"   //
			
			}, function(items) {
				
			//assigning chrome.storage api synced items to background variables
			//in order to deal with the asynchronicity of it's storage and
			//retrieval functions.
			fbFlag 		= items.FACEBOOK;
			tmblrFlag 	= items.TUMBLR;
			ytbeFlag 	= items.YOUTUBE;
			amazFlag 	= items.AMAZON;
			ebayFlag 	= items.EBAY;
			redditFlag 	= items.REDDIT;
			pntrstFlag 	= items.PINTEREST;
			ostockFlag 	= items.OVERSTOCK;
			crglstFlag 	= items.CRAIGSLIST;
			twittFlag 	= items.TWITTER;
			zillwFlag 	= items.ZILLOW;
			mspaceFlag 	= items.MYSPACE;
			vimeoFlag 	= items.VIMEO;
			mtcafeFlag 	= items.METACAFE;
			veohFlag 	= items.VEOH;
			inarcFlag 	= items.INTERNETARCHIVE;
			crcklFlag 	= items.CRACKLE;
			sjunkFlag 	= items.SCREENJUNKIES;
			opvidFlag 	= items.OPENVIDEOPROJECT;
			ninggFlag 	= items.NINEGAG;
			nflixFlag 	= items.NETFLIX;
			huluFlag 	= items.HULU;
			CensLoc		= items.CENSURL;
		});

	
	
		//*****************************************************************************************************************//
		//***                              Search Engine Label Blacklist/Redirect Array                                 ***//
		//*****************************************************************************************************************//
		
		//Array populated with less popular search engines that may be accessed with the intent of circumnavigating
		//this content filtering application.
		
		var searchRedir = 
		[
			".ask.",
			".baidu.",
			".yandex.",
			".ixquick.",
			".startpage.",
			"duckduckgo.",
			".dogpile.",
			".excite.",
			".teoma.",
			".hakia.",
			"search.aol.",
			".lycos.",
			".activesearchresults.",
			".apexoo.",
			".blackle.",
			".entireweb.",
			".exalead.",
			".hotbot.",
			".mojeek.",
			"scrubtheweb.",
			"yippy."
		];

		
		
		//*****************************************************************************************************************//
		//***                               URL Based Search Parameter Blacklist Array                                  ***//
		//*****************************************************************************************************************//
		
		//Array populated with blacklisted NSFW/Offensive terms that will be completely blocked if searched for in a search engine
		
		//the lack of a periods in these terms means that the word can be found at any point in the URL and it will prompt 
		//a redirect. 	
		
		var banSrc = 
		[
			"tits",
			"tittie",
			"boob",
			"boobie",
			"breast",
			"vagina",
			"pussy",
			"cunt",
			"twat",
			"asshole",
			"anus",
			"fuck",
			"suck",
			"sex",
			"masturbate",
			"masturbation",
			"masturbator",
			"jerk+off",
			"dick",
			"cock",
			"schlong",
			"testicles",
			"penis",
			"porn",
			"nude",
			"nudity",
			"blowjob",
			"handjob",
			"milf",
			"shit",
			"nigger",
			"kike",
			"fag",
			"wetback"
		];

		
		
		//*****************************************************************************************************************//
		//***                               URL Based Specific Website Blacklist Array                                  ***//
		//*****************************************************************************************************************//
		
		//Blacklisted websites that have already been declared under the json manifest so users can be redirected
		//on arriving at those specific websites.
		
		//when the periods are included that indicates that a specific target URL is being blocked based on it's Base URL
		//naming convention.		
		
		var banSite = 
		[
			"pornhub.",
			"tube8.",
			"youporn.",
			"xnxx.",
			"xhamster.",
			"redtube.",
			"drtuber.",
			"keezmovies.",
			"pornhd.",
			"spankwire.",
			"xxxbunker.",
			"mofosex.",
			"spankbang.",
			"topfreepornvideos.",
			"pornrox.",
			"xbabe.",
			"pornhost.",
			"thenewporn.",
			"porndreamer.",
			"updatetube.",
			"befuck.",
			"wankoz.",
			"sexvid.",
			"slutload.",
			"proporn.",
			"myxvids.",
			"bravotube.",
			"tnaflixfree.",
			"pornicom.",
			"wetplace.",
			"pornid.",
			"fapdu.",
			"dansmovies.",
			"hdmovz.",
			"pornwatchers.",
			"metaporn.",
			"fuckuh.",
			"88fuck.",
			"pervclips.",
			"bestfreepornvideos.",
			"freudbox.",
			"pornheed.",
			"longporn.",
			"eroxia.",
			"x18.",
			"fakepor.",
			"pornrabbit.",
			"hdporn.",
			"fux.",
			"madthumbs.",
			"h2porn.",
			"porn-wanted.",
			"yourlustmovies.",
			"deviantclip.",
			"beeg.",
			"eporner.",
			"sunporno.",
			"pornerbros.",
			"nuvid.",
			"elephanttube.",
			"apetube.",
			"tubegalore.",
			"voyeurboss.",
			"xxvids.",
			"largeporntube.",
			"freetoptube.",
			"89.",
			"alotporn.",
			"porncor.",
			"tjoob.",
			"extremetube.",
			"porntitan.",
			"pornomovies.",
			"vid2c.",
			"submityourflicks.",
			"empflix.",
			"xxxymovies.",
			"ah-me.",
			"xxxdessert.",
			"hellporno.",
			"pervsonpatrol.",
			"vpornvideos.",
			"freeporn.",
			"mrbabes.",
			"loverofporn.",
			"pinkworld.",
			"eroticCandy.",
			"trolltube.",
			"sex.",
			"porn.",
			"vidz.",
			"tryboobs.",
			"jizzbunker.",
			"porn300.",
			"sleazyneasy.",
			"vivud.",
			"sexix.",
			"screwbox."
		];
		
		
		
		//*****************************************************************************************************************//
		//***                              Non- Google, Yahoo or Bing redirect protocol                                 ***//
		//*****************************************************************************************************************//
		
		//Alternative search engine redirect (Handles cases when less well known searh engines are used
		//to try and circumnavigate the content blocking algorithm: redirects to google.com if any search
		//engine other than google, yahoo or bing is accessed)
		
		for (j = 0; j < searchRedir.length; j++)
		{
			if(info.url.indexOf(searchRedir[j]) > -1)
			{
				info.url= "https://www.google.com/";
				return {redirectUrl: info.url}; 
			}
		}

		
		
		//*****************************************************************************************************************//
		//***                          URL based search parameter blacklist enforcement                                 ***//
		//*****************************************************************************************************************//
	
		//looks at URL to see if the search contains any blacklisted words (if blacklisted words are
		//found in the search URL: redirect to search error page
		
		for (i = 0; i < banSrc.length; i++)
		{
			if(info.url.indexOf(banSrc[i]) > -1)
			{
				info.url= CensLoc + "SRC_Censor.html";
				return {redirectUrl: info.url}; 
			}
		}

		
		
		//*****************************************************************************************************************//
		//***                          URL based specific website blacklist enforcement                                 ***//
		//*****************************************************************************************************************//
	
		//looks at URL to see if the search contains any blacklisted URLS (if specific blacklisted URLS are
		//found in the URL blacklist: redirect to URL blacklist error page
		
		for (i = 0; i < banSite.length; i++)
		{
			if(info.url.indexOf(banSite[i]) > -1)
			{
				info.url= CensLoc + "URL_Censor.html";
				return {redirectUrl: info.url}; 
			}
		}
		
		
		
		//*****************************************************************************************************************//
		//***                              Forcing safesearch in google, yahoo and bing                                 ***//
		//*****************************************************************************************************************//
		
		//Google, Yahoo and Bing were chosen as the three options to use because they are currently the world's top 3 search
		//engines based on popularity (not including "Baidu"), as such they are the only search engines allowed in this application.
		
		//If current website is google:
		if(info.url.indexOf(".google.") > -1)
		{
			//if "search" is found in the URL indicating a search was just just attempted AND
			//the URL lacks the words "safe=active" which indicates safe search is off:
			if (info.url.indexOf("search") > -1 && info.url.indexOf("safe=active") == -1)
			{
				//append "&safe=active" to current URL to force safesearch
				info.url= info.url+"&safe=active";						//enables safesearch if no option is shown in URL
				return {redirectUrl: info.url}; 						//returns updated URL to browser
			}
		}

		//else if website is Bing: 
		else if(info.url.indexOf(".bing.") > -1)
		{
			//if "search" is found in the URL indicating a search was just attempted AND
			//the URL lacks the words "adlt=strict" which indicates that safe search is off:
			if (info.url.indexOf("search") > -1 && info.url.indexOf("adlt=strict") == -1)
			{
				//append "&adlt=strict" to current URL to force safesearch
				info.url= info.url+"&adlt=strict";						//enables safesearch if no option is shown in URL
				return {redirectUrl: info.url}; 						//returns updated URL to browser
			}
		}

		//else if website is Yahoo
		else if(info.url.indexOf(".yahoo.") > -1)
		{
			//if "search is found in the URL indicating a search was just attempted AND
			//the URL lacks the words "vm=r" which indicates that safe search is off:
			if (info.url.indexOf("search") > -1 && info.url.indexOf("vm=r") == -1)
			{
				//append "&vm=r" to current URL to force safesearch
				info.url= info.url + "&vm=r";							//enables safesearch if no option is shown in URL
				return {redirectUrl: info.url}; 						//returns updated URL to browser
			}
		}


		
		//*****************************************************************************************************************//
		//***                    Productivity killer websites redirect enable/disable checking                          ***//
		//*****************************************************************************************************************//

		//Checks to see if destination URL is any website on productivity blacklist AND
		//Checks to see which boolean it corresponds to, then redirects if site access is disabled
		
		//alert("this is right before main loop: " + fbFlag);
		
		if		(fbFlag 	== true && info.url.indexOf(".facebook.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(tmblrFlag 	== true && info.url.indexOf(".tumblr.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(ytbeFlag 	== true && info.url.indexOf(".youtube.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(amazFlag 	== true && info.url.indexOf(".amazon.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(ebayFlag 	== true && info.url.indexOf(".ebay.") 			> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(redditFlag == true && info.url.indexOf(".reddit.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(pntrstFlag == true && info.url.indexOf(".pinterest.") 	> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(ostockFlag == true && info.url.indexOf(".overstock.") 	> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(crglstFlag == true && info.url.indexOf(".craigslist.") 	> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(twittFlag 	== true && info.url.indexOf("twitter.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(zillwFlag 	== true && info.url.indexOf(".zillow.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(mspaceFlag == true && info.url.indexOf(".myspace.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(vimeoFlag 	== true && info.url.indexOf("vimeo.com") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(mtcafeFlag == true && info.url.indexOf(".metacafe.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(veohFlag 	== true && info.url.indexOf(".veoh.") 			> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(inarcFlag 	== true && info.url.indexOf("archive.org") 	> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(crcklFlag 	== true && info.url.indexOf(".crackle.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(sjunkFlag 	== true && info.url.indexOf(".screenjunkies.") > -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(opvidFlag 	== true && info.url.indexOf("open-video.") 	> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(ninggFlag 	== true && info.url.indexOf("9gag.") 			> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(nflixFlag 	== true && info.url.indexOf(".netflix.") 		> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

		else if	(huluFlag 	== true && info.url.indexOf(".hulu.") 			> -1)
			{info.url= CensLoc + "DCT_Censor.html";}	//updates info.url with redirection link

				
		//returns modified URL (or unmodified URL if no blacklist entries were violated)
		//to browser and proceeds to target page URL
		return {redirectUrl: info.url}; 

	},
	
	
	
	//*****************************************************************************************************************//
	//***                 Declaring URL's to be used via chrome's "onBeforeRequest"                                 ***//
	//*****************************************************************************************************************//
	
	//In order for chrome to intercept the communication request (which can then be viewed/modified), every website that
	//this can be used on must be declared both in the main background script and the json manifest.
	
	//each "timewaster" website is put on here so they can be toggled on or off via the admin control panel
	
	//each of the three most popular search engines are declared on here as well so that i can force safesearch on them.
	//yahoo, bing and google. while bing and yahoo can be handled via regex search parameters, google has so many country
	//code variations that they each needed to be declared to make sure that all potential cases are accounted for.
	
	//each of the less popular search engines are declared on here as well, so the user can be redirected back to google
	
	//a list of the most popular porn sites are on here as well, so they can be searched for and blocked
	
	{urls: 
	[
		"*://*.ask.com/*",
		"*://*.baidu.com/*",
		"*://*.yandex.com/*",
		"*://*.ixquick.com/*",
		"*://*.startpage.com/*",
		"*://*.duckduckgo.com/*",
		"*://*.dogpile.com/*",
		"*://*.excite.com/*",
		"*://*.teoma.com/*",
		"*://*.hakia.com/*",
		"*://*.search.aol.com/*",
		"*://*.lycos.com/*",
		"*://*.activesearchresults.com/*",
		"*://*.apexoo.com/*",
		"*://*.blackle.com/*",
		"*://*.entireweb.com/*",
		"*://*.exalead.com/*",
		"*://*.hotbot.com/*",
		"*://*.mojeek.com/*",
		"*://*.scrubtheweb.com/*",
		"*://*.yippy.com/*",
		"*://*.facebook.com/*",
		"*://*.tumblr.com/*",
		"*://*.google.com/*",
		"*://*.youtube.com/*",
		"*://*.yahoo.com/*",
		"*://*.bing.com/*",
		"*://*.amazon.com/*",
		"*://*.ebay.com/*",
		"*://*.reddit.com/*",
		"*://*.pinterest.com/*",
		"*://*.overstock.com/*",
		"*://*.craigslist.org/*",
		"*://*.twitter.com/*",
		"*://*.zillow.com/*",
		"*://*.myspace.com/*",
		"*://*.vimeo.com/*",
		"*://*.metacafe.com/*",
		"*://*.veoh.com/*",
		"*://*.archive.org/*",
		"*://*.crackle.com/*",
		"*://*.screenjunkies.com/*",
		"*://*.open-video.org/*",
		"*://*.9gag.com/*",
		"*://*.netflix.com/*",
		"*://*.hulu.com/*",
		"*://www.google.ad/*",
		"*://www.google.ae/*",
		"*://www.google.af/*",
		"*://www.google.ag/*",
		"*://www.google.al/*",
		"*://www.google.am/*",
		"*://www.google.as/*",
		"*://www.google.at/*",
		"*://www.google.az/*",
		"*://www.google.ba/*",
		"*://www.google.be/*",
		"*://www.google.bf/*",
		"*://www.google.bg/*",
		"*://www.google.bi/*",
		"*://www.google.bj/*",
		"*://www.google.bo/*",
		"*://www.google.bs/*",
		"*://www.google.bt/*",
		"*://www.google.by/*",
		"*://www.google.ca/*",
		"*://www.google.cc/*",
		"*://www.google.cd/*",
		"*://www.google.cf/*",
		"*://www.google.cg/*",
		"*://www.google.ch/*",
		"*://www.google.ci/*",
		"*://www.google.cl/*",
		"*://www.google.cm/*",
		"*://www.google.cn/*",
		"*://www.google.co.ao/*",
		"*://www.google.co.bw/*",
		"*://www.google.co.ck/*",
		"*://www.google.co.cr/*",
		"*://www.google.co.gy/*",
		"*://www.google.co.hu/*",
		"*://www.google.co.id/*",
		"*://www.google.co.il/*",
		"*://www.google.co.in/*",
		"*://www.google.co.jp/*",
		"*://www.google.co.ke/*",
		"*://www.google.co.kr/*",
		"*://www.google.co.ls/*",
		"*://www.google.co.ma/*",
		"*://www.google.co.mz/*",
		"*://www.google.co.nz/*",
		"*://www.google.co.pe/*",
		"*://www.google.co.th/*",
		"*://www.google.co.tz/*",
		"*://www.google.co.ug/*",
		"*://www.google.co.uz/*",
		"*://www.google.co.ve/*",
		"*://www.google.co.vi/*",
		"*://www.google.co.za/*",
		"*://www.google.co.zm/*",
		"*://www.google.co.zw/*",
		"*://www.google.co/*",
		"*://www.google.com.af/*",
		"*://www.google.com.ag/*",
		"*://www.google.com.ai/*",
		"*://www.google.com.aq/*",
		"*://www.google.com.ar/*",
		"*://www.google.com.au/*",
		"*://www.google.com.bd/*",
		"*://www.google.com.bh/*",
		"*://www.google.com.bi/*",
		"*://www.google.com.bn/*",
		"*://www.google.com.bo/*",
		"*://www.google.com.br/*",
		"*://www.google.com.by/*",
		"*://www.google.com.bz/*",
		"*://www.google.com.cn/*",
		"*://www.google.com.co/*",
		"*://www.google.com.cu/*",
		"*://www.google.com.cy/*",
		"*://www.google.com.do/*",
		"*://www.google.com.ec/*",
		"*://www.google.com.eg/*",
		"*://www.google.com.et/*",
		"*://www.google.com.fj/*",
		"*://www.google.com.ge/*",
		"*://www.google.com.gh/*",
		"*://www.google.com.gi/*",
		"*://www.google.com.gp/*",
		"*://www.google.com.gr/*",
		"*://www.google.com.gt/*",
		"*://www.google.com.gy/*",
		"*://www.google.com.hk/*",
		"*://www.google.com.ht/*",
		"*://www.google.com.iq/*",
		"*://www.google.com.jm/*",
		"*://www.google.com.jo/*",
		"*://www.google.com.kh/*",
		"*://www.google.com.kw/*",
		"*://www.google.com.kz/*",
		"*://www.google.com.lb/*",
		"*://www.google.com.ly/*",
		"*://www.google.com.mm/*",
		"*://www.google.com.mt/*",
		"*://www.google.com.mx/*",
		"*://www.google.com.my/*",
		"*://www.google.com.na/*",
		"*://www.google.com.nf/*",
		"*://www.google.com.ng/*",
		"*://www.google.com.ni/*",
		"*://www.google.com.nl/*",
		"*://www.google.com.np/*",
		"*://www.google.com.nr/*",
		"*://www.google.com.om/*",
		"*://www.google.com.pa/*",
		"*://www.google.com.pe/*",
		"*://www.google.com.pg/*",
		"*://www.google.com.ph/*",
		"*://www.google.com.pk/*",
		"*://www.google.com.pl/*",
		"*://www.google.com.pr/*",
		"*://www.google.com.ps/*",
		"*://www.google.com.py/*",
		"*://www.google.com.qa/*",
		"*://www.google.com.ru/*",
		"*://www.google.com.sa/*",
		"*://www.google.com.sb/*",
		"*://www.google.com.sg/*",
		"*://www.google.com.sl/*",
		"*://www.google.com.sv/*",
		"*://www.google.com.tj/*",
		"*://www.google.com.tn/*",
		"*://www.google.com.tr/*",
		"*://www.google.com.tw/*",
		"*://www.google.com.ua/*",
		"*://www.google.com.uy/*",
		"*://www.google.com.vc/*",
		"*://www.google.com.ve/*",
		"*://www.google.com.vn/*",
		"*://www.google.cv/*",
		"*://www.google.cz/*",
		"*://www.google.de/*",
		"*://www.google.dj/*",
		"*://www.google.dk/*",
		"*://www.google.dm/*",
		"*://www.google.dz/*",
		"*://www.google.ec/*",
		"*://www.google.ee/*",
		"*://www.google.es/*",
		"*://www.google.fi/*",
		"*://www.google.fm/*",
		"*://www.google.fr/*",
		"*://www.google.ga/*",
		"*://www.google.ge/*",
		"*://www.google.gf/*",
		"*://www.google.gl/*",
		"*://www.google.gm/*",
		"*://www.google.gp/*",
		"*://www.google.gr/*",
		"*://www.google.gy/*",
		"*://www.google.hk/*",
		"*://www.google.hn/*",
		"*://www.google.hr/*",
		"*://www.google.ht/*",
		"*://www.google.hu/*",
		"*://www.google.ie/*",
		"*://www.google.in/*",
		"*://www.google.iq/*",
		"*://www.google.is/*",
		"*://www.google.it/*",
		"*://www.google.jo/*",
		"*://www.google.jp/*",
		"*://www.google.kg/*",
		"*://www.google.ki/*",
		"*://www.google.kz/*",
		"*://www.google.la/*",
		"*://www.google.li/*",
		"*://www.google.lk/*",
		"*://www.google.lt/*",
		"*://www.google.lu/*",
		"*://www.google.lv/*",
		"*://www.google.ma/*",
		"*://www.google.md/*",
		"*://www.google.mg/*",
		"*://www.google.mk/*",
		"*://www.google.ml/*",
		"*://www.google.mn/*",
		"*://www.google.ms/*",
		"*://www.google.mu/*",
		"*://www.google.mv/*",
		"*://www.google.mw/*",
		"*://www.google.mx/*",
		"*://www.google.ne/*",
		"*://www.google.ng/*",
		"*://www.google.nl/*",
		"*://www.google.no/*",
		"*://www.google.nr/*",
		"*://www.google.nu/*",
		"*://www.google.pf/*",
		"*://www.google.pk/*",
		"*://www.google.pl/*",
		"*://www.google.pn/*",
		"*://www.google.ps/*",
		"*://www.google.pt/*",
		"*://www.google.qa/*",
		"*://www.google.re/*",
		"*://www.google.ro/*",
		"*://www.google.ru/*",
		"*://www.google.rw/*",
		"*://www.google.sc/*",
		"*://www.google.se/*",
		"*://www.google.sh/*",
		"*://www.google.si/*",
		"*://www.google.sk/*",
		"*://www.google.sl/*",
		"*://www.google.sm/*",
		"*://www.google.sn/*",
		"*://www.google.so/*",
		"*://www.google.sr/*",
		"*://www.google.st/*",
		"*://www.google.td/*",
		"*://www.google.tg/*",
		"*://www.google.tk/*",
		"*://www.google.tm/*",
		"*://www.google.tn/*",
		"*://www.google.to/*",
		"*://www.google.tt/*",
		"*://www.google.ua/*",
		"*://www.google.us/*",
		"*://www.google.uz/*",
		"*://www.google.vg/*",
		"*://www.google.vn/*",
		"*://www.google.vu/*",
		"*://www.google.ws/*",
		"*://*.pornhub.com/*",
		"*://*.tube8.com/*",
		"*://*.youporn.com/*",
		"*://*.xnxx.com/*",
		"*://*.xhamster.com/*",
		"*://*.redtube.com/*",
		"*://*.drtuber.com/*",
		"*://*.keezmovies.com/*",
		"*://*.pornhd.com/*",
		"*://*.spankwire.com/*",
		"*://*.xxxbunker.com/*",
		"*://*.mofosex.com/*",
		"*://*.spankbang.com/*",
		"*://*.topfreepornvideos.com/*",
		"*://*.pornrox.com/*",
		"*://*.xbabe.com/*",
		"*://*.pornhost.com/*",
		"*://*.thenewporn.com/*",
		"*://*.porndreamer.com/*",
		"*://*.updatetube.com/*",
		"*://*.befuck.com/*",
		"*://*.wankoz.com/*",
		"*://*.sexvid.xxx/*",
		"*://*.slutload.com/*",
		"*://*.proporn.com/*",
		"*://*.myxvids.com/*",
		"*://*.bravotube.net/*",
		"*://*.tnaflixfree.net/*",
		"*://*.pornicom.com/*",
		"*://*.wetplace.com/*",
		"*://*.pornid.xxx/*",
		"*://*.fapdu.com/*",
		"*://*.dansmovies.com/*",
		"*://*.hdmovz.com/*",
		"*://*.pornwatchers.com/*",
		"*://*.metaporn.com/*",
		"*://*.fuckuh.com/*",
		"*://*.88fuck.com/*",
		"*://*.pervclips.com/*",
		"*://*.bestfreepornvideos.com/*",
		"*://*.freudbox.com/*",
		"*://*.pornheed.com/*",
		"*://*.longporn.com/*",
		"*://*.eroxia.com/*",
		"*://*.x18.xxx/*",
		"*://*.fakeporn.tv/*",
		"*://*.pornrabbit.com/*",
		"*://*.hdporn.net/*",
		"*://*.fux.com/*",
		"*://*.madthumbs.com/*",
		"*://*.h2porn.com/*",
		"*://*.porn-wanted.com/*",
		"*://*.yourlustmovies.com/*",
		"*://*.deviantclip.com/*",
		"*://*.beeg.com/*",
		"*://*.eporner.com/*",
		"*://*.sunporno.com/*",
		"*://*.pornerbros.com/*",
		"*://*.nuvid.com/*",
		"*://*.elephanttube.com/*",
		"*://*.apetube.com/*",
		"*://*.tubegalore.com/*",
		"*://*.voyeurboss.com/*",
		"*://*.xxvids.net/*",
		"*://*.largeporntube.com/*",
		"*://*.freetoptube.com/*",
		"*://*.89.com/*",
		"*://*.alotporn.com/*",
		"*://*.porncor.com/*",
		"*://*.tjoob.com/*",
		"*://*.extremetube.com/*",
		"*://*.porntitan.com/*",
		"*://*.pornomovies.com/*",
		"*://*.vid2c.com/*",
		"*://*.submityourflicks.com/*",
		"*://*.empflix.com/*",
		"*://*.xxxymovies.com/*",
		"*://*.ah-me.com/*",
		"*://*.xxxdessert.com/*",
		"*://*.hellporno.com/*",
		"*://*.pervsonpatrol.com/*",
		"*://*.vpornvideos.com/*",
		"*://*.freeporn.com/*",
		"*://*.mrbabes.com/*",
		"*://*.loverofporn.com/*",
		"*://*.pinkworld.com/*",
		"*://*.eroticCandy.com/*",
		"*://*.trolltube.com/*",
		"*://*.sex.com/*",
		"*://*.porn.com/*",
		"*://*.vidz.com/*",
		"*://*.tryboobs.com/*",
		"*://*.porn300.com/*",
		"*://*.sleazyneasy.com/*",
		"*://*.vivud.com/*",
		"*://*.sexix.net/*",
		"*://*.screwbox.com/*",
		"*://*.jizzbunker.com/*"
	]},
	
	
	
	["blocking"]);
