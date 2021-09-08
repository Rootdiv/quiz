document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const btnOpenModal = document.getElementById('btnOpenModal');
  const modalBlock = document.getElementById('modalBlock');
  const closeModal = document.getElementById('closeModal');
  const questionTitle = document.getElementById('question');
  const formAnswers = document.getElementById('formAnswers');
  const burgerTitle = 'Стандарт';
  const burgerImage = './image/burger.png';

  const palyTest = () => {
    const renderQuestion = () => {
      questionTitle.textContent = 'Какого цвета бургер Вы хотите';
      formAnswers.innerHTML = `
        <div class="answers-item d-flex flex-column">
          <input type="radio" id="answerItem1" name="answer" class="d-none">
          <label for="answerItem1" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${burgerImage}" alt="burger">
            <span>${burgerTitle}</span>
          </label>
        </div>
      `;
    };
    renderQuestion();
  };

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    palyTest();
  });
  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
  });
});
