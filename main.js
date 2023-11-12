const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];
//находти элементы 
const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

//переменные игры
let score = 0; //кол-во правильных ответов
let questionIndex = 0; //текущий вопрос

clearPage();
showQuestions();

function clearPage(){
	headerContainer.innerText = "";
	listContainer.innerText = "";
}

function showQuestions() {
	const headerTemplate = `<h2 class="title">${questions[questionIndex]["question"]}</h2>`;
	headerContainer.insertAdjacentHTML("beforeend", headerTemplate);
	for([index, answeText] of questions[questionIndex]['answers'].entries()){
		let elemHTML = `
			<li>
				<label>
					<input value="${index + 1}" type="radio" class="answer" name="answer" />
					<span>${answeText}</span>
				</label>
			</li>
		`;
		listContainer.insertAdjacentHTML("beforeend", elemHTML);
	}
}
function checkAnswer(){
	const checkedRadio = listContainer.querySelector('#list input[type="radio"]:checked');

	if(!checkedRadio) {
		submitBtn.blur();
		return false;
	}
	if(parseInt(checkedRadio.value) === questions[questionIndex]["correct"]){
		score++;
	}
	return true;
}

function showResults(){
	const resultsTemlate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;
	let title, message;
	if(score == questions.length){
		title = "Поздравляем!!!";
		message = "Вы ответили верно на все вопросы!";
	}else if ((score * 100) / questions.length){
		title = "Неплохой результат!!";
		message = "Вы ответили верно на половину или больше половины вопросов!";
	}else {
		title = "Стоит постараться!";
		message = "Пока вы ответили верно на меньше половины вопросов";
	}
	let result = `${score} из ${questions.length}`;
	const finalMessage = resultsTemlate.replace('%title%', title)
										.replace('%message%', message)
										.replace('%result%', result);
	headerContainer.innerHTML = finalMessage;
	submitBtn.blur(); 
	submitBtn.innerText = "Играть заново";
	submitBtn.onclick = () => history.go();
}

submitBtn.addEventListener('click', () => {
	if(!checkAnswer()) return;
	
	if(questionIndex < questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestions();
	}
	else {
		clearPage();
		showResults();
	}
});