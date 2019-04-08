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

console.log(toCamelCase("Hile-holtler!_biches"))