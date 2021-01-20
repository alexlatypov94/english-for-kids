import { updateStatHelper } from "../utils/update-stat-helper.util";
import { MainMenu } from "./main-menu";
import { CARDS_LENGTH } from "./constants";

export * from "./main-menu";
export class PlayMode {
    constructor() {
        this.counterAudio = 0;
        this.resultArr = [];
        this.clicks = 0;
        this.winClicks = CARDS_LENGTH;
        this.data = null;
        this.failClick = 0;
        this.localStat = null;
        this.modyfiedObj = null;
    }

    init(arr, wrapper, data) {
        this.resetConstructor();
        this.data = data || null;
        if (data === null || Array.isArray(data)) {
            this.initCategoryTitle(wrapper);
        } else {
            wrapper.insertAdjacentHTML(
                "beforeend",
                `
                 <h1 class = "category-current-title">${data}</h1>
            `
            );
        }

        wrapper.insertAdjacentHTML(
            "beforeend",
            `
        <div class = "star-wrapper">
            <div class = "star"></div>
        </div>
        `
        );
        arr.forEach((element) => {
            wrapper.insertAdjacentHTML(
                "beforeend",
                `
            <div class = "card play-mode hover-condition">
                <div class = "true-answer">
                    <img src = "assets/img/check-mark.svg">
                </div>
                <img class = "train-img" src = "${element.imgSrc || element.img}">
            </div>
        `
            );
        });
        this.localStat = JSON.parse(localStorage.getItem("statistic"));
        this.modyfiedObj = Object.entries(this.localStat);
        this.winClicks = arr.length;

        if (arr.length === 0) {
            return;
        }

        wrapper.insertAdjacentHTML("beforeend", `<button class = "play-words" type = "button">Start game</button>`);
        const buttonAudio = document.querySelector(".play-words");
        this.shuffleAudioSrc(arr, buttonAudio);
    }

    initCategoryTitle(wrapper) {
        wrapper.insertAdjacentHTML(
            "beforeend",
            `
        <h1 class = "category-current-title">repeat difficult words</h1>
    `
        );
    }

    shuffleAudioSrc(arr, buttonAudio) {
        const audioSrcArray = [];
        arr.forEach((el) => {
            audioSrcArray.push(el.audioSrc || el.audio);
        });

        for (let i = audioSrcArray.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [audioSrcArray[i], audioSrcArray[j]] = [audioSrcArray[j], audioSrcArray[i]];
        }

        buttonAudio.addEventListener("click", () => {
            this.playSound(audioSrcArray, arr, buttonAudio);
        });
    }

    playSound(audioSrcArray, arr, btn) {
        const playButton = btn;
        const cards = document.querySelectorAll(".card");

        this.playSoundOnPicture(audioSrcArray);
        playButton.innerHTML = "Repeat";
        this.choosePicture(cards, audioSrcArray, arr);
    }

    choosePicture(cards, audioSrcArray, arr) {
        const star = document.querySelector(".star");
        cards.forEach((el, index) => {
            el.addEventListener("click", (event) => {
                event.stopImmediatePropagation();
                if (el.classList.contains("success")) {
                    return;
                }

                this.clicks += 1;

                if (
                    audioSrcArray[this.counterAudio] === arr[index].audioSrc ||
                    audioSrcArray[this.counterAudio] === arr[index].audio
                ) {
                    this.changeStatisticCorrect(audioSrcArray);
                    this.playSoundSuccess(el, index, audioSrcArray, star);
                } else {
                    this.changeStatisticWrong(audioSrcArray);
                    this.playSoundFailure(star);
                }
            });
        });
    }

    playSoundSuccess(card, index, audioSrcArray, star) {
        star.insertAdjacentHTML(
            "beforeend",
            `
            <img src = "assets/img/star-win.svg">
        `
        );
        this.removeChild(star);
        this.resultArr.push(card);
        const trueAnswerActive = document.querySelectorAll(".true-answer");

        card.classList.add("success");
        trueAnswerActive[index].classList.add("success");
        card.classList.remove("hover-condition");

        const audioSuccess = new Audio();
        audioSuccess.src = "assets/audio/correct.mp3";
        audioSuccess.play();

        this.counterAudio += 1;

        setTimeout(() => {
            this.playSoundOnPicture(audioSrcArray);
        }, 1000);

        if (this.resultArr.length === this.winClicks) {
            this.isWin();
        }
    }

    playSoundFailure(star) {
        this.failClick += 1;
        star.insertAdjacentHTML(
            "beforeend",
            `
            <img src = "assets/img/star.svg">
        `
        );
        this.removeChild(star);
        const audioFailure = new Audio();
        audioFailure.src = "assets/audio/error.mp3";
        audioFailure.play();
    }

    playSoundOnPicture(audioSrcArray) {
        if (this.counterAudio === this.winClicks) {
            return;
        }
        const audio = new Audio();
        audio.src = audioSrcArray[this.counterAudio];
        setTimeout(() => {
            audio.play();
        });
    }

    removeChild(star) {
        const starBlockWidth = star.offsetWidth;
        const firstChildWidth = star.firstElementChild.offsetWidth;
        if (firstChildWidth * star.children.length > starBlockWidth) {
            star.firstElementChild.remove();
        }
    }

    isWin() {
        const star = document.querySelector(".star");
        const wrapper = document.querySelector(".wrapper");
        if (this.clicks === this.winClicks) {
            document.body.insertAdjacentHTML(
                "afterbegin",
                `
                <div class = "win finishes">
                    <img src = "assets/img/58.png">
                    
                </div>
                `
            );

            const audio = new Audio();
            audio.src = "assets/audio/success.mp3";
            audio.play();
            document.body.style.overflow = "hidden";
        } else {
            document.body.insertAdjacentHTML(
                "afterbegin",
                `
                 <div class = "fail finishes">
                    <img src = "assets/img/37.png">
                    <p class = "mistakes">you made ${this.failClick} mistakes</p>
                 </div>
                `
            );
            const audio = new Audio();
            audio.src = "assets/audio/failure.mp3";
            audio.play();
            document.body.style.overflow = "hidden";
        }

        const modalFinishes = document.querySelector(".finishes");

        modalFinishes.addEventListener("click", (event) => {
            if (!event.target.closest("img")) {
                modalFinishes.classList.add("hidden");
                modalFinishes.addEventListener("animationend", () => {
                    modalFinishes.remove();
                    document.body.style.overflow = "";
                    const mainMenu = new MainMenu();
                    wrapper.innerHTML = "";
                    star.remove();
                    mainMenu.initCards("play-mode");
                    wrapper.classList.remove("play");
                    wrapper.classList.add("menu");
                });
            }
        });

        localStorage.setItem("statistic", JSON.stringify(Object.fromEntries(this.modyfiedObj)));
    }

    changeStatisticCorrect(audioSrcArray) {
        this.modyfiedObj = updateStatHelper(this.modyfiedObj, audioSrcArray, "correct", true, this.counterAudio);
    }

    changeStatisticWrong(audioSrcArray) {
        this.modyfiedObj = updateStatHelper(this.modyfiedObj, audioSrcArray, "wrong", true, this.counterAudio);
    }

    resetConstructor() {
        this.counterAudio = 0;
        this.resultArr = [];
        this.clicks = 0;
        this.winClicks = CARDS_LENGTH;
        this.data = null;
        this.failClick = 0;
        this.localStat = null;
        this.modyfiedObj = null;
    }
}
