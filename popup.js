console.log("Im a Popup babys!");

// chrome.runtime.sendMessage({greeting: "popup"}

// );


document.querySelector('#buttonOne').onclick = function(is) {
	chrome.runtime.sendMessage({greeting: "popup",input: "buttonOne",sayHi:"Its popup baby"}
		// , function(response) {
  //   console.log(response.farewell);
  //   }
    );
};
document.querySelector('#buttonTwo').onclick = function(is) {
	chrome.runtime.sendMessage({greeting: "popup",input: "buttonTwo",sayHi:"Its popup baby"}
		// , function(response) {
  //   console.log(response.farewell);
  //   addLi()
  //   }
    );
};
document.querySelector('#buttontree').onclick = function(is) {
	console.log('tree')
	// document.querySelector('.params').style.left = "10vw";
	setTimeout(doThat,200)
	function doThat(){
		document.querySelector('.params').style.left = "10vw";
	}
};



document.addEventListener("click", function(){
    // console.log(event.path);
        // console.log(dd);
    var dd = event.path[event.path.length - 7];
    if (dd !== undefined) {
    	dd = event.path[event.path.length - 7].className
    }
    var dds = document.querySelector('.params').style.left;
    if (dd !== "params" && dds === "10vw" || dd === undefined ) {
    	document.querySelector('.params').style.left = "100vw";
    }
    var a = event.path[0].id.slice(0,3);
    if (a === "cbx") {
    	checkbox(event.path[0].id.slice(3,4))
    }
    if (a === "res") {
    	resetf(event.path[0].id.slice(8,9))
    }

});


function checkbox(n){
	var cbx = document.getElementById("cbx" + [n]);
	if (cbx.checked == true){
		document.querySelectorAll('form')[n-1].querySelectorAll('.input-text')[0].disabled = false
		document.querySelectorAll('form')[n-1].querySelectorAll('.input-text')[1].disabled = false
        document.querySelectorAll('form')[n-1].querySelectorAll('select')[0].disabled = false
        document.querySelectorAll('form')[n-1].querySelectorAll('select')[1].disabled = false
    } else {
      	document.querySelectorAll('form')[n-1].querySelectorAll('.input-text')[0].disabled = true
		document.querySelectorAll('form')[n-1].querySelectorAll('.input-text')[1].disabled = true
        document.querySelectorAll('form')[n-1].querySelectorAll('select')[0].disabled = true
        document.querySelectorAll('form')[n-1].querySelectorAll('select')[1].disabled = true
    }
}

function resetf(n){
		console.log(n);
      	document.querySelectorAll('form')[n-1].querySelectorAll('.input-text')[0].disabled = true
		document.querySelectorAll('form')[n-1].querySelectorAll('.input-text')[1].disabled = true
        document.querySelectorAll('form')[n-1].querySelectorAll('select')[0].disabled = true
        document.querySelectorAll('form')[n-1].querySelectorAll('select')[1].disabled = true
}

function collectData(){
	for (var i = 4; i >= 0; i--) {
		var check = document.getElementById("cbx" + [i+1]).checked;
		storage.user[i].checkd = check;
		var login = document.querySelectorAll('form')[i].querySelectorAll('.input-text')[0].value;
		storage.user[i].login = login;
		var pass = document.querySelectorAll('form')[i].querySelectorAll('.input-text')[1].value;
		storage.user[i].pass = pass;
		var cat1 = document.querySelectorAll('form')[i].querySelectorAll('select')[0].value;
		storage.user[i].cat1 = cat1;
		var cat2 = document.querySelectorAll('form')[i].querySelectorAll('select')[0].value;
		storage.user[i].cat2 = cat2;
	}
}

function reloadData(){
	for (var i = 4; i >= 0; i--) {
		document.getElementById("cbx" + [i+1]).checked = storage.user[i].checkd;
		document.querySelectorAll('form')[i].querySelectorAll('.input-text')[0].value = storage.user[i].login;
		document.querySelectorAll('form')[i].querySelectorAll('.input-text')[1].value = storage.user[i].pass;
		document.querySelectorAll('form')[i].querySelectorAll('select')[0].value = storage.user[i].cat1;
		document.querySelectorAll('form')[i].querySelectorAll('select')[0].value = storage.user[i].cat2;
		if (storage.user[i].checkd) {
			console.log(i)
			document.querySelectorAll('form')[i].querySelectorAll('.input-text')[0].disabled = false
			document.querySelectorAll('form')[i].querySelectorAll('.input-text')[1].disabled = false
        	document.querySelectorAll('form')[i].querySelectorAll('select')[0].disabled = false
        	document.querySelectorAll('form')[i].querySelectorAll('select')[1].disabled = false
		}
	}
}

storage = {
	user:{
		0:{},
		1:{},
		2:{},
		3:{},
		4:{}
	}
};

function storageSet(key,prop){
	chrome.storage.local.set({[key]:prop});
}


function storageUpdate(key){
	chrome.storage.local.get([key], function(result) {
        storage = result[key];
        console.log(result)
        });
}

function saveData(){
	collectData();
	storageSet("user",storage);
}
function loadData(){
	storageUpdate("user");
	setTimeout(reloadData,1000)
}

function addLi(text){
	var node = document.createElement("LI");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.querySelector('.console > ul').appendChild(node);
    var scrollYcons = document.querySelector('.console').scrollTop;
    document.querySelector('.console').scrollTop = scrollYcons + 100;
    var elem = document.querySelector('.img');
    setTimeout(addLi,50);
	function addLi(){
		elem.style.animation = "addLi 0.4s 1";
	};
	setTimeout(lightOff,400);
	function lightOff(){
		elem.style.animation = "lightning 4s infinite";
	};
}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    addLi(request.sayHi);
    // if (request.status !== undefined){
    // 	document.getElementById("status").innerText = "Status: " + request.status;
    // }
    if (request.counter !== undefined) {
    	progressBar(request.counter);
    }
  });

function progressBar(time){
	var counter = time;
	var countdown = setInterval(
		function(){
			counter -= 10;
			var percent = 100 - (counter / (time / 100));
			console.log(percent);
			document.querySelector('.line:nth-child(2)').style.width = percent + "%";
			document.querySelector('.line:nth-child(2) > div').innerText =  Math.floor(percent) + "%";
			// document.querySelector('.cycle').style.left = percent + "%";

			if (counter === 0) {
				clearInterval(countdown);
				document.querySelector('.line:nth-child(2)').style.width = "0%";
				console.log("clear");
			};

		},10
		)
}


function locker(asd){
	var a01 = "hi there";
	var b01 = {
		getter: "asd",
		uetter: 12345678
	}
	Object.defineProperty(b01, "getter", {
		get: function() {
			return 123
		}
	});
	asd(b01);
}


locker(function(dsa){
 console.log(dsa)
})
