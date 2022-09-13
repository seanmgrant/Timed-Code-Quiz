const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const landingPage = document.getElementById('landing');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const saveScoreEl = document.getElementById('save-score')
const viewScores = document.getElementById('scores');
const highScores = document.getElementById('high-scores');
const timerEl = document.getElementById('time');
  var timeLeft = 75;
  var secondsElapsed = 0;
  var currentQ = 0;
  

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
startButton.addEventListener('click', startTimer)
viewScores.addEventListener('click', showScores)



const questions = [
    {
      question: 'String values must be enclosed within _____ when being assigned to variables.',
      answers: [
        {text: '1. commas', correct: false},
        {text: '2. curly brackets', correct: false},
        {text: '3. quotes', correct: true},
        {text: '4. parenthesis', correct: false}
      ]
    },
    {
      question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
      answers: [
        {text: '1. JavaScript', correct: false},
        {text: '2. terminal/bash', correct: false},
        {text: '3. for loops', correct: false},
        {text: '4. console.log', correct: true},
      ]
    },
    {
      question: 'Commonly used data types do NOT include:',
      answers: [
        {text: '1. strings', correct: false},
        {text: '2. booleans', correct: false},
        {text: '3. alerts', correct: true},
        {text: '4. numbers', correct: true},
      ]
    },
    {
      question: 'The condition in an if/else statement is enclosed with ______.',
      answers: [
        {text: '1. quotes', correct: false},
        {text: '2. curly brackets', correct: false},
        {text: '3. parenthesis', correct: true},
        {text: '4. square brackets', correct: true},
      ]
    }
]

function startGame(){
    landingPage.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.corrcet){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })  
}

function resetState(){
    startButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
      element.classList.add('correct')
    } else{
      element.classList.add('wrong')
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct 
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1  ){
       currentQuestionIndex++
       setNextQuestion()
    } else{
        stopTimer();
        questionContainerElement.classList.add('hide')
        saveScoreEl.classList.remove('hide')
    }
}

function showScores(){
    questionContainerElement.classList.add('hide')
    landingPage.classList.add('hide')
    highScores.classList.remove('hide')
  }

  //stops timer
function stopTimer() {
    clearInterval(interval);
}
  
  //starts and updates timer
function startTimer() {
      timerEl.textContent = timeLeft;
      interval = setInterval(function () {
          secondsElapsed++;
          timerEl.textContent = timeLeft - secondsElapsed;
        }, 1000);
}
 