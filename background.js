

console.log("Its background script baby!");

var contentId;
var popupTabId;
var popupId;
var windowId;
var popupone;
var lastFocused;
var tabId;
var cyclePosition = 0;


//Object for process multiply user
var bodies = {

	//construct new position
	addBody:function(login,password){
	let undefBody = this.forUndef();
	if (undefBody === undefined){
		console.log("Out of slots");
		return
	};
	this[undefBody] = new function(){
		this.login = login;
		this.password = password;
	};
	},

	//current positions
	body1:{
	login:"vkomelkov",
	password:"1"
	},
	body2:{
	login:"VPasichnik",
	password:"1"
	},

	//Return first undefined position
	forUndef:function(){
	for (i = 1; i <= 5; i++) {
	var arg = "body" + i;
		if (this[arg] === undefined){
		return arg
		}
	}
	}
};



var centralScript = {

	start: function(){
	if (cyclePosition !== 0) {
		setTimeout(sendToPopup,1000,"Already started baby");
		return
	}
	cyclePosition = "Started";
	setTimeout(sendToPopup,1000,"Haters gona hate vladislove gona loved");
	this.timeouts.push( setTimeout(this.openUrl,500) );
	},

	openUrl: function(){
	cyclePosition = "Open phantom tab";
	sendToPopup("Open phantom tab",500);
	//check popup panel closion
	if (typeof popupId === "undefined"){
		chrome.windows.create({
		"url": "popup.html",
		"type": "normal",
		"focused": true,
		"width": 700,
		"height": 500
		}, function (popup) {
		popupId = popup.id;

		}); 
	};

	//check dublicate tab
	if (typeof tabId === "undefined"){
		//make new tab
		 chrome.tabs.create({
		"url": "https://ffm.ukrtelecom.net",
		"pinned": true,
		"active": false,
		"selected":false,
		"windowId": popupId
		}, function (is) {
		tabId = is.id;
		});

	} else {
		sendToPopup("Tab already opened");
	};

	centralScript.timeouts.push( setTimeout(centralScript.w84ContentScript,500) );

	},

	w84ContentScript:function(){
	cyclePosition = "wait fo content";
	if (contentId === undefined) {
		centralScript.timeouts.push( setTimeout(centralScript.w84ContentScript,3000) );
		sendToPopup("Content not loaded, send nudes",3000);
		return
	}
	centralScript.timeouts.push( setTimeout(centralScript.waitloginLoad,2000) );
	sendToPopup("Content js loaded, goes next",2000);
	},

	waitloginLoad:function(){
		cyclePosition = "wait fo load";
		sendToPopup("Send checklogin request to content script",100);
		sendToContent("checkLogin", "bitch",function(answer){
			if (answer === "loaded") {
			sendToPopup("Loaded",1000)
			centralScript.timeouts.push( setTimeout(centralScript.goTryLogin,1000) );
			return;
			}
			sendToPopup("Loadn't send agan",1000)
			centralScript.timeouts.push( setTimeout(centralScript.waitloginLoad,1000) );
		});
	},

	goTryLogin: function (){
	cyclePosition = "Try to autorize";
	sendToPopup("Send autorization data to content script")
	sendToContent("sendAuzData",{login:"vkomelkov",password:"1"},)
	setTimeout(focusWin,1000);
	setTimeout(contentFocus,1000);
	setTimeout(sendToContent,2000,"btnLogin");
	setTimeout(popupFocus,3500);
	setTimeout(focusLast,3600);
	sendToPopup("Strap in",4000);
	centralScript.timeouts.push( setTimeout(centralScript.w84loadLeftBar,4000) );
	},

	w84loadLeftBar: function(){
	cyclePosition = "Wait fo load left bar";
	sendToPopup("Send request",10);
	sendToContent("checkLeftBar","bitches",function(answer){
		if (answer === "loaded") {
		sendToPopup("Loaded",1000)
		centralScript.timeouts.push( setTimeout(centralScript.selectAndLoad,2000) );
		return
		}
		sendToPopup("Loadn't",5000)
		centralScript.timeouts.push( setTimeout(centralScript.w84loadLeftBar,5000) );
	})
	},

	selectAndLoad:function(){
		setTimeout(focusWin,100);
		setTimeout(contentFocus,100);
		sendToContent("selectAndLoad","bitch");
		sendToPopup("selectAndLoad function start",500);
		cyclePosition = "Select and load";

	},

	// pretiDatShit:function(){
	// cyclePosition = "Pretier script processing";
	// setTimeout(focusWin,100);
	// setTimeout(contentFocus,100);
	// setTimeout(sendToContent,2000,"runPretier")
	// sendToPopup("Start autoPretier",2000)
	// },

	// loadQuest:function(){
	// cyclePosition = "Load quest";
	// setTimeout(popupFocus,500);
	// setTimeout(contentFocus,4000);
	// sendToContent("loadQuest");
	// },

	processStage:function(){
		sendToContent("processNow");
	},

	timeouts:[],

};


