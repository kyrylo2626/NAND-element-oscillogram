// Дані першої розгортки
var input_1 = {id: "1", val: null, x_value: 0};
// Дані другої розгортки
var input_2 = {id: "2", val: null, x_value: 0};
// Дані третьої розгортки
var input_3 = {id: "3", val: null};
// Координатна змінна малювання
var x = 0;
// Часовий параметр осцилографа
var period = 0;

// Функція, що відповідає за вмикання осцилографа
function ocs_on() {
	// Вмикаємо індикатор осцилографа
	osc_indicate_on();
	// Пережїдаємо дані на першу розгортку
	previous_graph(input_1, 90);
	// Пережїдаємо дані на другу розгортку
	previous_graph(input_2, 150);
	// Пережїдаємо дані на третю розгортку
	previous_graph(input_3, 210);
};

// Функція, що відповідає за вимикання осцилографа
function ocs_off() {
	// Вимикаємо індикатор осцилографа 
	osc_indicate_off();
	// Скидауємо значення змінної малювання на 0
	x = 0;
	// Скидауємо значення таймеру першої розгортки
	clearTimeout(input_1.val.t);
	input_1.val = null;
	// Скидуємо координату періоду першого генератора
	input_1.x_value = 0;
	// Скидауємо значення таймеру другої розгортки
	clearTimeout(input_2.val.t);
	input_2.val = null;
	// Скидуємо координату періоду другого генератора
	input_2.x_value = 0;
	// Скидауємо значення таймеру третьої розгортки
	clearTimeout(input_3.val.t);
	input_3.val = null;
	// Очищуємо поле екрану осцилографа
	osc_field();
};

// Функція, що перевіряє, чи запущена вже розгортка
function previous_graph(input, y) {
	// Якщо розгортка вже малюється, зупиняємо її
	try {
		clearTimeout(input.val.t);
		// Функція, що домальовує сигнал до кінця екрану з нульовим значенням
		input.val.draw_empty_graph();
	} catch {
		// Якщо не запущена, то запускаємо
		new_graph(input, y);
	};
};

// Функція, що передає розгортки в осцилограф
function new_graph(input, y) {
	// Якщо подана розгортка для логічного елмента
	if (y == 210) {
		// В значення val третьої розортки передаємо екземпляр класу LogicElement
		// Де input_1 дані першої розгортки, input_2 - дані другої розгортки
		input.val = new LogicElement();
	// Якщо подана розгортка для генератора
	} else {
		// Оголошуємо змінну частоти
		var frequency = 0;
		// Якщо генератор ввімкнений
		if (document.getElementById("1button" + input.id).value  == "1") {
			// Зчитуємо з нього значення частоти
			frequency = parseFloat(document.getElementById("frequency" + input.id).value.replace(',', '.'));
		};
		// Очищуємо координату періоду
		input.x_value = 0;
		// В дані розгортки передаємо екземпляр класу DrawGraphs
		input.val = new DrawGraphs(frequency, y, input);
	};
};

// Функція, що відповідає за вмикання генератора
function generator_on(gen_ref, button_id) {
	// Зчитуємо введене значення частоти з генератора в frequency
	var frequency = parseFloat(document.getElementById(gen_ref).value.replace(',', '.'));
	// Перевіряємо, що поле частоти пусте, або заповнене текстом
	if (isNaN(frequency)) {
		alert("Установіть значення частоти в поле форми «Частота (Гц)» і знову натисніть кнопку «ВКЛ.»");
	// Перевіряємо, що в поле частоти введене значення не з діапазону 0 - 20 Гц
	} else if (frequency > 20 || frequency < 0) {
		alert("Установіть значення частоти в межах від 0 до 20 Гц і знову натисніть кнопку «ВКЛ.»");
	// В поле частоти введене корректне значення
	} else {
		// В button_1 передаємо кнопку Вкл. генератора, що була натиснута
		var button_1 = document.getElementById(button_id);
		// В button_2 передаємо кнопку Викл. генератора, що була відтиснута
		var button_2 = document.getElementById("2" + button_id.slice(1));
		// Змінюємо оформлення натиснутої кнопки Вкл.
		button_1.style.color = 'orange';
		button_1.style.borderColor = "orange";
		button_1.value = '1';
		// Змінюємо оформлення відтиснутої кнопки Викл.
		button_2.style.color = 'white';
		button_2.style.borderColor = "white";
		button_2.value = '0';
		is_generator_on(gen_ref)
	};
};

