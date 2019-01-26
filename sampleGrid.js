$(document).ready(function(){
	const url= 'https://www.unisport.dk/api/products/batch/?list=179249,179838,174351,180011,180020,178429';
	//reading the information from the source
	$.ajax({
        url: url,
        type: 'GET',
 
        success: function(response) {
			//converting the data to a readable variable so that we can sort and print in the right way
			var data1 = getVariables(response);
			var sorted_array = sortArrayAfterDiscount(data1.products);
			//sorted_array.reverse(); //this function is used to show the bigger discount at the top
			//console.log(sorted_array);
        	for (k=0; k<sorted_array.length; k++) {
				//printing each product on the page				
  				showProduct(sorted_array[k]);
  			}
			 //console.log(response);
        }
    });
})

function getVariables(json){
	//converting the read data to a JSON string
	var string = JSON.stringify(json); 
	//parses the JSON string, constructing the JavaScript value or object described by the string so that we can work with it later
	var array = JSON.parse(string); 
	//print to the console the value of the variable
	//console.log(array);
	return array;
}

function showProduct(item){
	var string = "<div class=\"block\"><div class=\"middle\"><img src="+item.image+" alt=\"pic\" /></div><div class=\"bottom\"><div class=\"heading\">"+item.name+"</div><div class=\"size\">"+readSize(item.stock)+"</div>";
	if (item.discount_percentage > 0) {
		//if there is a discount on the product show the old price 
		string += "<div class=\"old_price\">"+formatPrice(item.price_old)+"</div><div class=\"new_price\">"+formatPrice(item.price)+"</div>";
	}
	else string += "<div class=\"price\">"+formatPrice(item.price)+"</div>";
	//add the add to backet button, just for the design, not working for now because there should be implemented a function to perform this action
	string += "<button class=\"add-button\" type=\"submit\">Tilføj til kurv</button></div></div>";
	//adding the info to the page
	$(".wrap").append(string);
}

function formatPrice(price){
	//formatting the price to have the danish currency
	const formatter = new Intl.NumberFormat('da-DK', {
		style: 'currency',
		currency: 'DKK',
		minimumFractionDigits: 2
	})
	var result = formatter.format(price);
	return result;
}

function readSize(stockArray){
	var string = "<select id=\"size\">";
	for (i=0; i<stockArray.length; i++) {
		//preparing the info about size and stock to be shown on the options when buying
		string += "<option value=\""+stockArray[i].pk+"\">"+stockArray[i].name +" "+stockArray[i].stock_info+"</option>";
	}
	string += "</select>";
	return string;
}

function sortArrayAfterDiscount(array){
	//function to sort the array by discount
	var myArray = array.sort(compareElementsDiscount);
	return myArray;
}

function compareElementsDiscount(x, y) {
	//function to compare the discounts of 2 products
	if (x.discount_percentage < y.discount_percentage) return -1;
	if (x.discount_percentage > y.discount_percentage) return 1;
	return 0;
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

