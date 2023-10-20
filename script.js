const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const label =document.querySelector('label')
const inp = document.querySelector('#check'),
   audio = document.querySelector('audio')


label.addEventListener('click', function (){
	if(inp.checked){
		audio.pause()
	}else{
		audio.play()
	}
})



class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 3),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Поздравляем Вы успешно усвоили эту тему", 5)
];


const questions = 
[
	new Question("  Это посредник в общении между людьми и богами. Считается, что они служили помощниками правителя-фараона.", 
	[
		new Answer('Мумии', 0),
		new Answer("Фараоны-бармалеи", 0),
		new Answer("Войны", 0),
		new Answer("Жрецы", 1)
	]),
	new Question("В Египте —  это специальный процесс создания мумии из тела умершего человека (или животного).", 
	[
		new Answer('Бальзамировние', 1),
		new Answer("Мумия", 0),
		new Answer("Захоронение", 0),
		new Answer("Египесткая казнь", 0)
	]),
	new Question("Материал для письма, в древности использовавшийся в Египте и других странах Средиземноморья. ", 
	[
		new Answer('Ветки кедра', 0),
		new Answer("Камыш", 0),
		new Answer("Пальма ", 0),
		new Answer("Папирус", 1)
	]),
	new Question(" Стела из гранодиорита, найденная в 1799 году в Египте возле небольшого города Розетта (теперь Рашид),ключ к изучению Египетских иероглифов  ", 
	[
		new Answer('Античный камень', 0),
		new Answer("Розетский камень", 1),
		new Answer("Сильверстоун", 0),
		new Answer("Антанта", 0)
	]),
	new Question("Египетский «царский локоть» был равен 7 ладоням или примерно ... см ", 
	[
		new Answer('52,5 см ', 1),
		new Answer("2,5 см", 0),
		new Answer("25,5 см", 0),
		new Answer("157,5 см", 0)

	]),
];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



