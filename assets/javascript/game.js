var questions = [{
	question: "In the opening scene, when Lloyd hears the attractive woman speak, he says: “That’s a lovely accent… New Jersey?” Where is the woman’s accent actually from??",
	answers: ['Australia', 'Russia', 'Austria', 'Belgium'],
	correctAnswer: 'Austria',
	image: "./assets/images/austria.gif",
  }, 
  {
	question: "After Harry points out that he expected the Rocky Mountains to be a little rockier than the landscape he was seeing, Lloyd accuses which recording artist of being full of shit?",
	answers: ['Niel Diamond', 'John Mellencamp', 'Bruce Springsteen', 'John Denver'],
	correctAnswer: 'John Denver',
	image: "./assets/images/johndenver.gif",
  }, 
  {
	question: "Who threw the salt at the Seabass?",
	answers: ['Flo', 'Floyd', 'Harry', 'Mary'],
	correctAnswer: 'Harry',
	image: "./assets/images/seabasssalt.gif",
  }, 
  {
	question: "What is the name of the pet shop Lloyd and Harry plan on opening?",
	answers: ['The Cat\'s Meow', 'I Got Worms', 'Animals and Things', 'Pets R\' Us'],
	correctAnswer: 'I Got Worms',
	image: "./assets/images/igotworms.gif",
  },
  {
	question: "What is the name of Harry’s pet bird?",
	answers: ['Squaks', 'Tweety', 'Chippy', 'Petey'],
	correctAnswer: 'Petey',
	image: "./assets/images/petey.gif",
	},
	{
	question: "When the state trooper tells Harry to pull over, Harry says, 'No it\'s a cardigan, but thanks for noticing!' Lloyd thinks the cop's _________ is/are killer:",
	answers: ['Boots', 'Motorcycle', 'Helmet', 'Sunglasses'],
	correctAnswer: 'Boots',
	image: "./assets/images/boots.gif",
	},
	{	
	question: "What's the name of the town where 'The beer flows like wine. Where beautiful women instinctively flock like the salmon of Capistrano?'",
	answers: ['Austria', 'Aspen', 'Alexandria', 'Ashland'],
	correctAnswer: 'Aspen',
	image: "./assets/images/aspen.gif"
  }];
  
  console.log(questions);
	
	
  var dumbGame = document.querySelector("#dumbGame");
  var startClock = 30;
  
  var timer;
  var gameClock = startClock;
  var currentQuestion = 0;
  var correct = 0;
  var incorrect = 0;
  
  
  //if answered correctly
  function answeredCorrect() {

	correct++;
	
	document.getElementById("correctMP3").play();
	
	var current = questions[currentQuestion];
	var imageElement = document.createElement("img");
	
	
	imageElement.className = "answer-image";
	imageElement.src = current.image;
	
	
	dumbGame.innerHTML = "<h2>Correct!</h2>";
	dumbGame.appendChild(imageElement);
  
	currentQuestion === questions.length - 1 ? setTimeout(results, 3 * 1000) : setTimeout(nextQuestion, 3 * 1000);  
	console.log(correct);	
}
	

	//if answered incorrectly
  function answeredIncorrect() {
  
	incorrect++;
	
	document.getElementById("patheticLoser").play();
	
	var current = questions[currentQuestion];
	var incorrectAnswerElement = document.createElement("div");
	var imageElement = document.createElement("img");  
	
	incorrectAnswerElement.className = "answer-correct";
	incorrectAnswerElement.innerHTML = `The correct answer is: ${current.correctAnswer}`;
  
	imageElement.className = "answer-image";
	imageElement.src = current.image;
	
	dumbGame.innerHTML = "<h2>Incorrect! 'Man, you are one pathetic loser. No offense.'</h2>";
	dumbGame.appendChild(incorrectAnswerElement);
	dumbGame.appendChild(imageElement);
  
	currentQuestion === questions.length - 1 ? setTimeout(results, 3 * 1000) : setTimeout(nextQuestion, 3 * 1000);
  }
  
	function finalCountdown() {
		
		// gameClock goes down and displays on DOM. Once it reaches 0 it will run the timeUp function
			gameClock--;
			document.querySelector(".gameClock").innerHTML = gameClock;
			if(gameClock < 0) {
			timeUp();
			}
		}
		
		function timeUp() {
			
	
		//stop timer
		clearInterval(timer);
		
		document.getElementById("patheticLoser").play();
		
		var current = questions[currentQuestion];
		var incorrectAnswerElement = document.createElement("div");
		var imageElement = document.createElement("img");
		
		//incorrect image element
		incorrectAnswerElement.className = "answer-correct";
		incorrectAnswerElement.innerHTML = `The correct answer is: ${current.correctAnswer}`;
		
		//image element
		imageElement.className = "answer-image";
		imageElement.src = current.image;
	
		
		//elements together
		dumbGame.innerHTML = "<h2>Time Up, Pathetic Loser!</h2>";
		dumbGame.appendChild(incorrectAnswerElement);
		dumbGame.appendChild(imageElement);
		
		currentQuestion === questions.length - 1 ? setTimeout(results, 3 * 1000) : setTimeout(nextQuestion, 3 * 1000);
		}
		
		function nextQuestion() {
		
		gameClock = startClock;
		dumbGame.innerHTML = 
			`<div class="timer">Seconds Left: <span class="gameClock">${startClock}</span></div>`;
		currentQuestion++;
		loadQuestion();
		}
		
		function loadQuestion() {
		
		timer = setInterval(finalCountdown, 1000);
		
		//establish which question the user is on
		var current = questions[currentQuestion];
		var questionElement = document.createElement("div");
		
		//question element
		questionElement.className = "question";
		questionElement.innerHTML = current.question;
		
		dumbGame.appendChild(questionElement);
		
		//answer selection
		current.answers.map(answer => {
		
			var answerElement = document.createElement("div");
		
			answerElement.addEventListener("click", answerSelect);
			answerElement.setAttribute("data-answer", `${answer}`);
			answerElement.className = "answer";
			answerElement.innerHTML = `${answer}`;
		
			dumbGame.appendChild(answerElement);
		});
		}
		
		function answerSelect(e) {
		
		clearInterval(timer);
		
		e.target.dataset.answer === questions[currentQuestion].correctAnswer ? answeredCorrect() : answeredIncorrect();
		}
	
	//end results
	function results(){
  
	var resultsElement = document.createElement("div");
	var buttonElement = document.createElement("button");
  
	resultsElement.innerHTML = `
	  <h3>Correct: ${correct}</h3>
	  <h3>Incorrect: ${incorrect}</h3>
	  <h3>Unanswered: ${questions.length - (correct + incorrect)}</h3>
	`;
	
	buttonElement.className = "start-button";
	buttonElement.addEventListener("click", reset);
	buttonElement.innerHTML = "Reset";
	
	
	
	dumbGame.innerHTML = "<h2>Game Over!</h2>";
	dumbGame.appendChild(resultsElement);
	dumbGame.appendChild(buttonElement);  
  }
  
	//game reset
	function reset() {
  
	dumbGame.innerHTML = `
	  <div class="timer">Seconds Left: <span class="gameClock">${startClock}</span></div>
	`;
	
	currentQuestion = 0;
	gameClock =startClock;
	correct = 0;
	incorrect = 0;
	loadQuestion();

  }
  
  document.querySelector(".start-button").addEventListener("click", () => {
		document.getElementById("themeMP3").play();
	dumbGame.innerHTML = `
	  <div class="timer">Seconds Left: <span class="gameClock">${startClock}</span></div>
	`;
	


	loadQuestion();
	});