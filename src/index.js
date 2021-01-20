import "./assets/css/style.scss";
import { Footer, Header, MainMenu, PlayMode, Statistic, TrainMode, WORDS, CARDS_LENGTH } from "./modules/index";
import { updateStatHelper } from "./utils/index";

const statictic = new Statistic();
const footer = new Footer();
const header = new Header();
const mainMenu = new MainMenu();
const trainMode = new TrainMode();
const playMode = new PlayMode();

header.init();
mainMenu.initMainMenu();
footer.initFooter();

const switchButton = document.querySelector(".check");
const switchRoad = document.querySelector(".check-move");
const burgerMenuBlock = document.querySelector(".burger-menu");
const wrapper = document.querySelector(".wrapper");
const burgerBtn = document.querySelector(".burger-btn");
let data = null;
let arrForRepeat = [];
let localJson = null;

function initLocalStorageStatistic() {
    const statisticObj = Object.keys(WORDS).reduce((acc, curr) => {
        const value = WORDS[curr].map((item) => {
            return {
                word: item.en,
                translate: item.ru,
                category: curr,
                audio: item.audioSrc,
                img: item.imgSrc,
                correct: 0,
                wrong: 0,
                gameClicks: 0,
                trainClicks: 0,
                error: "0.00"
            };
        });

        return {
            ...acc,
            [curr]: value
        };
    }, {});

    localStorage.setItem("statistic", JSON.stringify(statisticObj));
}

function changeBurgerCategoryStyle(item) {
    const burgerMenuCategories = document.querySelectorAll(".category");
    burgerMenuCategories.forEach((el) => {
        el.classList.remove("current-page");
        if (item.getAttribute("data-attribute") === el.getAttribute("data-attribute")) {
            el.classList.add("current-page");
        }
    });
}

function initGameMode(dataKey) {
    if (switchButton.hasAttribute("checked")) {
        wrapper.classList.remove("menu", "train");
        wrapper.classList.add("play");
        Array.isArray(dataKey)
            ? playMode.init(dataKey, wrapper, dataKey)
            : playMode.init(WORDS[dataKey], wrapper, dataKey);
    } else {
        wrapper.classList.remove("menu", "play");
        wrapper.classList.add("train");
        Array.isArray(dataKey)
            ? trainMode.init(dataKey, wrapper, dataKey)
            : trainMode.init(WORDS[dataKey], wrapper, dataKey);
    }
}

if (localStorage.getItem("statistic") === null) {
    initLocalStorageStatistic();
}

switchRoad.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");
    header.onTogglePlayMode();

    if (header.isPlayModeChecked) {
        if (wrapper.classList.contains("menu")) {
            cards.forEach((item) => {
                item.classList.remove("trane-mode");
                item.classList.add("play-mode");
            });
            header.onBurgerMenuMode(wrapper);
        } else if (wrapper.classList.contains("stat")) {
            header.onBurgerMenuModeStatistic(wrapper);
        } else {
            wrapper.innerHTML = "";
            arrForRepeat !== null ? initGameMode(arrForRepeat) : initGameMode(data);
            header.onBurgerMenuMode(wrapper);
        }
    } else if (wrapper.classList.contains("menu")) {
        cards.forEach((item) => {
            item.classList.remove("play-mode");
            item.classList.add("trane-mode");
        });
        header.onBurgerMenuMode(wrapper);
    } else if (wrapper.classList.contains("stat")) {
        header.onBurgerMenuModeStatistic(wrapper);
    } else {
        wrapper.innerHTML = "";
        arrForRepeat !== null ? initGameMode(arrForRepeat) : initGameMode(data);
        header.onBurgerMenuMode(wrapper);
    }
});

