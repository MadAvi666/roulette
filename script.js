import { allItems } from "items.js";
import { cases } from "cases.js";
import { Player } from "player.js";
const casesContainer = document.querySelector(".cases-container");
const casesOpen = document.querySelector(".cases-open");
const casesFrame = document.querySelector(".cases-frame");
const closeCaseButton = document.querySelector(".close-button-container");
const frameContent = document.querySelector(".frame-content");

// Начало игры

const game = () => {
  let user = localStorage.getItem("playerData");

  // Проверка наличия пользователя

  if (!user) {
    authFrame();
  } else {
    function elementCreator({
      element,
      childOf,
      elementSrc,
      elementText,
      elementClass,
    }) {
      let elem = document.createElement(element);
      if (elementClass !== null) {
        elem.classList.add(elementClass);
      }
      elem.src = elementSrc;
      elem.innerText = elementText;
      childOf.appendChild(elem);
      return elem;
    }
    const gameHeader = document.querySelector("header");
    gameHeader.style = "display: flex";
    elementCreator({
      element: "p",
      childOf: gameHeader,
      elementClass: null,
      elementText: `Добро пожаловать ${JSON.parse(user).name}!`,
    });
    let userProfile = elementCreator({
      element: "div",
      childOf: gameHeader,
      elementClass: "user-profile",
      elementText: null,
    });

    let userHints = elementCreator({
      element: "button",
      childOf: userProfile,
      elementClass: null,
      elementText: null,
    });

    let userHintsDialog = elementCreator({
      element: "div",
      childOf: userHints,
      elementClass: "user-hints-dialog",
      elementText: null,
    });

    userHintsDialog.style = "display: none";

    userHints.onclick = () => {
      if (userHintsDialog.style.display === "none") {
        userHintsDialog.style = "display: inline";
      } else {
        userHintsDialog.style = "display: none";
      }
    };

    let hints = JSON.parse(localStorage.getItem("playerHints"));
    if (hints) {
      let ul = document.createElement("ul");
      hints.map((item) => {
        let hint = document.createElement("li");
        let hintText = document.createElement("p");
        let hintDate = document.createElement("p");
        hintText.innerText = item.text;
        hint.classList.add("hint");
        hintDate.innerText = item.dateStamp;
        userHintsDialog.appendChild(ul);
        ul.appendChild(hint);
        hint.appendChild(hintText);
        hint.appendChild(hintDate);
      });
    }

    elementCreator({
      element: "img",
      childOf: userHints,
      elementSrc: "https://cdn-icons-png.flaticon.com/512/6816/6816607.png",
      elementClass: null,
      elementText: null,
    });

    let userMoneyContainer = elementCreator({
      element: "div",
      childOf: userProfile,
      elementClass: "user-money-container",
      elementText: null,
    });

    let moneyContainerSilver = elementCreator({
      element: "span",
      childOf: userMoneyContainer,
      elementClass: null,
      elementText: null,
    });

    elementCreator({
      element: "img",
      childOf: moneyContainerSilver,
      elementSrc: "https://cdn-icons-png.flaticon.com/512/8894/8894963.png",
      elementClass: null,
      elementText: null,
    });

    elementCreator({
      element: "p",
      childOf: moneyContainerSilver,
      elementClass: null,
      elementText: JSON.parse(user).silver,
    });

    let moneyContainerGold = elementCreator({
      element: "span",
      childOf: userMoneyContainer,
      elementClass: null,
      elementText: null,
    });

    elementCreator({
      element: "img",
      childOf: moneyContainerGold,
      elementSrc: "https://cdn-icons-png.flaticon.com/512/8146/8146562.png",
      elementClass: null,
      elementText: null,
    });

    elementCreator({
      element: "p",
      childOf: moneyContainerGold,
      elementClass: null,
      elementText: JSON.parse(user).gold,
    });

    let userInventory = elementCreator({
      element: "a",
      childOf: userProfile,
      elementClass: null,
      elementText: null,
    });

    elementCreator({
      element: "img",
      childOf: userInventory,
      elementSrc: "https://cdn-icons-png.flaticon.com/512/6618/6618414.png",
      elementClass: null,
      elementText: null,
    });

    cases.map((item) => {
      let openCase = document.createElement("div");
      let gradientCase = document.createElement("span");
      let caseName = document.createElement("h3");
      let caseCoast = document.createElement("p");
      let caseImg = document.createElement("img");
      let coastImg = document.createElement("img");

      openCase.addEventListener("click", () => {
        generateContentFrameCase(item);
        casesOpen.style = "display: flex";
        setTimeout(() => {
          casesFrame.style = "transform: scale(1)";
          casesOpen.style = `display: flex; background: rgba(0, 0, 0, 0.5);`;
        }, 100);
      });

      caseImg.src = item.img;
      caseImg.classList.add("case-img");
      caseName.textContent = item.name;
      if (item.free) {
        caseCoast.textContent = "Бесплатно";
      } else if (item.resource === "gold") {
        caseCoast.textContent = item.price;

        caseCoast.appendChild(coastImg);
        coastImg.src =
          "https://cdn-icons-png.flaticon.com/512/8146/8146562.png";
      } else {
        caseCoast.textContent = item.price;
        caseCoast.appendChild(coastImg);
        coastImg.src =
          "https://cdn-icons-png.flaticon.com/512/8894/8894963.png";
      }
      casesContainer.appendChild(openCase);

      openCase.classList.add("case");

      openCase.appendChild(caseImg);
      openCase.appendChild(gradientCase);
      openCase.appendChild(caseName);
      openCase.appendChild(caseCoast);

      closeCaseButton.addEventListener("click", () => {
        casesFrame.style = "transform: scale(0)";
        casesOpen.style = `display: flex; background: rgba(0, 0, 0, 0);`;
        setTimeout(() => {
          frameContent.innerHTML = "";
          casesOpen.style = `display: none; background: rgba(0, 0, 0, 0);`;
        }, 100);
      });
    });
  }

  // function openCase(box) {
  //   let itemName =
  //     box.dropItems[Math.floor(Math.random() * box.dropItems.length)];
  //   return allItems.find((item) => item.name === itemName);
  // }

  function generateContentFrameCase(box) {
    const casesFrameHeader = document.createElement("h2");
    casesFrameHeader.textContent = box.name;
    frameContent.appendChild(casesFrameHeader);
    const casesFrameContent = document.createElement("div");
    frameContent.appendChild(casesFrameContent);
    const caseImgSide = document.createElement("aside");
    casesFrameContent.appendChild(caseImgSide);
    const casesFrameItems = document.createElement("section");
    casesFrameContent.appendChild(casesFrameItems);
    const casesFrameImg = document.createElement("img");
    casesFrameImg.src = box.img;
    caseImgSide.appendChild(casesFrameImg);

    // box.dropItems.map((drops) => {
    //   const dropItem = document.createElement("figure");
    //   const dropItemTitle = document.createElement("figcaption");
    //   const dropItemChanceFrame = document.createElement("span");
    //   const dropItemChance = document.createElement("p");
    //   const dropItemImg = document.createElement("img");
    //   const obj = allItems.find((item) => item.name === drops.item);
    //   dropItemImg.src = obj.image;
    //   dropItemTitle.textContent = drops.item;
    //   if (drops.dropChance === null) {
    //     dropItemChance.textContent = drops.item;
    //   } else {
    //     dropItemChance.textContent = `${drops.dropChance * 100}%`;
    //   }
    //   casesFrameItems.appendChild(dropItem);
    //   dropItem.appendChild(dropItemChanceFrame);
    //   dropItemChanceFrame.appendChild(dropItemChance);
    //   dropItem.appendChild(dropItemImg);
    //   dropItem.appendChild(dropItemTitle);
    // });

    const arrayGold = [];
    const arraySilver = [];

    box.dropItems.map((drops) => {
      const obj = allItems.find((item) => item.name === drops.item);
      if (obj) {
        if (obj.type === "resource") {
          if (obj.wallet === "gold") {
            arrayGold.push(obj.amount);
          } else if (obj.wallet === "silver") {
            arraySilver.push(obj.amount);
          }
        } else {
          const dropItem = document.createElement("figure");
          const dropItemTitle = document.createElement("figcaption");
          const dropItemChanceFrame = document.createElement("span");
          const dropItemChance = document.createElement("p");
          const dropItemImg = document.createElement("img");

          dropItemImg.src = obj.image;
          dropItemTitle.textContent = drops.item;
          dropItemChance.textContent = `${drops.dropChance * 100}%`;

          casesFrameItems.appendChild(dropItem);
          dropItem.appendChild(dropItemChanceFrame);
          dropItemChanceFrame.appendChild(dropItemChance);
          dropItem.appendChild(dropItemImg);
          dropItem.appendChild(dropItemTitle);
        }
      } else {
        const caseDescription = document.createElement("h1");
        caseDescription.textContent = drops.item;
        casesFrameItems.appendChild(caseDescription);
      }
    });

    if (arrayGold.length > 0) {
      const dropItem = document.createElement("figure");
      const dropItemTitle = document.createElement("figcaption");
      const dropItemImg = document.createElement("img");
      dropItemImg.classList.add("drop-image-wallet");
      dropItemImg.src =
        "https://cdn-icons-png.flaticon.com/512/8146/8146562.png";
      if (arrayGold.length > 1) {
        dropItemTitle.textContent = `${Math.min(...arrayGold)} - ${Math.max(
          ...arrayGold
        )}`;
        casesFrameItems.appendChild(dropItem);
        dropItem.appendChild(dropItemImg);
        dropItem.appendChild(dropItemTitle);
      } else {
        dropItemTitle.textContent = `${arrayGold[0]}`;
        casesFrameItems.appendChild(dropItem);
        dropItem.appendChild(dropItemImg);
        dropItem.appendChild(dropItemTitle);
      }
    }

    if (arraySilver.length > 0) {
      const dropItem = document.createElement("figure");
      const dropItemTitle = document.createElement("figcaption");
      const dropItemImg = document.createElement("img");
      dropItemImg.classList.add("drop-image-wallet");
      dropItemImg.src =
        "https://cdn-icons-png.flaticon.com/512/8894/8894963.png";
      if (arraySilver.length > 1) {
        dropItemTitle.textContent = `${Math.min(...arraySilver)} - ${Math.max(
          ...arraySilver
        )}`;
        casesFrameItems.appendChild(dropItem);
        dropItem.appendChild(dropItemImg);
        dropItem.appendChild(dropItemTitle);
      } else {
        dropItemTitle.textContent = `${arraySilver[0]}`;
        casesFrameItems.appendChild(dropItem);
        dropItem.appendChild(dropItemImg);
        dropItem.appendChild(dropItemTitle);
      }
    }

    const openCaseButton = document.createElement("button");
    openCaseButton.classList.add("openCase-button");
    openCaseButton.textContent = "Открыть кейс";
    if (box.disabled) {
      openCaseButton.disabled = true;
    } else {
      openCaseButton.onclick = () => {
        var result = drop(box);
        hintUser(result);
        newHint(result);
      };
    }

    frameContent.appendChild(openCaseButton);
  }

  const drop = (box) => {
    const player = JSON.parse(localStorage.getItem("playerData"));
    if (box.free) {
      let result = boxOpener(box);
      console.log(result);
      if (result.type === "resource") {
        if (result.wallet === "silver") {
          player.silver += result.amount;
          localStorage.setItem("playerData", JSON.stringify(player));
          return `Вам выпало ${result.amount} серебра`;
        } else if (result.wallet === "gold") {
          player.gold += result.amount;
          localStorage.setItem("playerData", JSON.stringify(player));
          return `Вам выпало ${result.amount} голды`;
        }
      }
    } else if (box.resource === "gold") {
      if (player.gold < box.price) {
        return "Вам не хватает голды";
      } else {
        console.log("Коробка куплена за голду");
        player.gold -= box.price;
        let result = boxOpener(box);
        console.log(result);
        if (result.type === "tank") {
          if (player.items.find((item) => item.name === result.name)) {
            if (result.wallet === "gold") {
              player.gold += result.amount;
              localStorage.setItem("playerData", JSON.stringify(player));
              return `Вам выпал танк ${result.name}, но был компенсирован в размере: ${result.amount} золота`;
            } else {
              player.silver += result.amount;
              localStorage.setItem("playerData", JSON.stringify(player));
              return `Вам выпал танк ${result.name}, но был компенсирован в размере: ${result.amount} серебра`;
            }
          } else {
            player.items.push(result);
            localStorage.setItem("playerData", JSON.stringify(player));
            return `Вам выпал танк ${result.name}`;
          }
        }
      }
    } else if (box.resource === "silver") {
      if (player.silver < box.price) {
        return "Вам не хватает серебра";
      } else {
        player.silver -= box.price;
        let result = boxOpener(box);
        console.log(result);
        if (result.type === "resource") {
          if (result.wallet === "silver") {
            player.silver += result.amount;
            localStorage.setItem("playerData", JSON.stringify(player));
            return `Вам выпало ${result.amount} серебра`;
          } else if (result.wallet === "gold") {
            player.gold += result.amount;
            localStorage.setItem("playerData", JSON.stringify(player));
            return `Вам выпало ${result.amount} голды`;
          }
        }
      }
    }
    function boxOpener(box) {
      const lerp = (min, max, value) => (1 - value) * min + value * max;
      const total = box.dropItems.reduce(
        (accumulator, item) => accumulator + item.dropChance,
        0
      );
      const chance = lerp(0, total, Math.random());
      let current = 0;
      for (const choiceItem of box.dropItems) {
        if (current <= chance && chance < current + choiceItem.dropChance) {
          return allItems.find((item) => item.name === choiceItem.item);
        }
        current += choiceItem.dropChance;
      }
    }
  };

  Date.prototype.timeNow = function () {
    return (
      (this.getHours() < 10 ? "0" : "") +
      this.getHours() +
      ":" +
      (this.getMinutes() < 10 ? "0" : "") +
      this.getMinutes() +
      ":" +
      (this.getSeconds() < 10 ? "0" : "") +
      this.getSeconds()
    );
  };

  function hintUser(text) {
    if (!localStorage.getItem("playerHints")) {
      localStorage.setItem(
        "playerHints",
        JSON.stringify([{ dateStamp: new Date(), text: text }])
      );
    } else {
      let hints = JSON.parse(localStorage.getItem("playerHints"));
      hints.unshift({ dateStamp: new Date().timeNow(), text: text });
      localStorage.setItem("playerHints", JSON.stringify(hints));
    }
  }

  function authFrame() {
    const loginFrame = document.createElement("div");
    document.querySelector("main").appendChild(loginFrame);
    loginFrame.id = "login";
    const authBackground = document.createElement("div");
    authBackground.classList.add("auth-background");
    const authContent = document.createElement("div");
    authContent.classList.add("auth-content");
    const loginHeader = document.createElement("h1");
    loginHeader.textContent = "Регистрация";
    const userName = document.createElement("input");
    const subButton = document.createElement("button");
    userName.placeholder = "Имя пользователя";
    subButton.textContent = "Отправить";
    loginFrame.appendChild(authBackground);
    loginFrame.appendChild(authContent);
    authContent.appendChild(loginHeader);
    authContent.appendChild(userName);
    authContent.appendChild(subButton);
    subButton.onclick = () => {
      let inp = userName.value;
      if (inp.length > 0) {
        user = new Player(inp);
        console.log(user);
        localStorage.setItem("playerData", JSON.stringify(user));
        loginHeader.textContent = "Аккаунт создан";
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        loginHeader.textContent = "Имя аккаунта не может быть пустым";
      }
    };
  }
  function newHint(text) {
    let hintCont = document.querySelector(".hint-container");
    let hintTable = document.createElement("div");
    let hintText = document.createElement("p");

    hintText.textContent = text;

    hintCont.appendChild(hintTable);
    hintTable.appendChild(hintText);
    setTimeout(() => {
      hintTable.remove();
    }, 5000);
  }
};

game();
