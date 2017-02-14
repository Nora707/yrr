var usersArr=[];
var newTable=document.querySelector('#tableBodyForUsers');
var keysInOrder=["id", "lastName", "firstName",  "email","education", "englishLevel", "age", "newsLetter" ,"phone"];
var schoolSelector=document.querySelector('#schoolSelector');
var englishSelector=document.querySelector('#englishSelector');
var ageSelector=document.querySelector('#ageSelector');
var newsLetterSelector=document.querySelector('#newsLetterSelector');
var lastNameSelector=document.querySelector('#lastName');
var firstNameSelector=document.querySelector('#firstName');
var emailAddressSelector=document.querySelector('#email');
var phoneSelector=document.querySelector('#phone');
var idSelector=document.getElementById('id');
var sortingByBox=document.querySelector('#sorting');
//var SortedArr=[];
//var filteredData=[];
var headSelectors=document.querySelectorAll('.filter');
var sortingArrowsDown=document.querySelectorAll('.down');
var sortingArrowsUp=document.querySelectorAll('.up');
var filteredUsers=[];
	
$.getJSON("https://yellowroad.training360.com/registration/users", function(users) {
	convertAbcBack(users); 
	usersArr=users;
	//console.log(users);
});
	/*  Convert a , b and c value back to real answers*/
function convertAbcBack(users){
	convertedData=users || usersArr;
	
	for (var i=0; i<convertedData.length; i++){
			
		for(var j=0; j <= Object.keys(convertedData[i]).length ; j++){
			switch(convertedData[i].education){
				case 'a':convertedData[i].education='Főiskola/Egyetem';
					break;
				case 'b':convertedData[i].education='Érettségi';
					break;
				case 'c':convertedData[i].education='Egyéb';
					break;
			}
			switch(convertedData[i].englishLevel){
				case 'a':convertedData[i].englishLevel='Alapfok';
					break;
				case 'b':convertedData[i].englishLevel='Középfok';
					break;
				case 'c':convertedData[i].englishLevel='Felsőfok';
					break;
			}
			switch(convertedData[i].age){
				case 'a':convertedData[i].age='18-25 év';
					break;
				case 'b':convertedData[i].age='26-35 év';
					break;
				case 'c':convertedData[i].age='35 év felett';
					break;
			}
			

			
		}
					if (convertedData[i].newsLetter==undefined){
				convertedData[i].newsLetter='';
			}
	}
	
	
		fillTable(convertedData); 
		//console.log(convertedData);
}
	/*  Generates and fills the main table*/
function fillTable(converingTable){
	newTable.innerHTML='';
	fillingData=converingTable || usersArr;
	
	for (var i=0; i<fillingData.length; i++){
			var newRow=newTable.insertRow(i);
			
		for(var j=0; j < Object.keys(fillingData[i]).length ; j++){
			var currentKey=keysInOrder[j];
			var newCell=newRow.insertCell(j);

			newCell.innerHTML=fillingData[i][currentKey];
		}
	}
}
	
schoolSelector.addEventListener('change', multipleFilter);
englishSelector.addEventListener('change', multipleFilter);
ageSelector.addEventListener('change', multipleFilter);
newsLetterSelector.addEventListener('change', multipleFilter);
	
function abcFilter(){
	console.log('filteredData: '+filteredData.length);
	if(filteredData.length>0){
		convertedData=filteredData;
	}
	var SelectorValue=this.value;

	var tempKey=this.name;
	
	if (SelectorValue==	'noFilter'){
		fillTable(convertedData); 
	}else{
		filteredData=convertedData.filter(function(currentObj){
			return currentObj[tempKey]==SelectorValue;
		});
			
		fillTable(filteredData); 
	}
}


function newsLetterFilter(){
	var filteredData=[];

	if (this.value==	'noFilter'){
		fillTable(convertedData); 
	}else{
		if(this.value=='on'){
			for(var i=0; i<convertedData.length; i++ ){
				if(convertedData[i].newsLetter=='on'){
					filteredData.push(convertedData[i]);
				}
			}
		}else {
			for(var i=0; i<convertedData.length; i++ ){
				if(convertedData[i].newsLetter==null){
					filteredData.push(convertedData[i]);
				}
			}
		}
		fillTable(filteredData); 
	}
}

lastNameSelector.addEventListener('change', multipleFilter);
firstNameSelector.addEventListener('change', multipleFilter);
emailAddressSelector.addEventListener('change', multipleFilter);
phoneSelector.addEventListener('change', multipleFilter);
idSelector.addEventListener('change', multipleFilter);

function searchFilter(){
	console.log('filteredData: '+filteredData.length);
	
	var lowerCaseSearchedText=this.value.toLowerCase();
	var tempKey=this.id;
	console.log(lowerCaseSearchedText);
	
	filteredData=convertedData.filter(function(currentObj){
		var currenObjLowerCase=currentObj[tempKey].toLowerCase();
				return currenObjLowerCase.indexOf(lowerCaseSearchedText)>-1;
			});
	fillTable(filteredData); 
}

for(var i=0; i<sortingArrowsDown.length; i++){
	
	sortingArrowsDown[i].addEventListener('click', sortingDown);
	sortingArrowsUp[i].addEventListener('click', sortingUp); 
}

function sortingDown(){
	
	var tempKey=this.parentNode.previousSibling.name;
	if(filteredUsers.length>0){	convertedData=filteredUsers};
	SortedArr=convertedData.sort(function(first,second){
	
	if(first[tempKey]>second[tempKey]){return 1};
	if(first[tempKey]<second[tempKey]){return -1};
	});
	
	fillTable(SortedArr);
}

function sortingUp(){

	var tempKey=this.parentNode.previousSibling.name;
	if(filteredUsers.length>0){	convertedData=filteredUsers};
	SortedArr=convertedData.sort(function(first,second){
	
	if(first[tempKey]>second[tempKey]){return -1};
	if(first[tempKey]<second[tempKey]){return 1};
	});
	
	fillTable(SortedArr);
}

/*   works with one or more filter, gives back only who satisfy every searched value*/ 
function multipleFilter(){
	filteredUsers=[];
	var filter = {id: idSelector.value, lastName: lastNameSelector.value ,firstName: firstNameSelector.value ,email: emailAddressSelector.value ,phone: phoneSelector.value ,education: schoolSelector.value ,englishLevel: englishSelector.value ,age: ageSelector.value ,newsLetter: newsLetterSelector.value};
	//console.log(filter);

	filteredUsers = convertedData.filter(function(item) {
	var isCurrentUserMatch=true;
	for(var key in filter) {
			if(filter[key]=='' || filter[key]=='noFilter'){
			}
			else{
				if(item[key] != filter[key]  ){
					isCurrentUserMatch=false;
				}
			}
			if(isCurrentUserMatch==false){
				break;
			}
		}
		return isCurrentUserMatch;
	});
	//console.warn(filteredUsers); 
	fillTable(filteredUsers);
}



