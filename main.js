// to select anything from DOM ->
var body = document.querySelector("body");

// Now let's change the background color of our webpage every 2 seconds -->
var isLightGrey = false;

setInterval(function(){
	if(isLightGrey){
		body.style.background = "rgba(97,180,30,0.4)";
	} else {
		body.style.background = "rgba(211,211,211,1)";
	}
	isLightGrey = !isLightGrey;
},2000);

$("ul").on("click","li",function(){
	$(this).toggleClass("completed");
})

$("ul").on("click","span",function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
})

$("input[type='text']").on("keypress", function(e){
	if(e.which === 13) {
		$("ul").append("<li><span class=\"deleteButton\"><i class=\"fas fa-trash-alt\"></i></span> "+$("input").val()+"</li>");
		$(this).val("");
	}
})

$("#toggleForm").on("click",function(){
	$("input[type='text']").slideToggle();
});

var colors = generateRandomColors(6);

var sqaures = document.querySelectorAll(".square");

var pickedColor = randomPick();

var rgbDisplay = document.querySelector("#display");

var msgDisplay = document.querySelector("#displayMsg");

var h1 = document.querySelector("h1");

var resetButton = document.getElementById("reset");

var easyButton = document.getElementById("easy");

var hardButton = document.getElementById("hard");

var kk = 0;

rgbDisplay.textContent = pickedColor;

function assignColor() {

	for(var i = 0; i < sqaures.length; i++) {

		sqaures[i].style.backgroundColor = colors[i];

		sqaures[i].addEventListener("click", function(){
			var choosedColor = this.style.backgroundColor;

			resetButton.textContent = "Play Again?"

			if(choosedColor === pickedColor) {
				for(var j = 0; j < sqaures.length; j++) {
					sqaures[j].style.backgroundColor = choosedColor;
				}
				msgDisplay.textContent = "Correct!";
				h1.style.backgroundColor = choosedColor;
			} else {
				this.style.backgroundColor = "#232323";
				msgDisplay.textContent = "Try Again!";
			}
		})
	}
}

assignColor();

resetButton.addEventListener("click", callFun);

function callFun() {
	if(kk === 0){
		colors = generateRandomColors(6);	
	} else if(kk === 1) {
		colors = generateRandomColors(3);
	}
	pickedColor = randomPick();
	rgbDisplay.textContent = pickedColor;
	assignColor();
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "royalblue";
	msgDisplay.textContent = "";
}

function randomPick() {
	var randomNumber = Math.floor(Math.random() * colors.length);

	return colors[randomNumber];
}

function generateRandomColors(noOfColors) {
	var returnArray = [];

	for(var i=0;i<noOfColors;i++) {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		returnArray[i] = "rgb(" + r + ", " + g + ", " + b +")";
	}

	return returnArray;
}

easyButton.addEventListener("click", function(){
	hardButton.classList.remove("selected");
	easyButton.classList.add("selected");
	colors = generateRandomColors(3);
	pickedColor = randomPick();
	rgbDisplay.textContent = pickedColor;
	assignColor();
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "royalblue";
	msgDisplay.textContent = "";

	for(var i=3; i<sqaures.length;i++) {
		sqaures[i].style.display = "none";
	}
	kk = 1;
})

hardButton.addEventListener("click", function(){
	easyButton.classList.remove("selected");
	hardButton.classList.add("selected");
	colors = generateRandomColors(6);
	pickedColor = randomPick();
	rgbDisplay.textContent = pickedColor;
	assignColor();
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "royalblue";
	msgDisplay.textContent = "";

	for(var i=3; i<sqaures.length;i++) {
		sqaures[i].style.display = "block";
	}
	kk = 0;
});