// Функція, що відповідає за вимкнення генератора
function generator_off(gen_ref, button_id) {
	// В button_1 передаємо кнопку Вкл. генератора, що була відтиснута
	var button_1 = document.getElementById("1" + button_id.slice(1));
	// В button_2 передаємо кнопку Викл. генератора, що була натиснута
	var button_2 = document.getElementById(button_id);
	// Змінюємо оформлення відтиснутої кнопки Вкл.
	button_1.style.color = 'white';
	button_1.style.borderColor = "white";
	button_1.value = '0';
	// Змінюємо оформлення натиснутої кнопки Викл.
	button_2.style.color = 'orange';
	button_2.style.borderColor = "orange";
	button_2.value = '1';
	is_generator_on(gen_ref);
};

// Функція, передачі розгортки при увімкненому осцилографі
function is_generator_on(gen_ref) {
	// Перевіряємо, чи увімкнений осцилограф
	if (document.querySelectorAll('input[name="switch"]:checked')[0].value == "on") {
		// Перевіряємо який генератор був вимкнений
		if (gen_ref.slice(-1) == "1") {
			// Передаємо в функцію previous_graph дані першого генератора
			previous_graph(input_1, 90);
		} else {
			// Передаємо в функцію previous_graph дані другого генератора
			previous_graph(input_2, 150);
		};
	};
};

// Функція, для генератора при зміні значення частоти
function generator(gen_ref) {
	// Якщо генератор увімкнено
	if (document.getElementById("1button" + gen_ref.slice(-1)).value == "1") {
		generator_on(gen_ref, "1button" + gen_ref.slice(-1));
	};
};

// Класс, що відповідає за малювання розгортки генератора
class DrawGraphs {
	// Ініціалізатор классу
	constructor(frequency, y, input_x) {
		// Значення частоти генератора
		this.frequency = frequency;
		// Значення початкової вертикальної координати малювання
		this.y = y;
		// Координата кінця крайнього періоду сигналу (х_розгортки)
		this.input = input_x;
		// Змінна таймеру розгортки
		this.t = null;
		// Значення логічного стану розгортки
		this.logic = 0;
		// Запуск функції малювання розгортки
		this.draw_graphs();
	};
	// Функція малювання розгортки 
	draw_graphs() {
		// Якщо координата малювання не поза межами екрану осцилографа
		if (x <= 300) {
			// В змінну cn передаємо екран осцилографа
			var cn = document.getElementById("oscilloscope_window").getContext("2d");
			cn.beginPath();
			// Задаємо стиль лінії малювання
			cn.lineWidth = 3;
			cn.strokeStyle="red";
			cn.lineCap = "square";
			// Якщо х_розгортки <= x < х_розгортки + T_розгортки/2 
			if (this.input.x_value <= x && x < this.input.x_value + Math.floor((300/(this.frequency*period))/2)) {
				// Малюємо горизонтальну лінію в стані логічного нуля
				cn.moveTo(x, this.y);
				cn.lineTo(x+1, this.y);
				// Значення логічного стану розгортки дорівнює нулю
				this.logic = 0;
			// Якщо x = х_розгортки + T_розгортки/2
			} else if (x == this.input.x_value + Math.floor((300/(this.frequency*period))/2)) {
				// Малюємо вертикальну лінію зі стану логічного нуля до стану логічної одиниці
				cn.moveTo(x, this.y);
				cn.lineTo(x, this.y-50);
				// Значення логічного стану розгортки дорівнює одиниці
				this.logic = 1;
			// Якщо х_розгортки + T_розгортки/2 <= x < х_розгортки + T_розгортки
			} else if (this.input.x_value + Math.floor((300/(this.frequency*period))/2) <= x && x < this.input.x_value + Math.floor(300/(this.frequency*period))) {
				// Малюємо горизонтальну лінію в стані логічної одиниці
				cn.moveTo(x, this.y-50);
				cn.lineTo(x+1, this.y-50);
				// Значення логічного стану розгортки дорівнює одиниці
				this.logic = 1;
			// Якщо x = х_розгортки + T_розгортки
			} else if (x == this.input.x_value + Math.floor(300/(this.frequency*period))) {
				// Оновлюємо значення х_розгортки
				this.input.x_value = this.input.x_value + Math.floor(300/(this.frequency*period));
				// Малюємо вертикальну лінію зі стану логічної одиниці до стану логічного нуля
				cn.moveTo(x, this.y-50);
				cn.lineTo(x, this.y);
				// Значення логічного стану розгортки дорівнює нулю
				this.logic = 0;
			};
			cn.stroke();
		// Якщо координата малювання поза межами екрану осцилографа
		} else {
			// Скидуємоо значення х розгортки до 0
			this.input.x_value = 0;
			// Скидуємоо значення логічного стану 0
			this.logic = 0;
		};
		// Встановлюємо таймер розгортки
		this.t = setTimeout(this.draw_graphs.bind(this), period/300);
	};
	// Функція малювання порожньої розгортки
	draw_empty_graph() {
		if (x <= 300) {
			// В змінну cn передаємо екран осцилографа
			var cn = document.getElementById("oscilloscope_window").getContext("2d");
			cn.beginPath();
			// Задаємо стиль лінії малювання
			cn.lineWidth = 3;
			cn.strokeStyle="red";
			cn.lineCap = "square";
			// Якщо логічний стан сигналу дорівнює одиниці
			if (this.logic == 1) {
				// Малюємо вертикальну лінію зі стану логічної одиниці до стану логічного нуля
				cn.moveTo(x, this.y-50);
				cn.lineTo(x, this.y);
				// Значення логічного стану розгортки дорівнює нулю
				this.logic = 0;
			} else {
				// Малюємо горизонтальну лінію в стані логічного нуля
				cn.moveTo(x, this.y);
				cn.lineTo(x+1, this.y);
			};
			cn.stroke();
			// Встановлюємо таймер розгортки
			this.t = setTimeout(this.draw_empty_graph.bind(this), period/300);
		} else {
			// Зупиняємо таймер розгортки
			clearTimeout(this.t);
			// Перемальовуємо розгортку
			new_graph(this.input, this.y);
		};
	};
};

