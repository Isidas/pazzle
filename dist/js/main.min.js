const tg = window.Telegram.WebApp;
tg.expand();
const botTitle = document.querySelector('.game_title');
const itemWrapper = document.querySelector(".game_wrapper");
const container = document.querySelector('.container');
const btnAgain = document.querySelector('.btn_again');
const pazzl = [
  { id: 1, title: "Нет пепла", img: "1.png", right: true },
  { id: 2, title: "Есть дым и пепел", img: "2.png", right: false },
  {
    id: 3,
    title: "Меньше едкого запаха,чем при курении сигарет",
    img: "3.png",
    right: true,
  },
  { id: 4, title: "Нет нагревания", img: "4.png", right: false },
  { id: 5, title: "Настоящий вкус табака", img: "5.png", right: true },
  { id: 6, title: "Нет сигаретного дыма", img: "6.png", right: true },
];

const wrongAnswer = [
  'Не совсем так',
  'Кажется, где-то ошибка',
  'Чего-то не хватает'
]

let gameValidateDiv;

const createGameItem = () => {
  pazzl.forEach((item, index) => {
    const gameItem = document.createElement("div");
    gameItem.classList.add("game_item");
    gameItem.dataset.id = item.id; // Устанавливаем атрибут data-id для каждого элемента
    gameItem.innerHTML = `
      <p class="item_title">${item.title}</p>
      <img src="./images/${item.img}" alt="pazzle" class="item_image item_image_${index}" />
    `;

    gameItem.addEventListener("click", () => {
      onGameItemClick(gameItem);
    });

    itemWrapper.appendChild(gameItem);
  });
};

function addPuzzleField() {
  const puzzleContainer = document.createElement("div");
  puzzleContainer.classList.add("puzzle_container");

  for (let i = 1; i <= 4; i++) {
    const puzzleField = document.createElement("img");
    puzzleField.classList.add("puzzle_field", `puzzle_field_${i}`);
    puzzleField.src = "./images/7.png";
    puzzleField.alt = "puzzle_wrapper";
    puzzleContainer.appendChild(puzzleField);
  }

  gameValidateDiv.appendChild(puzzleContainer);
}

function onGameItemClick(gameItem) {
  if (gameItem.classList.contains("disabled")) return; // Если элемент уже использован, ничего не делаем

  const puzzleField = document.querySelector(".puzzle_container img:not(.filled)");
  if (puzzleField) {
    const itemImage = gameItem.querySelector("img");
    puzzleField.src = itemImage.src;
    puzzleField.dataset.id = gameItem.dataset.id; // Устанавливаем атрибут data-id для поля пазла
    puzzleField.classList.add("filled");
    gameItem.classList.add("disabled");
  }
}
function getRandomWrongAnswer() {
  const randomIndex = Math.floor(Math.random() * wrongAnswer.length);
  return wrongAnswer[randomIndex];
}
window.onload = () => {
  gameValidateDiv = document.querySelector(".game_validate");
  if (!gameValidateDiv) {
    console.error("Элемент с классом 'game_validate' не найден на странице.");
    return;
  }

  const checkButton = document.createElement("button");
  checkButton.classList.add('btn_validate')
  checkButton.textContent = "Готово";
  checkButton.addEventListener("click", () => {
    const puzzleFields = document.querySelectorAll(".puzzle_field");
    const isPuzzleCorrect = Array.from(puzzleFields).every((field) => {
      const fieldId = field.dataset.id;
      const puzzle = pazzl.find((item) => item.id === Number(fieldId));
      return field.src.includes(puzzle.img) === puzzle.right;
    });
    const randomAnswer = getRandomWrongAnswer();
    if (isPuzzleCorrect) {
      checkButton.classList.add('btn_hide')
      btnAgain.classList.remove('btn_hide')
      itemWrapper.style.display = "none";
      botTitle.innerHTML = '<b>Прекрасно! Вы отлично справились!</b>Главное преимущество — отсутствие горения.А значит';
    } else {
      checkButton.classList.add('btn_hide')
      btnAgain.classList.remove('btn_hide')
      gameValidateDiv.style.display = "none";
      itemWrapper.style.display = "none";
      botTitle.style.display = "none";
      const wrongFrame = document.createElement("div");
      wrongFrame.classList.add("quize__x__item", "quize__x__item--status");
      wrongFrame.innerHTML = `
        <div class='quize__x__item--status__info'>
          <div class='quize__x__item--status__info__inner'>
            <div class='quize__x__item--status__icon'>
              <img src='images/wrong.svg'>
            </div>
            <div class='quize__x__item--status__title'>${randomAnswer}</div>
          </div>
        </div>
      `;
      container.prepend(wrongFrame);
    }
  });
  btnAgain.addEventListener('click', () => {
    location.reload();
  })

  gameValidateDiv.appendChild(checkButton);

  addPuzzleField();
  createGameItem();
};
