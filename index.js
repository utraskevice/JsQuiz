const facts = [
  {
    statement: 'The external JavaScript file must contain the <script> tag.',
    answer: 'false',
    explanation:
      'External JavaScript file does not contain <script> tag, because tags supposed to be used just in html file',
  },
  {
    statement: 'JavaScript is the same as Java.',
    answer: 'false',
    explanation: 'Java and JavaScript is two different coding languages',
  },

  {
    statement: '0.2 + 0.1 === 0.3',
    answer: 'false',
    explanation:
      'The strict equality ( === ) operator checks whether its two operands are equal',
  },

  {
    statement: 'JavaScript was invented in 1995',
    answer: 'true',
    explanation:
      'Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days.',
  },
  {
    statement: 'Strings in JS are editable values',
    answer: 'false',
    explanation:
      'In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings.',
  },
  {
    statement: '1 + 1 === 2',
    answer: 'true',
    explanation: 'The plus operator gives the sum of two numbers.',
  },
  {
    statement: "'1' + '1' === '2'",
    answer: 'false',
    explanation:
      "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.",
  },
  {
    statement: "typeof ['J', 'S'] === 'array'",
    answer: 'false',
    explanation:
      "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties.  ",
  },
];

let fact;

let correct = 0;
let completed = 0;

const statement = document.querySelector('#statement');
const optionButtons = document.querySelector('#options').children;
const explanation = document.querySelector('#explanation');
const nextButton = document.querySelector('#next-question');
const reset = document.querySelector('#reset');
const board = document.querySelector('#board');
const startButton = document.querySelector('#start');
const timer = document.querySelector('#timer');

const timeFormat = function (counter) {
  const display = function (counter) {
    return counter < 10 ? '0' + counter : counter;
  };
  return [
    display(Math.floor(counter / 3600)),
    display(Math.floor((counter % 3600) / 60)),
    display(Math.floor(counter % 60)),
  ].join(':');
};

let time = 0;

function setTimer() {
  setInterval(() => {
    time++;
    timer.textContent = timeFormat(time);
  }, 1000);
}

function disable(button) {
  button.setAttribute('disabled', '');
}

function enable(button) {
  button.removeAttribute('disabled');
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function startGame() {
  show(board);
  show(nextButton);
  hide(startButton);
  setTimer();
}

function getNextFact() {
  fact = facts.shift();

  statement.textContent = fact.statement;

  hide(explanation);

  for (let option of optionButtons) {
    option.classList.remove('correct');
    option.classList.remove('incorrect');

    enable(option);
  }

  disable(nextButton);
}

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', getNextFact);

reset.addEventListener('click', (e) => location.reload());

for (let button of optionButtons) {
  button.addEventListener('click', (e) => {
    console.log(e.target);

    for (let button of optionButtons) {
      disable(button);
    }

    if (facts.length > 0) {
      enable(nextButton);
    } else {
      nextButton.textContent = 'No more questions!';
      hide(board);
      show(reset);
    }

    const guess = e.target.value;
    if (guess === fact.answer) {
      e.target.classList.add('correct');
      correct += 1;
    } else {
      e.target.classList.add('incorrect');
    }
    explanation.textContent = fact.explanation;
    show(explanation);

    completed += 1;
    document.getElementById('correct').textContent = correct;
    document.getElementById('completed').textContent = completed;
    console.log(completed);
    console.log(correct);
  });
}

getNextFact();