burgerMenuBlock.addEventListener("click", (event) => {
    const item = event.target.closest(".category");
    if (event.target.closest(".shadow")) {
        burgerMenuBlock.classList.remove("burger-menu-active");
        burgerBtn.classList.remove("burger-btn-active");
        document.body.style.overflow = "";
    }

    if (event.target.closest(".category")) {
        changeBurgerCategoryStyle(item);
    }

    if (item) {
        data = item.getAttribute("data-attribute");
    } else {
        return;
    }
    arrForRepeat = null;
    wrapper.innerHTML = "";
    burgerMenuBlock.classList.remove("burger-menu-active");
    burgerBtn.classList.remove("burger-btn-active");
    document.body.style.overflow = "";

    if (data === "menu") {
        if (switchButton.hasAttribute("checked")) {
            wrapper.classList.remove("train", "play", "stat");
            wrapper.classList.add("menu");
            mainMenu.initCards("play-mode");
        } else {
            wrapper.classList.remove("train", "play", "stat");
            wrapper.classList.add("menu");
            mainMenu.initCards();
        }
    }

    if (data === "statistic") {
        wrapper.classList.remove("menu", "play", "train");
        wrapper.classList.add("stat");

        localJson = JSON.parse(localStorage.getItem("statistic"));

        const newLocalJson = Object.keys(localJson).reduce((acc, curr) => {
            const cardGroups = localJson[curr].map((card) => {
                const gameClicks = card.correct + card.wrong;
                const cardError = (card.wrong / gameClicks) * 100;
                const isError = Number.isNaN(cardError) || cardError === 0;

                return {
                    ...card,
                    gameClicks,
                    error: isError ? "0.00" : cardError.toFixed(2)
                };
            });

            return {
                ...acc,
                [curr]: cardGroups
            };
        }, {});

        localStorage.setItem("statistic", JSON.stringify(newLocalJson));

        statictic.initStatistic(wrapper);
    }

    if (data !== "menu" && data !== "statistic") {
        wrapper.classList.remove("menu", "play", "train", "stat");
        initGameMode(data);
    }
});

wrapper.addEventListener("click", (event) => {
    let card = null;
    const cardEn = event.target.closest(".en-view");

    if (event.target.closest(".card") && wrapper.classList.contains("menu")) {
        const item = event.target.closest(".card");
        changeBurgerCategoryStyle(item);
        data = event.target.closest(".card").getAttribute("data-attribute");
        arrForRepeat = null;
        wrapper.innerHTML = "";
        initGameMode(data);
    }

    if (event.target.closest(".en-view")) {
        const targetCard = event.target.closest(".en-view");
        if (event.target.closest(".reverse-btn")) {
            trainMode.reverse(cardEn);
        } else {
            localJson = JSON.parse(localStorage.getItem("statistic"));
            trainMode.playSound(cardEn);
            const cardAudio = targetCard.lastElementChild.getAttribute("src");

            localStorage.setItem("statistic", JSON.stringify(localJson));

            const modifiedObjectEntries = Object.entries(localJson);

            const modifiedObject = Object.fromEntries(
                updateStatHelper(modifiedObjectEntries, cardAudio, "trainClicks", false)
            );

            localStorage.setItem("statistic", JSON.stringify(modifiedObject));
        }
    }

    if (event.target.closest(".card")) {
        card = event.target.closest(".card");

        const onLeaveCard = () => {
            trainMode.reverseOff(card);
            card.removeEventListener("mouseleave", onLeaveCard);
        };

        card.addEventListener("mouseleave", onLeaveCard);
    }

    if (event.target.closest(".reset-btn")) {
        wrapper.innerHTML = "";
        localStorage.removeItem("statistic");
        initLocalStorageStatistic();
        statictic.initStatistic(wrapper);
    }

    if (event.target.closest(".repeat-diff")) {
        localJson = JSON.parse(localStorage.getItem("statistic"));
        arrForRepeat = [];
        wrapper.innerHTML = "";
        wrapper.classList.remove("stat");

        Object.values(localJson).forEach((element) => {
            element.forEach((item) => {
                if (parseFloat(item.error) > 0) {
                    arrForRepeat.push(item);
                }
            });
        });

        if (arrForRepeat.length > CARDS_LENGTH) {
            arrForRepeat.sort((a, b) => (parseFloat(a.error) > parseFloat(b.error) ? -1 : 1));
            arrForRepeat = arrForRepeat.slice(0, CARDS_LENGTH);
        }
        if (switchButton.hasAttribute("checked")) {
            playMode.init(arrForRepeat, wrapper, "repeat difficult words");
            wrapper.classList.remove("train");
            wrapper.classList.add("play");
        } else {
            trainMode.init(arrForRepeat, wrapper, "repeat difficult words");
            wrapper.classList.remove("play");
            wrapper.classList.add("train");
        }
    }
});
