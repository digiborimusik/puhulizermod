console.log("Content script: you bitch !");

//set variables
var auzData = {login:undefined,password:undefined};
var hueDegrees = 0;

//Sub function for detect loadiing stage
function loadSensor(){
	if (document.querySelector('.x-loading-spinner') !== null) {
		console.log("Progress wrap detected")
		return true
	} else {
		return false
	}

}

//Self invokation by msg
chrome.runtime.sendMessage({greeting: "content", sayHi: "Content script there!!"});

//zoom
document.body.style.zoom = "75%";

//Checker for login form loading
function checkLoginForm(callback){
	if (document.getElementById('loginContainer') !== null) {
		console.log("Loaded");
		// return "loaded"
		callback("loaded")
		return
	};
	console.log("Check");
	callback("Not loaded")
	setTimeout(checkLoginForm,10)
	// 	
}

//Checker for activitisection loading
function checkActivitySection(callback){
	if (document.querySelector('[data-item-marker="Задания"]') !== null) {
		console.log("Loaded");
		// return "loaded"
		callback("loaded")
		return
	};
	console.log("Check");
	callback("Not loaded")
	setTimeout(checkActivitySection,10)
}


//Auto configure interface for puhulizer-friendly format
function autoPretier(){

	function clickQeuestions(){
		var load = loadSensor();
		if (load == true) {
			console.log("Wait fo load")
			huender("Pretier there: load detected, return current comand")
			setTimeout(clickQeuestions,2000)
			return
		}
		if (document.querySelector('[data-item-marker="Задания"]') !== null) {
			document.querySelector('[data-item-marker="Задания"]').click()
			console.log("clickQeuestions bueno");
			huender("Pretier there: clickQeuestions function ends with bueno")
			setTimeout(selectGridDataView,6000)
			return
		} else {
			setTimeout(clickQeuestions,2000)
			console.log("clickQeuestions no bueno")
			huender("Pretier there: clickQeuestions function ends with no bueno")
		}

	}

	function selectGridDataView(){
		var load = loadSensor();
		if (load == true) {
			console.log("Wait fo load")
			huender("Pretier there: load detected, return current comand")
			setTimeout(selectGridDataView,2000)
			return
		}
		if (document.querySelector('[data-item-marker="GridDataView"]') !== null) {
			document.querySelector('[data-item-marker="GridDataView"]').click()
			console.log("selectGridDataView bueno")
			huender("Pretier there: selectGridDataView function ends with bueno")
			setTimeout(selectCurrentDay,6000)
			return
		} else {
			setTimeout(selectGridDataView,2000)
			console.log("selectGridDataView no bueno")
			huender("Pretier there: selectGridDataView function ends with no bueno")
		}
	}

	function selectCurrentDay(){
		var load = loadSensor();
		if (load == true) {
			console.log("Wait fo load")
			huender("Pretier there: load detected, return current comand")
			setTimeout(selectCurrentDay,2000)
			return
		}
		if (document.querySelector('[data-item-marker="day"] > span') !== null) {
			document.querySelector('[data-item-marker="day"] > span').click()
			console.log("selectCurrentDay bueno")
			huender("Pretier there: selectCurrentDay function ends with bueno")
			setTimeout(selectOwner,6000)
			return
		} else {
			setTimeout(selectCurrentDay,2000)
			console.log("selectCurrentDay no bueno")
			huender("Pretier there: selectCurrentDay function ends with no bueno")
		}
	}

	function selectOwner(){
		var load = loadSensor();
		if (load == true) {
			console.log("Wait fo load")
			huender("Pretier there: load detected, return current comand")
			setTimeout(selectOwner,2000)
			return
		}
		if (document.querySelector('[data-item-marker="OwnerFixedFilterBtn"] > li') !== null) {
			document.querySelector('[data-item-marker="OwnerFixedFilterBtn"] > li').click()
			console.log("selectOwner bueno")
			huender("Pretier there: selectOwner function ends with bueno")
			setTimeout(cosmetics,6000)
			return
		} else {
			document.querySelector('[data-item-marker="OwnerFixedFilterBtn"] > span').click()
			console.log("selectOwner no bueno")
			huender("Pretier there: selectOwner function ends with no bueno")
			setTimeout(selectOwner,2000)
		}
	}

	function cosmetics(){
		if (document.querySelector('[data-item-marker="Свернуть панель разделов"]') !== null) {
			document.querySelector('[data-item-marker="Свернуть панель разделов"]').click();
		}
		if (document.querySelector('[data-item-marker="centerNotification"]').classList[3] === "t-btn-pressed") {
			document.querySelector('[data-item-marker="centerNotification"]').click()
		}
		if (document.querySelector('[data-item-marker="esnFeed"]').classList[3] === "t-btn-pressed") {
			document.querySelector('[data-item-marker="esnFeed"]').click()
		}
		if (counter <= 1) {
			counter++ 
			clickQeuestions()
			return
		}
		console.log("Done " + counter + " iteration")
		huender("Pretier there: Done " + counter + " iteration")
		huender("PZAD02")
	}

	setInterval(function(){
		hueDegrees++
		document.querySelector("html").style.filter = "hue-rotate(" + hueDegrees + "deg)" + " invert(100%)";	
		if (hueDegrees > 360) {
			hueDegrees = 1;
		}
	},100)
	console.log("Pretier run")
	clickQeuestions()
	var counter = 1;
}

