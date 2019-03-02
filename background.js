

console.log("Its background script baby!");

var contentId;
var popupTabId;
var popupId;
var windowId;
var popupone;
var lastFocused;
var tabId;
var cyclePosition = 0;

//change123334
///new func
//asd
//asdasd
//asdasdasdasd///
///asdasdasd
//Local storage manage

function storageSet(key,prop){
	chrome.storage.local.set({[key]:prop});
}

function storageUpdate(key){
	chrome.storage.local.get([key], function(result) {
        storage = result[key];
        console.log(result)
        });
}

// also new func

var storage = {};

function storageTest(){
	storageUpdate('user');
	setTimeout(checkStFunc,100);
	function checkStFunc(){
		if (storage === undefined || storage.user === undefined) {
			console.log("storage empty")
			storage = {
				user:{
					0:{cat1: "DWDM", cat2: "Включено", checkd: true, login: "ivan", pass: "titan"},
					1:{cat1: "DWDM", cat2: "Включено", checkd: false, login: "", pass: ""},
					2:{cat1: "DWDM", cat2: "Включено", checkd: false, login: "", pass: ""},
					3:{cat1: "DWDM", cat2: "Включено", checkd: false, login: "", pass: ""},
					4:{cat1: "DWDM", cat2: "Включено", checkd: false, login: "", pass: ""},
					5:6,
					6:6,
					7:6,
					8:0
				}
			};
			storageSet("user",storage)

		} else {
			console.log("storage empty'nt")

		}
	}
}

storageTest();




//Main logic

