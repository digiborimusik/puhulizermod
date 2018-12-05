console.log("Im a Popup babys!");

chrome.runtime.sendMessage({greeting: "popup"}, function(response) {
  console.log(response.farewell);
});


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
    if (request.status !== undefined){
    	document.getElementById("status").innerText = "Status: " + request.status;
    }
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
