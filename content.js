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

//Self invocation by msg
chrome.runtime.sendMessage({greeting: "content", sayHi: "Content script there!!"});

//setup sender
function huender(asd){
	console.log(asd);
	chrome.runtime.sendMessage({greeting: "content", sayHi:asd}, function(response) {
		console.log(response.farewell);
	});
}

//zoom
document.body.style.zoom = "75%";


function storage(){
	chrome.storage.local.get(['key1'], function(result) {
          console.log(result.key1);
        });
}

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
function checkLeftBar(callback){
	if (document.querySelector('[data-item-marker="Запустить процесс "]') !== null) {
		console.log("Loaded");
		// return "loaded"
		callback("loaded")
		return
	};
	console.log("Check");
	callback("Not loaded")
	setTimeout(checkLeftBar,10)
}

//Activity selection and open quest
function selectAndLoad(){
	function clickNc(){
		if (document.querySelector('[data-item-marker="centerNotification"]') !== null) {
			if (document.querySelector('[data-item-marker="centerNotification"]').classList[3] !== "t-btn-pressed") {
				document.querySelector('[data-item-marker="centerNotification"]').click()
				console.log("Click")
				huender("Click")
			} else {
				console.log("Clicked")
				huender("Clicked")
			}
			setTimeout(select,5000)
		} else {
			setTimeout(selectAndLoad,1000)
			console.log("centerNotification is null")
			huender("centerNotification is null")
		}
	}
	function select(){
		console.log("selector there")
		if (document.querySelectorAll('#ReminderNotificationsSchemaNotificationsContainerContainerList') === null) {
			console.log("try")
			setTimeout(select,1000)
			return
		}
		if (document.querySelectorAll('#ReminderNotificationsSchemaNotificationsContainerContainerList > div').length === undefined) {
			console.log("try")
			setTimeout(select,1000)
			return
		}
		if (document.querySelectorAll('#ReminderNotificationsSchemaNotificationsContainerContainerList > div').length === 0) {
			console.log("try")
			setTimeout(select,1000)
			return
		}
		if (document.querySelectorAll('#ReminderNotificationsSchemaNotificationsContainerContainerList > div')[0].classList[0] ===  "empty-grid-message") {
			console.log("No quest")
			huender("No items to select")
			return
		}
		var questLength = document.querySelectorAll('#ReminderNotificationsSchemaNotificationsContainerContainerList > div').length;
		console.log(questLength);
		
		document.querySelectorAll('#ReminderNotificationsSchemaNotificationsContainerContainerList > div')[0].querySelectorAll('div > div > a')[1].click()
		document.querySelector('[data-item-marker="centerNotification"]').click()
		console.log("Select")
		huender("Selected quest")

	}
	setTimeout(clickNc,500);
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
			setTimeout(selectGridDataView,2000)
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
			setTimeout(selectCurrentDay,2000)
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
			setTimeout(selectOwner,2000)
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
			setTimeout(cosmetics,2000)
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

	//Get array of quests
	var questsLength = document.querySelectorAll('#grid-ActivitySectionV2DataGridGrid-wrap > div').length -1;
	console.log(questsLength);
	huender("Detect " + questsLength + " quests")

	//Select quest by priority
	function cascadeEntry(){
		for (var i = questsLength; i >= 1; i--) {
			var questStage = questInnerText([i])
			if (questStage === "На объекте") {
				console.log(questStage)
				clicker([i])
				return
			}
		}
		for (var i = questsLength; i >= 1; i--) {
			var questStage = questInnerText([i])
			if (questStage === "В пути") {
				console.log(questStage)
				clicker([i])
				return
			}
		}
		for (var i = questsLength; i >= 1; i--) {
			var questStage = questInnerText([i])
			if (questStage === "Подтверждена") {
				console.log(questStage)
				clicker([i])
				return
			}
		}
		for (var i = questsLength; i >= 1; i--) {
			var questStage = questInnerText([i])
			if (questStage === "Готова к старту") {
				console.log(questStage)
				clicker([i])
				return
			}
		}

		//Then out
		console.log("No quests");
		huender("Out of quests");
	}

	

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

	// go
	cascadeEntry();
}

