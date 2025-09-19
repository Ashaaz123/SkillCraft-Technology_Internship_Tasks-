const quizData = [
  {
    type: "single",
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    type: "multi",
    question: "Which of these are programming languages?",
    options: ["HTML", "CSS", "Python", "C++"],
    answer: ["Python", "C++"]
  },
  {
    type: "fill",
    question: "______ is the capital of France.",
    answer: "Paris"
  }
];

let currentQuestion = 0;
let score = 0;

const quiz = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");

function loadQuestion() {
  const q = quizData[currentQuestion];
  quiz.innerHTML = `<p>${q.question}</p>`;

  if (q.type === "single") {
    q.options.forEach(option => {
      quiz.innerHTML += `
        <label>
          <input type="radio" name="answer" value="${option}"> ${option}
        </label><br>`;
    });
  } else if (q.type === "multi") {
    q.options.forEach(option => {
      quiz.innerHTML += `
        <label>
          <input type="checkbox" name="answer" value="${option}"> ${option}
        </label><br>`;
    });
  } else if (q.type === "fill") {
    quiz.innerHTML += `<input type="text" id="fillAnswer" placeholder="Type your answer">`;
  }
}

function checkAnswer() {
  const q = quizData[currentQuestion];
  let userAnswer;

  if (q.type === "single") {
    const selected = document.querySelector('input[name="answer"]:checked');
    userAnswer = selected ? selected.value : null;
    if (userAnswer === q.answer) score++;
  } else if (q.type === "multi") {
    const selected = [...document.querySelectorAll('input[name="answer"]:checked')]
                    .map(el => el.value);
    if (JSON.stringify(selected.sort()) === JSON.stringify(q.answer.sort())) score++;
  } else if (q.type === "fill") {
    userAnswer = document.getElementById("fillAnswer").value.trim();
    if (userAnswer.toLowerCase() === q.answer.toLowerCase()) score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quiz.innerHTML = "";
    submitBtn.style.display = "none";
    result.innerHTML = `🎉 You scored ${score} out of ${quizData.length}!`;
  }
}

submitBtn.addEventListener("click", checkAnswer);
loadQuestion();