//Sender
function sendToContent(comand,sayHi,callback){
	chrome.tabs.sendMessage(contentId, {
		greeting: "bgScript",
		do:comand,
		sayHi:sayHi
		},
		function(response) {
	if (comand === "checkLogin") {
		if (response === undefined) {
		callback("undef answer");
		return
		}
		callback(response.isLoaded);
	}
	if (comand === "checkLeftBar") {
		if (response === undefined) {
		callback("undef answer");
		return
		}
		callback(response.isLoaded);
	}
})
}

function sendToPopup(sayHi,countTime){
	chrome.tabs.sendMessage(popupTabId, {
		greeting: "bgScript",
		status:cyclePosition,
		sayHi:sayHi,
		counter:countTime
		},
	//     function(response) {
	//   console.log(response.farewell);
	// }
	);
}


//Add listeners to scripts
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

	//All working log in console
	console.log(request.greeting + " id " + sender.tab.id + "\t\t\t" + request.sayHi);

	//Register id's
	switch(request.greeting){
		case "content":
		contentId = sender.tab.id;
		break;
		case  "popup":
		popupTabId = sender.tab.id;
		break;
	};

	//Register inputs
	switch(request.input){
		case "buttonOne":
		console.log("Bottom one clicked");
		sendToPopup("Received button one click by background script");
		// sendResponse({farewell:"Yea clicked buttonOne"});
		centralScript.start();
		break;
		case "buttonTwo":
		console.log("Bottom two clicked");
		sendToPopup("Received button two click by background script")
		// sendResponse({farewell:"Yea clicked buttonOne"});
		if (cyclePosition === 0 ) {
		setTimeout(sendToPopup,1000,"Not runnin")
		return
		};
		cyclePosition = 0;
		chrome.tabs.remove(tabId);
		cyclePosition = 0;
		sendToPopup("Stop dat shit baby");
		break;
	};

	//Pretier script ending
	// if (request.sayHi === "PZAD02") {
	// 	console.log("pretier done go next")
	// 	sendToPopup("go next",1000)
	// 	centralScript.timeouts.push( setTimeout(centralScript.loadQuest,2000) )
	// }

	//Loadquest script ending false
	if (request.sayHi === "No items to select") {
		console.log("loadquest done")
		chrome.tabs.remove(tabId)
	}

	//Loadquest script ending true  
	if (request.sayHi === "Selected quest") {
		console.log("Received selection")
		sendToPopup("Received selection, go processing")
		centralScript.timeouts.push( setTimeout(centralScript.processStage,2000) )
	}

	});



// When the icon is clicked in Chrome
chrome.browserAction.onClicked.addListener(function(tab) {

	// If popupId is undefined then there isn't a popup currently open.
	if (typeof popupId === "undefined") {

	// Open the popup
	chrome.windows.create({
		"url": "popup.html",
		"type": "normal",
		"focused": true,
		"width": 700,
		"height": 500
	}, function (popup) {
		popupId = popup.id;
	}); 

	} 
	// There's currently a popup open
	else {
	 // Bring it to the front so the user can see it
	chrome.windows.update(popupId, { "focused": true },
	 function (one){
		 popupone = one;
	 });
	 
	}

});

// When a window is closed
chrome.windows.onRemoved.addListener(function(windowId) {
	// If the window getting closed is the popup we created
	if (windowId === popupId) {
	// Set popupId to undefined so we know the popups not open
	popupId = undefined;
	}
});

// When a tabs is closed
chrome.tabs.onRemoved.addListener(function(windowId) {
	// If the tab getting closed is the popup we created
	if (windowId === tabId) {
	// Set tabId to undefined so we know the popups not open
	tabId = undefined;
	contentId = undefined;
	sendToPopup("Tab closed at position " + cyclePosition);
	cyclePosition = 0;
	sendToPopup("Clear tiomeouts");
	for (var i = 0; i < centralScript.timeouts.length; i++) {
		clearTimeout(centralScript.timeouts[i]);
		};
	centralScript.timeouts = [];
	}
});




function focusWin(){
	chrome.windows.getCurrent({},function(page){
	lastFocused = page.id;
	console.log(page.id)
	});
	chrome.windows.update(popupId, { "focused": true });
	// setTimeout(focusLast,1000);
}
function focusLast(){
	chrome.windows.update(lastFocused, { "focused": true });
}

function contentFocus(){
	chrome.tabs.update(tabId, { "active": true })
}

function popupFocus(){
	chrome.tabs.update(popupTabId, { "active": true })
}


function newTab(){
	chrome.tabs.create({
		"url": "https://beeg.com/",
		"windowId": popupId,
		"active": true
	}, function (tab) {
		tabId = tab;
	}); 
}