// Класс, що відповідає за малювання розгортки логічного елемента
class LogicElement {
	// Ініціалізатор классу
	constructor() {
		// Змінна таймеру розгортки
		this.t = null;
		// Значення логічного стану розгортки
		this.logic = 0;
		// Зчмиуємо часовий параметр з осцилографа
		period = document.querySelectorAll('input[name="sec"]:checked')[0].value;
		// Запуск функції малювання розгортки
		this.draw_logic_element();
	};
	// Функція малювання розгортки 
	draw_logic_element() {
		// Якщо координата малювання не поза межами екрану осцилографа
		if (x <= 300) {
			// В змінну cn передаємо екран осцилографа
			var cn = document.getElementById("oscilloscope_window").getContext("2d");
			cn.beginPath();
			// Задаємо стиль лінії малювання
			cn.lineWidth = 3;
			cn.strokeStyle="red";
			cn.lineCap = "square";
			// Якщо логічні стани першої та другої розгорток = 1
			if (input_1.val.logic == 1 && input_2.val.logic == 1) {
				// Якщо логічний стан розгортки = 1
				if (this.logic == 1) {
					// Малюємо вертикальну лінію зі стану логічної одиниці до стану логічного нуля
					cn.moveTo(x, 210);
					cn.lineTo(x, 160);
					// Значення логічного стану розгортки дорівнює нулю
					this.logic = 0;
				// Якщо логічний стан розгортки = 0
				} else {
					// Малюємо горизонтальну лінію в стані логічного нуля
					cn.moveTo(x, 210);
					cn.lineTo(x+1, 210);
					// Значення логічного стану розгортки дорівнює нулю
					this.logic = 0;
					// Збільшуємо значення координати малювання х на 1
					x++;
				};
			// Якщо логічний стан першої, другої або обох розгорток = 0
			} else {
				// Якщо логічний стан розгортки = 0
				if (this.logic == 0) {
					// Малюємо вертикальну лінію зі стану логічного нуля до стану логічної одиниці
					cn.moveTo(x, 160);
					cn.lineTo(x, 210);
					// Значення логічного стану розгортки дорівнює одиниці
					this.logic = 1;
				// Якщо логічний стан розгортки = 1
				} else {
					// Малюємо горизонтальну лінію в стані логічної одиниці
					cn.moveTo(x, 160);
					cn.lineTo(x+1, 160);
					// Значення логічного стану розгортки дорівнює одиниці
					this.logic = 1;
					// Збільшуємо значення координати малювання х на 1
					x++;
				};
			};
			cn.stroke();
		// Якщо координата малювання поза межами екрану осцилографа
		} else {
			// Очищуємо екран осцилографа
			osc_field();
			// Скидуємо значення логічного стану на 0
			this.logic = 0;
			// Скидуємо значення координати малювання х на 0
			x = 0;
			// Зчитуємо значення періоду з осцилографа
			period = document.querySelectorAll('input[name="sec"]:checked')[0].value;
		};
		// Встановлюємо таймер розгортки
		this.t = setTimeout(this.draw_logic_element.bind(this), period/300);
	};
};