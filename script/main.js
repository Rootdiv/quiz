document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const btnOpenModal = document.getElementById('btnOpenModal');
  const modalBlock = document.getElementById('modalBlock');
  const closeModal = document.getElementById('closeModal');
  const modal = document.querySelector('.modal');
  const modalDialog = document.querySelector('.modal-dialog');
  const questionTitle = document.getElementById('question');
  const formAnswers = document.getElementById('formAnswers');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');
  const sendButton = document.getElementById('send');
  const burgerBtn = document.getElementById('burger');
  const modalTitle = document.querySelector('.modal-title');

  let count = -100,
    interval;
  modalDialog.style.top = count + '%';
  const animateModal = () => {
    count += 2;
    interval = requestAnimationFrame(animateModal);
    if (count < 0) {
      modalDialog.style.top = count + '%';
    } else {
      cancelAnimationFrame(interval);
      count = -100;
    }
  };

  const palyTest = questions => {
    const finalAnswers = [];
    const obj = {};
    modalTitle.textContent = 'Ответь на вопрос:';
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
          modalTitle.textContent = '';
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
          // eslint-disable-next-line no-case-declarations
          const numberPhone = document.getElementById('numberPhone');
          numberPhone.addEventListener('input', event => {
            event.target.value = event.target.value.replace(/[^0-9+-]/, '');
          });
          break;
        case (numberQuestion === questions.length + 1):
          formAnswers.textContent = 'Спасибо за пройденный тест!';
          sendButton.classList.add('d-none');
          for (const key in obj) {
            const newObj = {};
            newObj[key] = obj[key];
            finalAnswers.push(newObj);
          }
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
      const inputs = [...formAnswers.elements].filter(input => input.checked || input.id === 'numberPhone');
      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        } else if (numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value;
        }
      });
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

  const getData = () => {
    modalTitle.textContent = '';
    questionTitle.textContent = '';
    formAnswers.innerHTML = '<img src="./image/loader.svg" alt="Загрузка данных..." />';
    prevButton.classList.add('d-none');
    nextButton.classList.add('d-none');
    setTimeout(() => {
      fetch('./questions.json')
        .then(res => res.json())
        .then(obj => palyTest(obj.questions))
        .catch(err => {
          formAnswers.textContent = 'Ошибка загрузки данных!';
          console.error(err);
        });
    }, 2000);
  };

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    getData();
  });

  btnOpenModal.addEventListener('click', () => {
    requestAnimationFrame(animateModal);
    modalBlock.classList.add('d-block');
    getData();
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