//Quest selector
function loadQuest(){
	var questsLength = document.querySelectorAll('#grid-ActivitySectionV2DataGridGrid-wrap > div').length;
	console.log(questsLength);

	//End script if out of quests
	if (questsLength === 1) {
			console.log("No quests")
			huender("Out of quests")
			return
		}

	huender("Detect " + questsLength + " quests")

	//Skip done quests
	for (questsLength -= 1; questsLength >= 1; questsLength--) {
		var questStage = questInnerText([questsLength])

		if (questStage === "Отменена") {
			console.log(questStage)
			continue;
		}
		if (questStage !== "Выполнена") {
			console.log(questStage)
			clicker([questsLength])
			break;
		}
	};

	//subfnctions
	function questInnerText(n){
		var questStage = document.querySelectorAll('#grid-ActivitySectionV2DataGridGrid-wrap > div')[n].querySelector('div:nth-child(9)').innerText;
		return questStage
	}

	function clicker(n){
		document.querySelectorAll('#grid-ActivitySectionV2DataGridGrid-wrap > div')[n].click()
		document.querySelectorAll('#grid-ActivitySectionV2DataGridGrid-wrap > div')[n].querySelector('.grid-row-actions > span').click()
		console.log("Selected quest")
		huender("Selected quest")	
	}
}





//setup sender
function huender(asd){
	console.log(asd);
	chrome.runtime.sendMessage({greeting: "content", sayHi:asd}, function(response) {
 		console.log(response.farewell);
	});
}

//Msg listener
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	//Load quest command
  	if (request.do === "loadQuest") {
  		loadQuest();
  	}
  	
  	//Check for loaded and answer to bg
  	if (request.do === "runPretier") {
  		setTimeout(autoPretier,1000)
  	}
  	if (request.do === "checkActivitySection"){	
    	checkActivitySection(function(answer){
    		sendResponse({isLoaded: answer});
    	})
    }
    if (request.do === "checkLogin"){	
    	checkLoginForm(function(answer){
    		sendResponse({isLoaded: answer});
    	})
    }
    if (request.do === "sendAuzData") {
    	console.log(auzData);
    	auzData.login = request.sayHi.login;
    	auzData.password = request.sayHi.password;
    	console.log(auzData);
    	huender("Received autorization data for user " + auzData.login);
    }
    if (request.do === "btnLogin") {
    	function enterLogin(){
			document.activeElement.blur();
			document.querySelector("[data-item-marker=loginEdit]>input").focus();
			setTimeout(enterLogin2,100);
		}
		
		function enterLogin2(){
			document.querySelector("[data-item-marker=loginEdit]>input").blur();
			var elementEsg = document.querySelector("[data-item-marker=passwordEdit]>input");
			setTimeout(enterLogin3,100);
		}
		function enterLogin3(){
			document.querySelector("[data-item-marker=loginEdit]>input").value = "Elukach";
			setTimeout(enterPassword,100);
		}
		function enterPassword(){
			document.querySelector("[data-item-marker=passwordEdit]>input").focus();
			setTimeout(enterPassword2,100);
		}
		function enterPassword2(){
			document.querySelector("[data-item-marker=passwordEdit]>input").value = "1";
			setTimeout(enterPassword3,100);
		}
		function enterPassword3(){
			document.querySelector("[data-item-marker=passwordEdit]>input").blur();
			setTimeout(bpmLoginClick,100);
		}
		
		function bpmLoginClick(){
			document.activeElement.blur();
			document.querySelector("[data-item-marker=btnLogin]").focus();
			setTimeout(bpmLoginClick2,100);
		}
		function bpmLoginClick2(){
			document.activeElement.blur();
			document.querySelector("[data-item-marker=btnLogin]").focus();
			setTimeout(bpmLoginClick3,100);
		}
		function bpmLoginClick3(){
			document.querySelector("[data-item-marker=btnLogin]").click();
		}
		enterLogin();
    }
  });

