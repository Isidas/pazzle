let tg = window.Telegram.WebApp;
tg.expand();
const pazzl = [
  { id: 1, title: "Нет пепла", img: "1.svg", right: true },
  { id: 2, title: "Есть дым и пепел", img: "2.svg", right: false },
  {
    id: 3,
    title: "Меньше едкого запаха,чем при курении сигарет",
    img: "3.svg",
    right: true,
  },
  { id: 4, title: "Нет нагревания", img: "4.svg", right: false },
  { id: 5, title: "Настоящий вкус табака", img: "5.svg", right: true },
  { id: 6, title: "Нет сигаретного дыма", img: "6.svg", right: true },
];

const createGameItem = () => {
  const itemWrapper = document.querySelector(".game_wrapper");
  pazzl.forEach((item) => {
    const gameItem = document.createElement("div");
    gameItem.classList.add("game_item");
    gameItem.innerHTML = `
      <p class="item_title">${item.title}</p>
      <img src="./images/${item.img}" alt="pazzle" class="item_image" />
    `;
    itemWrapper.appendChild(gameItem);
  });
};
function addPuzzleField() {
  const gameValidateDiv = document.querySelector(".game_validate");

  // Создание контейнера для полей пазла
  const puzzleContainer = document.createElement("div");
  puzzleContainer.classList.add("puzzle_container");

  // Создание и добавление полей пазла
  for (let i = 1; i <= 4; i++) {
    const puzzleField = document.createElement("img");
    puzzleField.classList.add("puzzle_field", `puzzle_field_${i}`);
    puzzleField.src = "./images/7.svg";
    puzzleField.alt = "puzzle_wrapper";
    puzzleContainer.appendChild(puzzleField);
  }

  // Добавление контейнера с полями пазла в game_validateDiv
  gameValidateDiv.appendChild(puzzleContainer);
}

// Вызов функции для добавления поля пазла
addPuzzleField();
createGameItem();
