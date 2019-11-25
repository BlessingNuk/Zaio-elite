class Circles {
	/**Circles class has two instance variables for the background color and the price of the colored circle with the get methods.
	The drawCircle method has one parameter which will be the selector for a div element where the cicle will be printed out.*/
	constructor(bgColor,price){
		this._bgColor = bgColor;
		this._price = price;
	}
	getBgColor(){
		if(this._bgColor)
			return this._bgColor;
	}
	getPrice(){
		if(this._price)
			return this._price;
	}
	drawCircle(selector){
		let divbody = document.querySelector(selector);
		let cir = document.createElement('div');
		cir.style.backgroundColor= this._bgColor;
		cir.classList.add('colors');
		divbody.appendChild(cir);
		
		
		}
	}

/*Printing Circles*/
let colors = ['red','purple','black','white','orange','yellow','blue','teal','khaki','lightskyblue','lime','pink','peru','magenta','dimgrey','deeppink','cyan','grey'];
let prices = [19,18,14,15,17,13,18,14,26,15,14,16,20,21,19,15,10,19];
let ColorObj = new Array(colors.length); /*Array of the circle objects*/

function printCircles(){ /**This function prints out all the coloured circles to the screen*/
	for(let i=0;i<colors.length;i++){
		let obj = new Circles(colors[i],prices[i]);
		obj.drawCircle('#circles');
		ColorObj[i]=obj;
	}
}
printCircles()

/*Necessary variables*/
let quantity=0 //the quantity of the current color
let totalQuantity=0; //total quantity of all the selected color circles
let totalPrice = 0; //total price of all the selected items

let currentColour;
let currentPrice;

let addQuantity = document.querySelector(".glyphicon-plus-sign"); //Plus sign
let minusQuantity = document.querySelector(".glyphicon-minus-sign");//minus sign

let addToCartButton = document.querySelector('#addToCart');//add to cart button
let agreeButton = document.querySelector("#agree");//agree button in the add to cart modal

let clickCir = document.querySelectorAll('.colors');

/*Functions*/

function addToCartFunc(){ 
	/**When the 'add to cart' is clicked and no color is picked then the 'pick color' modal will pop up.
	Sets the 'data target' attribute to '#add2Cart'.
	*/
	if(document.querySelector("#check").innerHTML=="None") {
		addToCartButton.dataset.target = '#pickColor';
	}else if(addToCartButton.innerHTML == 'Add to Cart'){
		addToCartButton.dataset.target = '#add2Cart';
	}	
}

function clickCirFunc(){
	/**A border will appear on the clicked circle
	When a colored button is clicked the value of "Color" and inside the add to cart modal will be set to the background color of the clicked circle.
	The Page border, the price and 'add to cart' text color changes to the color of the clicked circle.
	Sets the 'data-target' attribute to '#add2Cart' to ensure that the add to cart modal shows up when add to cart button is clicked.
	Displays the price of the circle clicked.
	*/
	removeBorder();
	
	let current = event.target;
	let bgCol= document.querySelectorAll('.colorValue');
	for(let i of bgCol){
		i.innerHTML = current.style.backgroundColor;
	}
	current.classList.add('border');
	currentColour= current.style.backgroundColor;
	
	document.querySelector('.page').style.borderColor = currentColour;
	document.querySelector('#addToCart').style.color = currentColour;
	document.querySelector('#price').style.color = currentColour;
	
	addToCartButton.dataset.target = '#add2Cart';
	addToCartButton.innerHTML = 'Add to Cart'
	
	let index = colors.indexOf(currentColour);
	currentPrice = ColorObj[index].getPrice()
	document.querySelector('#price').innerHTML = '$'+currentPrice+".00";
	
	

}

function items(){
	/**Prints out the selected circle in the "Details" section of the page and in checkout modal*/
	let index = colors.indexOf(currentColour);
	totalPrice += quantity*ColorObj[index].getPrice();
	totalQuantity += quantity;
	document.querySelector('#price').innerHTML = '$'+totalPrice+'.00';
	document.querySelector('#totalQuantity').innerHTML = totalQuantity + " ";
	document.querySelector('#total').innerHTML = '$'+totalPrice+'.00';
	
	
	let div = document.querySelectorAll('.items');
	//let div2 = document.querySelector('#things');
	for(let i=0; i<quantity;i++){
		let obj = new Circles(currentColour,currentPrice);
		obj.drawCircle('#item');
		obj.drawCircle('#items')
	}
	
}

function removeBorder(){
	/**Removes the border when a different coloured circle is clicked*/
	let colList = document.querySelectorAll('.colors');
	for (let j of colList){
		j.classList.remove('border');
	}
}


function agreeFunc() {
	/**When the Agree button on the 'add to cart'modal is clicked
	sets the 'data target' attribute to '#checkout' for the checkout modal to pop up when the 'checkout' button is clicked.
	Changes the 'add to cart' text to 'Checkout Now'
	The 'custom fit' value to the quantity value.
	And it calls the item() function.

	*/
	if(addToCartButton.innerHTML == 'Add to Cart'){
		addToCartButton.dataset.target = '#checkout';
		addToCartButton.innerHTML = "Checkout Now";
		document.querySelector('#label').innerHTML = quantity;
		items()
	}
	
	
}

function add(){
	/**Increases the quantity of the selected items when the plus sign glyphicon is clicked*/
	quantity++;
	for(i of document.querySelectorAll('.quantity')){
		i.innerHTML = quantity ;
	}
}

function minus(){
	/**Decreases the quantity of the selected items when the minus sign glyphicon is clicked*/
	if(quantity>0){
		quantity--;
		for(i of document.querySelectorAll('.quantity')){
		i.innerHTML = quantity;
		}
	}
}

/*Event listeners*/
agreeButton.addEventListener("click",agreeFunc);
addQuantity.addEventListener("click",add);
minusQuantity.addEventListener("click",minus);
addToCartButton.addEventListener("click",addToCartFunc);
for(let i of clickCir){
	i.addEventListener('click',clickCirFunc);
}
