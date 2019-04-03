"use strict";

console.log("Hi interpretier")


//private func
var theKatas = (function(){
	var information = "The Katas function";
	var count = 1;
	function log(){
		return "Hi i am log"
		
	}


	function calcAlphabet (str) {
		var total = 0;
		var strArr = str.split("")
		var alphabet = { a:1 , b:2 , c:3 , d:4 , e:5, f:6 , g:7, h:8, i:9 , j:10 , k:11 , l:12, m:13, n:14 , o:15, p:16 ,q:17 , r:18 , s:19, t:20, u:21, v:22 , w:23 , x:24, y:25 , z:26}
	  
		for (var i = strArr[0]; i<strArr.length ; i++){
			total = total + alphabet[i]
		}
		return total;
	  
		calcAlphabet("example")
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
		log:log()
	}
})();

theKatas.counter();
theKatas.counter();
theKatas.counter();
console.log(theKatas.counter())





//Translate string to camelCase
function toCamelCase(str){
	var camelStr = "";
	var dashDetect = false;
	for(x of str){
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


