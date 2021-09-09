document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const btnOpenModal = document.getElementById('btnOpenModal');
  const modalBlock = document.getElementById('modalBlock');
  const closeModal = document.getElementById('closeModal');
  const questionTitle = document.getElementById('question');
  const formAnswers = document.getElementById('formAnswers');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');

  /* eslint-disable indent */
  const questions = [{
      question: 'Какого цвета бургер?',
      answers: [{
          title: 'Стандарт',
          url: './image/burger.png'
        },
        {
          title: 'Черный',
          url: './image/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: 'Из какого мяса котлета?',
      answers: [{
          title: 'Курица',
          url: './image/chickenMeat.png'
        },
        {
          title: 'Говядина',
          url: './image/beefMeat.png'
        },
        {
          title: 'Свинина',
          url: './image/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: 'Дополнительные ингредиенты?',
      answers: [{
          title: 'Помидор',
          url: './image/tomato.png'
        },
        {
          title: 'Огурец',
          url: './image/cucumber.png'
        },
        {
          title: 'Салат',
          url: './image/salad.png'
        },
        {
          title: 'Лук',
          url: './image/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: 'Добавить соус?',
      answers: [{
          title: 'Чесночный',
          url: './image/sauce1.png'
        },
        {
          title: 'Томатный',
          url: './image/sauce2.png'
        },
        {
          title: 'Горчичный',
          url: './image/sauce3.png'
        }
      ],
      type: 'radio'
    }
  ];
  /* eslint-enable indent */

  const palyTest = () => {
    let numberQuestion = 0;
    const renderAnswers = index => {
      questions[index].answers.forEach(answer => {
        const answerItem = document.createElement('div');
        answerItem.className = 'answers-item d-flex flex-column';
        answerItem.innerHTML = `
          <div class="answers-item d-flex flex-column">
            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
              <img class="answerImg" src="${answer.url}" alt="burger">
              <span>${answer.title}</span>
            </label>
          </div>
        `;
        formAnswers.append(answerItem);
      });
    };
    const renderQuestion = indexQuestion => {
      formAnswers.textContent = '';
      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = questions[indexQuestion].question;
        prevButton.classList.remove('d-none');
        nextButton.classList.remove('d-none');
        renderAnswers(indexQuestion);
      }
      if (numberQuestion === 0) {
        prevButton.classList.add('d-none');
      } else if (numberQuestion === questions.length - 1) {
        nextButton.classList.add('d-none');
      }
    };
    renderQuestion(numberQuestion);
    nextButton.onclick = () => {
      numberQuestion++;
      renderQuestion(numberQuestion);
    };
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestion(numberQuestion);
    };
  };

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    palyTest();
  });
  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
  });
});
