document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const btnOpenModal = document.getElementById('btnOpenModal');
  const modalBlock = document.getElementById('modalBlock');
  const closeModal = document.getElementById('closeModal');
  const modal = document.querySelector('.modal');
  const questionTitle = document.getElementById('question');
  const formAnswers = document.getElementById('formAnswers');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');
  const sendButton = document.getElementById('send');
  const burgerBtn = document.getElementById('burger');

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
    const finalAnswers = [];
    let numberQuestion = 0;
    const renderAnswers = index => {
      questions[index].answers.forEach(answer => {
        const answerItem = document.createElement('div');
        answerItem.className = 'answers-item d-flex justify-content-center';
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none"
            value="${answer.title}" />
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.append(answerItem);
      });
    };
    const renderQuestion = indexQuestion => {
      formAnswers.textContent = '';
      /* eslint-disable indent */
      switch (true) {
        case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
          questionTitle.textContent = questions[indexQuestion].question;
          if (numberQuestion === 0) {
            prevButton.classList.add('d-none');
          } else {
            prevButton.classList.remove('d-none');
          }
          nextButton.classList.remove('d-none');
          sendButton.classList.add('d-none');
          renderAnswers(indexQuestion);
          break;
        case (numberQuestion === questions.length):
          questionTitle.textContent = '';
          prevButton.classList.add('d-none');
          nextButton.classList.add('d-none');
          sendButton.classList.remove('d-none');
          formAnswers.innerHTML = `
            <div class="form-group">
              <label for="numberPhone">Введите Ваш телефон</label>
              <input type="tel" id="numberPhone" name="phone" class="form-control" />
            </div>
          `;
          break;
        case (numberQuestion === questions.length + 1):
          questionTitle.textContent = '';
          formAnswers.textContent = 'Спасибо за пройденный тест!';
          sendButton.classList.add('d-none');
          setTimeout(() => {
            modalBlock.classList.remove('d-block');
            burgerBtn.classList.remove('active');
          }, 2000);
          break;
        default:
          console.log('Что-то пошло не так');
      }
      /* eslint-enable indent */
    };
    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter(input => input.checked || input.id === 'numberPhone');
      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        } else if (numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value;
        }
      });
      finalAnswers.push(obj);
    };
    renderQuestion(numberQuestion);
    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestion(numberQuestion);
    };
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestion(numberQuestion);
    };
    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestion(numberQuestion);
      console.log(finalAnswers);
    };
  };

  const burgerMenu = () => {
    if (document.documentElement.clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  };
  burgerMenu();

  window.addEventListener('resize', () => {
    burgerMenu();
  });

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    palyTest();
  });

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    palyTest();
  });
  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  });
  modal.addEventListener('click', event => {
    if (!event.target.closest('.modal-dialog')) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');
    }
  });
});
