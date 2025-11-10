const quizData = [
      { question: "What is your name bro?", options: ["yash", "kuch bhi", "yashu", "your name"], correctAnswer: "yash" },
      { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: "Paris" },

      { question: "Which planet is known as the Red Planet?", options: ["Jupiter", "Mars", "Earth", "Venus"], correctAnswer: "Mars" },

      { question: "How many days are in a leap year?", options: ["365", "366", "364", "367"], correctAnswer: "366" },
      { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], correctAnswer: "Da Vinci" }
    ];

    let currentQuestionIndex = 0;
    let timeRemaining = 15;

   
    const totalTime = 15;
    let timerInterval;

    let yashScore = 0;
    let shukalScore = 0;
    let isYashsTurn = true;

    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const timerDisplay = document.getElementById('timer-display');

    const progressBar = document.getElementById('progress-bar');
    const yashScoreDisplay = document.getElementById('yash-score');

    const shukalScoreDisplay = document.getElementById('shukal-score');
    const player1Input = document.getElementById('player1-input');
    const player2Input = document.getElementById('player2-input');
    const turnIndicator = document.getElementById('turn-indicator');

    const player1NameDisplay = document.getElementById('player1-name-display');
    const player2NameDisplay = document.getElementById('player2-name-display');


    function updateTurnDisplay() {
      turnIndicator.textContent = `${isYashsTurn ? player1Input.value || "Player 1" : player2Input.value || "Player 2"}'s turn`;
    }


    window.startGame = function () {
      const p1 = player1Input.value.trim();
      const p2 = player2Input.value.trim();

      if (p1 === "" || p2 === "") {
        alert(" Please enter both player names before starting!");
        return;
      }

      player1NameDisplay.textContent = p1;
      player2NameDisplay.textContent = p2;

      yashScore = 0;
      shukalScore = 0;
      currentQuestionIndex = 0;
      isYashsTurn = true;
      yashScoreDisplay.textContent = 0;
      shukalScoreDisplay.textContent = 0;

      startScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      loadQuestion();
    }

    function updateTimerDisplay() {
      timerDisplay.textContent = timeRemaining + 's';
      const progressPercentage = (timeRemaining / totalTime) * 100;
      progressBar.style.width = `${progressPercentage}%`;
    }

    function startTimer() {
      updateTimerDisplay();
      timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
          clearInterval(timerInterval);
          handleTimeout();
        }
      }, 1000);
    }

    function handleTimeout() {
      questionText.textContent = `${isYashsTurn ? player1Input.value : player2Input.value}'s time ran out!`;
      moveToNextQuestion();
    }

    function loadQuestion() {
      if (currentQuestionIndex >= quizData.length) {
        endQuiz();
        return;
      }

      const currentQuestion = quizData[currentQuestionIndex];
      questionText.textContent = currentQuestion.question;
      optionsContainer.innerHTML = '';
      updateTurnDisplay();


      currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className =
          'w-full text-left p-4 border border-gray-300 rounded-lg text-lg font-medium text-gray-700 hover:bg-indigo-50 hover:border-indigo-400 transition duration-150 ease-in-out';
        button.onclick = () => handleAnswer(option, currentQuestion.correctAnswer, button);
        optionsContainer.appendChild(button);
      });

      timeRemaining = totalTime;
      clearInterval(timerInterval);
      startTimer();
    }

    function handleAnswer(selectedOption, correctAnswer, button) {
      clearInterval(timerInterval);
      Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);

      if (selectedOption === correctAnswer) {
        button.classList.add('bg-green-100', 'border-green-500', 'text-green-700', 'font-bold');
        if (isYashsTurn) yashScore++;
        else shukalScore++;
      } else {
        button.classList.add('bg-red-100', 'border-red-500', 'text-red-700', 'font-bold'); 

        Array.from(optionsContainer.children).forEach(btn => {

          if (btn.textContent === correctAnswer) {
            btn.classList.add('bg-green-200', 'border-green-600', 'text-green-800');
          }
        });
      }

      yashScoreDisplay.textContent = yashScore;
      shukalScoreDisplay.textContent = shukalScore;
      setTimeout(moveToNextQuestion, 1500);
      
    }

    function moveToNextQuestion() {
      isYashsTurn = !isYashsTurn;

      if (isYashsTurn) currentQuestionIndex++;

      loadQuestion();
    }

    const buttons = document.querySelectorAll(".difficulty-btn");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        
        buttons.forEach(b => {
          b.classList.remove("bg-gradient-to-r", "from-blue-500", "to-orange-500", "text-white", "shadow-md");
          b.classList.add("bg-gray-200", "text-gray-700");
        });

       
        btn.classList.remove("bg-gray-200", "text-gray-700");
        btn.classList.add("bg-gradient-to-r", "from-blue-500", "to-orange-500", "text-white", "shadow-md");

      
        const selectedLevel = btn.getAttribute("data-level");
        console.log("Selected Difficulty:", selectedLevel);
     
      });
    });