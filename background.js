"use strict";

console.log("Its background script baby!");

var contentId;
var popupTabId;
var popupId;
var windowId;
var popupone;
var lastFocused;
var tabId;
var cyclePosition = 0;

//THE GREAT TRAIN SECTION
let newWorld = 3;


//private func
var theKatas = (function(){
	var information = "The Katas function";
	var count = 1;
	function log(){
		return "Hi i am log"
		
	}

	// Return highest and lowest nubers in a string

	function highAndLow(numbers){
		var nums = numbers.split(' ');
		return Math.max(...nums) + " " + Math.min(...nums)
	}


	// Return array of n numbers each one are summed with last 3 numbers

	function tribonacci(signature,n){
		let arr = [];
			for (let x = 0; x < n; x++) {
				signature[x] == undefined ? arr.push(arr[x -3] + arr[x-2] + arr[x-1]) : arr.push(signature[x])
			}
		return arr
	}

	// Xbonachi sequence

	function xbonacci(signature,n){
		let l = signature.length;
		for (let x = l; x < n; x++){
			signature[x] = signature.slice(x - l).reduce((a, b) => a + b)
		}
		return signature.slice(0,n) //  if signature: [9, 2, 13, 15, 19] and n: 4 will be error
	}


	// return tree
	// "  *  "
	// " *** "
	// "*****"

	function towerBuilder(nFloors) {
		let arr = [];
		for(let i = 0; i < nFloors; i++){
		  arr.push(
			  " ".repeat(nFloors - i - 1) + 
			  "*".repeat(i * 2 + 1) + 
			  " ".repeat(nFloors - i - 1)
		  )
	
		}
		return arr		
	}


	// return odd or even sum of array

	function oddOrEven(array) {
			let sum = 0;
			for(let x of array){
				sum = sum + x
			}
			return sum % 2 !== 0 ? "odd" : "even"

			// best practice
			//return arr.reduce((a,b)=>a+b,0) % 2 ? 'odd' : 'even';
	}
	

	//dubstep decoder

	function dubstepDecoder(wubs){

		// replace all wub before \w & after \w
		// return wubs.replace(/(?<!\w)(WUB)+|(WUB)+(?!\w)/gi,"")

		return wubs.replace(/(WUB)+/gi," ").trim()

	}


	//Growth of a Population (7kyu)

	function nbYear(p0, percent, aug, p, ct) {
		// your code
		if(ct !== undefined){
			ct++;
		} else {
			var ct = 1;
		}
		p0 = p0 + p0 * percent / 100 + aug;
		if(p0 >= p){
			return ct
		} else {
			return nbYear(p0,percent,aug,p,ct)
		}

	}

	// Turtle racing 

	function race(v1, v2, g) {
		// Not correct in js

		// let time = g / (v2 - v1);
		// let arr = [Math.floor(time),Math.floor(60 * (time - Math.floor(time))),Math.floor(60 * ((60 * (time - Math.floor(time))) - Math.floor(60 * (time - Math.floor(time)))))]
		// return arr 

		
		// Correct solution fo js
		var seconds = Math.floor(g / (v2 - v1) * 3600);
  		var h = Math.floor(seconds / 3600);
  		var m = Math.floor((seconds - h * 3600) / 60);
  		var s = seconds - h * 3600 - m * 60;
		return [h, m, s]
	}


	//Return nth digit num from right to left
	function findDigit(num, nth){
		return (nth <= 0) ? -1 : (Math.abs(num).toString().length < nth) ? 0 : Number(Math.abs(num).toString().split('').reverse()[nth -1]);
	}


	//Buying a car
	// Calculate how mny month needed for collect money to buy new car after selling old car
	// Car loss hes cost buy percent. Percent is grow by 0.5 every two month

	function nbMonths(startPriceOld, startPriceNew, savingperMonth, percentLossByMonth){
		let month = 0;
		let current = 0;
		while(startPriceNew > startPriceOld + current){
			startPriceOld -= startPriceOld / 100 * percentLossByMonth;
			startPriceNew -= startPriceNew / 100 * percentLossByMonth;
			current += savingperMonth;
			month++;
			month % 2 == 1 ? percentLossByMonth += 0.5 : 0 ;
			console.log([startPriceOld,startPriceNew,current,month,percentLossByMonth])
		}
		return [month,Math.round(startPriceOld + current - startPriceNew)]
	}



	return {
		help:function(){
			return information
			console.log("I DONT KNOW")
		},
		close:function(){
			console.log("closed")
		},
		counter:function(){
			return ++count
		},
		highAndLow,
		tribonacci,
		xbonacci,
		towerBuilder,
		oddOrEven,
		dubstepDecoder,
		log:log(),
		nbYear,
		race,
		findDigit,
		nbMonths
	}
})();

theKatas.counter();
theKatas.counter();
theKatas.counter();
console.log(theKatas.counter())






function xhrtest(url){
	let xhr = new XMLHttpRequest();
	xhr.open('GET',url,true);
	xhr.send();
	xhr.onreadystatechange = function(){
		console.log(this.response);
		console.log(this.status);
		return this.responseText;

	}
}

//Translate string to camelCase
function toCamelCase(str){
	var camelStr = "";
	var dashDetect = false;
	for(let x of str){
		if(dashDetect){
			camelStr = camelStr + x.toUpperCase();
			dashDetect = false;
			continue
		}

		if(x == "-" || x == "_"){
			dashDetect = true;
			continue
		}	

		camelStr = camelStr + x;
	}
	return camelStr;
}



console.log(toCamelCase("Hile-holtler!_biches"))

//simple generator
function* generatorSample(n){
	yield n;
	yield n+2;
	for (let i = n; i < 20 ; ++i) yield i;
}




// promise stepper
function stepper(){
	var stepPosition = 0;
	var counter;


	function next(){
		return new Promise(
			function (resolve,reject){
				promiseTest(function(rt){
					if (rt === "done"){
						resolve(rt)
					}
					reject("PromiseTest fail")
				})
				// noClbk().then(function(answer){
				// 	resolve(answer)

				// },function(answer){
				// 	reject(answer)
				// })
			}
		)
	};

	function prev(){

	};

	function reDo(){
		setTimeout(reDo,10000);
		stepArrayMap[stepPosition]();
	};
	
	var stepArrayMap = [first,second];

	function first(){
		console.log("first");
		return true
	}

	function second(){
		console.log("second");
		return true
	}

	function promiseTest(clbk){
		asd = setTimeout(function(){
			clbk("done")
		},1000)
		console.log("Processing please wait")
	}

	function noClbk(){
		return new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve("Done")
				// reject("Not now")
			},1000)
		});
	}

	next()
	.then(function(answer){
		console.log(answer)
	})
	.then(function(){
		return noClbk()
	})
	.then(function(answ){
		console.log(answ)
	})
	.catch(function(answer){
		console.log(answer)
	})
}




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
		}
	)
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


