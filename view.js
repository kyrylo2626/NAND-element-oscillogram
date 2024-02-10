// При завантаженні сторінки до вікна браузера рисує модель дослідження
window.onload = function figure() {
	// В змінну main передаємо поле для малювання моделі
	var main = document.getElementById("main").getContext("2d");
	// Малюємо екран осцилографа
	osc_field();
	// Малюємо поля осцилографа та генераторів
	main.beginPath();
	main.lineWidth = 3;
	main.strokeStyle = "black";
	main.fillStyle = "darkgray";
	main.rect(2, 90, 304, 250);
	main.rect(2, 348, 304, 250);
	main.rect(556, 2, 342, 596);
	main.fill();
	main.rect(390, 445, 80, 110);
	main.stroke();
	// Малюємо контакти з'єднань
	main.beginPath();
	main.arc(365, 365, 5, 0, 180);
	main.fillStyle = "black";
	main.fill();
	main.stroke();
	main.beginPath();
	main.arc(335, 430, 5, 0, 180);
	main.fillStyle = "black";
	main.fill();
	main.stroke();
	main.beginPath();
	main.arc(470, 495, 7, 0, 180);
	main.fillStyle = "white";
	main.fill();
	main.stroke();
	// Малюємо назви приладів
	main.font = "bold 18pt arial";
	main.fillStyle = "#943c31";
	main.fillText("Г Е Н Е Р А Т О Р", 55, 125);
	main.fillText("І М П У Л Ь С І В", 60, 150);
	main.fillText("Г Е Н Е Р А Т О Р", 55, 381);
	main.fillText("І М П У Л Ь С І В", 60, 406);
	main.fillText("О С Ц И Л О Г Р А Ф", 610, 40);
	// Малюємо контакти першого генератора
	point(main, 277, 172);
	point(main, 277, 302);
	// Малюємо контакти другого генератора
	point(main, 277, 430);
	point(main, 277, 560);
	// Малюємо контакти осцилографа
	point(main, 585, 365);
	point(main, 585, 430);
	point(main, 585, 495);
	point(main, 585, 560);
	// Малюємо контактні з'єднання
	main.beginPath();

	main.moveTo(292, 172);
	main.lineTo(365, 172);
	main.lineTo(365, 365);
	main.lineTo(570, 365);
	main.moveTo(365, 365);
	main.lineTo(365, 460);
	main.lineTo(390, 460);

	main.moveTo(390, 540);
	main.lineTo(335, 540);
	main.lineTo(335, 430);

	main.moveTo(477, 495);
	main.lineTo(570, 495);

	main.moveTo(292, 430);
	main.lineTo(570, 430);

	main.moveTo(292, 302);
	main.lineTo(335, 302);
	main.lineTo(335, 329);
	main.lineTo(320, 329);
	main.lineTo(350, 329);
	main.moveTo(277, 317);
	main.lineTo(277, 329);
	main.lineTo(262, 329);
	main.lineTo(292, 329);

	main.moveTo(292, 560);
	main.lineTo(335, 560);
	main.lineTo(335, 587);
	main.lineTo(320, 587);
	main.lineTo(350, 587);
	main.moveTo(277, 575);
	main.lineTo(277, 587);
	main.lineTo(262, 587);
	main.lineTo(292, 587);

	main.moveTo(570, 560);
	main.lineTo(527, 560);
	main.lineTo(527, 587);
	main.lineTo(542, 587);
	main.lineTo(512, 587);
	main.moveTo(585, 575);
	main.lineTo(585, 587);
	main.lineTo(570, 587);
	main.lineTo(600, 587);

	main.stroke();
	// Робимо позначки на входах осцилографа та логічному елементі
	main.font = "bold 18pt arial";
	main.fillText("Вх1", 610, 373);
	main.fillText("Вх2", 610, 438);
	main.fillText("Вх3", 610, 503);
	main.font = "bold 22pt arial";
	main.fillText("&", 400, 475);
	// Малюємо індикатор осцилографа
	main.beginPath();
	main.lineWidth = 3.5;
	main.arc(718, 465, 20, 0, 180);
	main.stroke();
	main.beginPath();
	main.arc(718, 465, 12, 0, 180);
	main.strokeStyle = main.fillStyle = "black";
	main.fill();
	main.stroke();
};

// Функція для малювання контактів приладів
function point(main, x, y) {
	main.beginPath();
	main.lineWidth = 3.5;
	main.arc(x, y, 15, 0, 180);
	main.stroke();
	main.beginPath();
	main.arc(x, y, 5, 0, 180);
	main.fillStyle = "black";
	main.fill();
	main.stroke();
};

// Функція для малювання екрану осцилографа
function osc_field() {
	// В змінну cn передаємо поле для малювання екрану осцилографа
	var cn = document.getElementById("oscilloscope_window").getContext("2d");
	// Очищуємо поле осицлографа
	cn.clearRect(0, 0, 300, 240);
	// Цикл, що рисує вертикальні лінії сітки
	for (let i = 1; i < 11; i++) {
	    cn.beginPath();
	    if (i == 5) {
	    	cn.lineWidth = 2;
	    } else {
	    	cn.lineWidth = 1;
	    };
		cn.strokeStyle="white";
		cn.moveTo(i*30 + 1, 0);
		cn.lineTo(i*30 + 1, 240);
		cn.stroke();
	};
	// Цикл, що рисує горизонтальні лінії сітки
	for (let i = 1; i < 8; i++) {
	    cn.beginPath();
	    if (i == 4) {
	    	cn.lineWidth = 2;
	    } else {
	    	cn.lineWidth = 1;
	    };
		cn.strokeStyle="white";
		cn.moveTo(0, i*30);
		cn.lineTo(300, i*30);
		cn.stroke();
	};
};

// Функція, що вмикає індикатор осцилографа (кольор стану червоний)
function osc_indicate_on() {
	var indicate = document.getElementById("main").getContext("2d");
	indicate.beginPath();
	indicate.arc(718, 465, 12, 0, 180);
	indicate.strokeStyle = indicate.fillStyle = "red";
	indicate.fill();
	indicate.stroke();
};

// Функція, що вимикає індикатор осцилографа (кольор стану чорний)
function osc_indicate_off() {
	var indicate = document.getElementById("main").getContext("2d");
	indicate.beginPath();
	indicate.arc(718, 465, 12, 0, 180);
	indicate.strokeStyle = indicate.fillStyle = "black";
	indicate.fill();
	indicate.stroke();
};