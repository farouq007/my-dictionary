function search(){
	let search_word =document.getElementById("searchInput").value
	let url = "http://lexiconx.herokuapp.com/search_word/" +  search_word ;
	let request = new XMLHttpRequest();
	request.open('GET', url,true);
	request.responseType = 'json';
	let def_list = document.getElementById("def_list")
	let def_l = document.createTextNode("Definition");
	let word = document.getElementById('show_search_word');
	let word_searched = document.createTextNode(search_word);
	let def_body = document.getElementById("def_body");
	word.innerHTML = ""
	def_list.innerHTML = ""
	def_body.innerHTML = ""

	request.onload = function(){
		search_result = request.response;
		console.log(search_result);
		if((search_result.status) == 200){
    		displayMeaning(search_result)
    	}
    	else if (search_result.status == 60) {
    	 	displayWrong(search_result)
    	 }
    	 else {
    		displayIncorrect(search_result)
    	}

    }

	function displayIncorrect(result) {
    	let word = document.getElementById('show_search_word');
    	let word_searched = document.createTextNode(search_word);
    	word.appendChild(word_searched);
    	def_list.appendChild(def_l);
    	let element = document.createElement("p");
    	let word_synonyms = document.createTextNode("Word was not found , Did you mean: ");
		element.appendChild(word_synonyms);
		def_body.appendChild(element);
		console.log(result);
    	for(let k = 0;  k < result.data.length; k++){
    		let search_result=result.data[k];
    		let synum = document.createElement("li");
    		console.log(search_result);
    		let def = document.createTextNode(search_result);
    		synum.appendChild(def);
    		def_body.appendChild(synum);
    	}
    }	
    function displaywrong(result) {
    	word.appendChild(word_searched);
    	def_list.appendChild(def_l);
    	let element = document.createElement("li");
    	let word_synonyms = document.createTextNode("Sorry, the word searched was not found");
    	element.appendChild(word_synonyms);
    
    }
    function displayMeaning(result) {
    	let word = document.getElementById('show_search_word');
    	let word_searched = document.createTextNode(search_word);
    	def_list.appendChild(def_l);
    	word.appendChild(word_searched);

    	for(let k = 0;  k < result.data.definition.length; k++){
    		let search_result=result.data.definition[k];
    		let def = document.createTextNode(search_result);
    		let element = document.createElement("li");
    		element.appendChild(def);
    		def_body.appendChild(element)
    	} 
    	// body... 
    }
    request.send();
}