//processQuest
//
function processDat(){
	var isLoading = loadSensor();

	if (isLoading === true) {
		console.log("is loading true")
		setTimeout(processDat,1000)
		return
	}
	if (document.querySelector('#grid-TsiVisitStatusHistoryDetailDataGridGrid-wrap') !== null) {
		var currentPosition = document.querySelector('#TsiVisitPageStatusComboBoxEdit-el').value;
		cascadeSelection(currentPosition);
	} else {
		console.log("VisitStatusHistoryDetail is null")
		setTimeout(processDat,1000)
	}


	function cascadeSelection(p){
		if (p === "Назначена") {
			console.log("Назначена");
			var dif = findElTimeDiference(p);
			console.log(dif)
			if (dif >= 5) {
				setTimeout(clickScroller,1000);
				setTimeout(clickNextStep,2000);
				setTimeout(done,10000);
			}
			function clickScroller(){
				document.querySelector('#TsiVisitPageStatusComboBoxEdit-right-icon-wrapper').click()
			}
			function clickNextStep() {
				document.querySelector('.listview-scroll > ul > [data-item-marker="Подтверждена"]').click()
			}
			return
		}
		if (p === "Подтверждена") {
			console.log("Подтверждена");
			var dif = findElTimeDiference(p);
			console.log(dif)
			if (dif >= 5) {
				setTimeout(clickScroller,1000);
				setTimeout(clickNextStep,2000);
				setTimeout(done,10000);
			}
			function clickScroller(){
				document.querySelector('#TsiVisitPageStatusComboBoxEdit-right-icon-wrapper').click()
			}
			function clickNextStep() {
				document.querySelector('.listview-scroll > ul > [data-item-marker="В пути"]').click()
			}
			return
		}
		if (p === "В пути") {
			console.log("В пути");
			var dif = findElTimeDiference(p);
			console.log(dif);
			if (dif >= 5) {
				setTimeout(clickScroller,1000);
				setTimeout(clickNextStep,2000);
				setTimeout(done,10000);
			}
			function clickScroller(){
				document.querySelector('#TsiVisitPageStatusComboBoxEdit-right-icon-wrapper').click()
			}
			function clickNextStep() {
				document.querySelector('.listview-scroll > ul > [data-item-marker="На объекте"]').click()
			}
			return
		}
		if (p === "На объекте") {
			console.log("На объекте");
			var dif = findElTimeDiference(p);
			console.log(dif)
			if (dif >= 5) {
				setTimeout(clickScroller,1000);
				setTimeout(clickNextStep,2000);
				setTimeout(clickResCatScroller,3000);
				setTimeout(clickResCategoryChose,4000);
				setTimeout(clickWorkCatScroller,5000);
				setTimeout(clickWorkCategoryChose,6000);
				setTimeout(done,10000);
			}
			function clickScroller(){
				document.querySelector('#TsiVisitPageStatusComboBoxEdit-right-icon-wrapper').click()
			}
			function clickNextStep() {
				document.querySelector('.listview-scroll > ul > [data-item-marker="Выполнена"]').click()
			}
			function clickResCatScroller() {
				document.querySelector('#TsiVisitPageTsiFFMResCategoryL2ComboBoxEdit-right-icon-wrapper').click()
			}
			function clickResCategoryChose(){
				document.querySelector('.listview-scroll > ul > [data-item-marker="Абонентська проводка"]').click()
			}
			function clickWorkCatScroller() {
				document.querySelector('#TsiVisitPageTsiFFMWorkCategoryL2ComboBoxEdit-right-icon-wrapper').click()
			}
			function clickWorkCategoryChose(){
				document.querySelector('.listview-scroll > ul > [data-item-marker="Виконано ремонт"]').click()
			}
			return
		}
	}

	function done(){
		huender("All done");
	}

	function findElTimeDiference(fiText){
		var visitStatusLength = document.querySelectorAll('#grid-TsiVisitStatusHistoryDetailDataGridGrid-wrap > div').length
		for (var i = visitStatusLength - 1; i >= 1; i--) {
			// var fiText = "Назначена";
			var currText = document.querySelectorAll('#grid-TsiVisitStatusHistoryDetailDataGridGrid-wrap > div')[i].querySelectorAll('div > span')[1].innerText
			console.log(currText)
			if (fiText === currText) {
				console.log("Finded")
				var strOfTime = document.querySelectorAll('#grid-TsiVisitStatusHistoryDetailDataGridGrid-wrap > div')[i].querySelectorAll('div > span')[2].innerText
				var timeOfStatus = new Date;
				var currentTime = new Date;
				timeOfStatus.setHours(strOfTime[strOfTime.length - 5] + strOfTime[strOfTime.length - 4],strOfTime[strOfTime.length - 2] + strOfTime[strOfTime.length - 1]);
				var minutesLeft = ((currentTime - timeOfStatus) / 1000 / 60);
				return minutesLeft
			}
		}
	}
}


//Msg listener
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if (request.do === "storageTest") {
  		storage();
  	}

  	if (request.do === "selectAndLoad") {
  		selectAndLoad();
  	}

  	//start
  	if (request.do === "processNow") {
  		processDat();
  	}

	//Load quest command
	if (request.do === "loadQuest") {
		loadQuest();
	}
	
	//Check for loaded and answer to bg
	if (request.do === "runPretier") {
		setTimeout(autoPretier,1000)
	}
	if (request.do === "checkLeftBar"){
		checkLeftBar(function(answer){
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
			document.querySelector("[data-item-marker=loginEdit]>input").value = "vvitriv";
			setTimeout(enterPassword,100);
		}
		function enterPassword(){
			document.querySelector("[data-item-marker=passwordEdit]>input").focus();
			setTimeout(enterPassword2,100);
		}
		function enterPassword2(){
			document.querySelector("[data-item-marker=passwordEdit]>input").value = "Dfcbkbq1";
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

