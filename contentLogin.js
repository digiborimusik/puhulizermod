console.log("Puhuhu baby");

function enterLogin(){
	document.activeElement.blur();
	document.querySelector("[data-item-marker=loginEdit]>input").focus();
	setTimeout(enterLogin2,1000);
}

function enterLogin2(){
	document.querySelector("[data-item-marker=loginEdit]>input").blur();
	var elementEsg = document.querySelector("[data-item-marker=passwordEdit]>input");
	setTimeout(enterLogin3,1000);
}
function enterLogin3(){
	document.querySelector("[data-item-marker=loginEdit]>input").value = "vkomelkov";
	setTimeout(enterPassword,1000);
}
function enterPassword(){
	document.querySelector("[data-item-marker=passwordEdit]>input").focus();
	setTimeout(enterPassword2,1000);
}
function enterPassword2(){
	document.querySelector("[data-item-marker=passwordEdit]>input").value = "1";
	setTimeout(enterPassword3,1000);
}
function enterPassword3(){
	document.querySelector("[data-item-marker=passwordEdit]>input").blur();
	setTimeout(bpmLoginClick,1000);
}

function bpmLoginClick(){
	document.activeElement.blur();
	document.querySelector("[data-item-marker=btnLogin]").focus();
	setTimeout(bpmLoginClick2,1000);
}
function bpmLoginClick2(){
	document.activeElement.blur();
	document.querySelector("[data-item-marker=btnLogin]").focus();
	setTimeout(bpmLoginClick3,1000);
}
function bpmLoginClick3(){
	document.querySelector("[data-item-marker=btnLogin]").click();
}



setTimeout(enterLogin,3000);