var centralScript = {

	start: function(n){
	if (cyclePosition !== 0) {
		setTimeout(sendToPopup,1000,"Already started baby");
		return
	}
	if (n !== undefined) {
		console.log("new iteration")
		storage.user[8] = 0;
		storageSet("user",storage);
	}
	cyclePosition = 1;
	setTimeout(sendToPopup,1000,"Haters gona hate vladislove gona loved");
	centralScript.timeouts.push( setTimeout(centralScript.openUrl,500) );
	setTimeout(storageUpdate,100,"user");
	},

	openUrl: function(){
	sendToPopup("Open phantom tab",500);
	//check popup panel closion
	if (typeof popupId === "undefined"){
		chrome.windows.create({
		"url": "popup.html",
		"type": "normal",
		"focused": true,
		"width": 1000,
		"height": 563
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
	cyclePosition = 2;
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
	cyclePosition = 3;
	sendToPopup("Send autorization data to content script")
	var qwe = storage.user[storage.user[8]].checkd;
	if (qwe === false) {
		if (storage.user[8] === 4) {
			storage.user[8] = 0;
			console.log("personPos 0" + storage.user[8]);
		} else {
			storage.user[8]++
			console.log("personPos ++" + storage.user[8]);	
		}
		centralScript.timeouts.push( setTimeout(centralScript.goTryLogin,400) );
		return
	}
	storageSet("user",storage);
	console.log(storage.user[8]);
	setTimeout(sendToContent,2000,"btnLogin");
	sendToPopup("Strap in",4000);
	centralScript.timeouts.push( setTimeout(centralScript.w84loadLeftBar,4000) );
	},

	w84loadLeftBar: function(){
	cyclePosition = 4;
	sendToPopup("Send request",10);
	sendToContent("checkLeftBar","bitches",function(answer){
		if (answer === "loaded") {
		sendToPopup("Loaded",1000)
		centralScript.timeouts.push( setTimeout(centralScript.selectAndLoad,2000) );
		return
		}
		sendToPopup("Loadn't",500)
		centralScript.timeouts.push( setTimeout(centralScript.w84loadLeftBar,5000) );
	})
	},

	selectAndLoad:function(){
		cyclePosition = 5;
		setTimeout(focusWin,100);
		setTimeout(contentFocus,100);
		sendToContent("selectAndLoad","bitch");
		sendToPopup("selectAndLoad function start",500);
		setTimeout(focusLast,1000);

	},

	processStage:function(){
		cyclePosition = 6;
		sendToPopup("processing",3000)
		sendToContent("processNow");
		setTimeout(focusWin,100);
		setTimeout(focusLast,3000);
	},

	timeouts:[],

};


//Sender
function sendToContent(comand,sayHi,callback){
	chrome.tabs.sendMessage(tabId, {
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
		centralScript.start("new");
		break;
		case "buttonTwo":
		console.log("Bottom two clicked");
		sendToPopup("Received button two click by background script")
		// sendResponse({farewell:"Yea clicked buttonOne"});
		if (cyclePosition === 0 ) {
			setTimeout(sendToPopup,1000,"Not runnin")
				for (var i = 0; i < centralScript.timeouts.length; i++) {
					clearTimeout(centralScript.timeouts[i]);
				};
			centralScript.timeouts = [];
			return
		};
		chrome.tabs.remove(tabId);
		cyclePosition = 0;
		sendToPopup("Stop dat shit baby");
		break;
		case "dataUpdate":
		setTimeout(storageUpdate,1000,"user")
		break;
	};

	//Loadquest script ending false
	if (request.sayHi === "No items to select") {
		console.log("loadquest done")
		sendToPopup("Out of quests")
		chrome.tabs.remove(tabId)
		
		if (storage.user[8] === 4) {
			storage.user[8] = 0;
			console.log("personPos 0");
		} else {
			storage.user[8]++
			console.log("personPos ++");	
		};
		storageSet("user",storage);

		setTimeout(restart,1000)
	}

	//wrong ligon data
	if (request.sayHi === "wrong data") {
		console.log("loadquest done")
		sendToPopup("Wrong data no bueno, check login or password on slot: " + (storage.user[8] + 1))
		chrome.tabs.remove(tabId)
		
		if (storage.user[8] === 4) {
			storage.user[8] = 0;
			console.log("personPos 0 wrong" + storage.user[8]);
		} else {
			storage.user[8]++
			console.log("personPos ++ wrong" + storage.user[8]);	
		};
		storageSet("user",storage);

		setTimeout(restart,1000)
	}

	//Loadquest script ending true  
	if (request.sayHi === "Selected quest") {
		console.log("Received selection")
		sendToPopup("Received selection, go processing")
		centralScript.timeouts.push( setTimeout(centralScript.processStage,5000) )
	}

	if (request.sayHi === "All done") {
		console.log("Received confirmation")
		sendToPopup("Received confirmation")
		cyclePosition = 0;
		chrome.tabs.remove(tabId);
		cyclePosition = 0;
		sendToPopup("Stop dat shit baby");
		
		if (storage.user[8] === 4) {
			storage.user[8] = 0;
			console.log("personPos 0");
		} else {
			storage.user[8]++
			console.log("personPos ++");	
		};
		storageSet("user",storage);

		setTimeout(restart,1000)
	}
	function restart(){
		centralScript.timeouts.push( setTimeout(centralScript.start,5000) )
	}


	//Window and tab listeners from cs
	
	if (request.sayHi === "focusWin") {
		focusWin()
	}
	if (request.sayHi === "focusLast") {
		focusLast()
	}
	if (request.sayHi === "contentFocus") {
		contentFocus()
	}
	if (request.sayHi === "popupFocus") {
		popupFocus()
	}

	if (request.sayHi === "failsafe") {
		console.log("Received failsafe")
		sendToPopup("Received failsafe")
		cyclePosition = 0;
		chrome.tabs.remove(tabId);
		cyclePosition = 0;
		sendToPopup("Stop dat shit baby");
		
		if (storage.user[8] === 4) {
			storage.user[8] = 0;
			console.log("personPos 0");
		} else {
			storage.user[8]++
			console.log("personPos ++");	
		};
		storageSet("user",storage);

		setTimeout(restart,1000)	
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



// When the icon is clicked in Chrome
chrome.browserAction.onClicked.addListener(function(tab) {

	// If popupId is undefined then there isn't a popup currently open.
	if (typeof popupId === "undefined") {

	// Open the popup
	chrome.windows.create({
		"url": "popup.html",
		"type": "normal",
		"focused": true,
		"width": 900,
		"height": 580
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
	console.log(centralScript.timeouts)
	for (var i = 0; i < centralScript.timeouts.length; i++) {
		clearTimeout(centralScript.timeouts[i]);
		};
	centralScript.timeouts = [];
	}
});




function newTab(){
	chrome.tabs.create({
		"url": "https://beeg.com/",
		"windowId": popupId,
		"active": true
	}, function (tab) {
		tabId = tab;
	}); 
}


