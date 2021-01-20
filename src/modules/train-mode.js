export class TrainMode {
    init(arr, wrapper, data) {
        if (data === "repeat difficult words" || Array.isArray(data)) {
            wrapper.insertAdjacentHTML(
                "beforeend",
                `
            <h1 class = "category-current-title">repeat difficult words</h1>
        `
            );
        } else {
            wrapper.insertAdjacentHTML(
                "beforeend",
                `
        <h1 class = "category-current-title">${data}</h1>
        `
            );
        }

        arr.forEach((element) => {
            wrapper.insertAdjacentHTML(
                "beforeend",
                `
                <div class = "card hover-condition">
                    
                    <div class = "en-view trane-mode">
                        <img class = "train-img" src = "${element.imgSrc || element.img}">
                        <div class = "title-block">
                            <h3 class = "mode-title">${element.en || element.word}</h3>
                            <button type = "button" class = "reverse-btn"><img class = "reverse-img" src = "assets/img/refresh.svg"></button>
                        </div>
                        <audio src = "${element.audioSrc || element.audio}"></audio>
                    </div>

                    <div class = "ru-view trane-mode">
                        <img class = "train-img" src = "${element.imgSrc || element.img}">
                        <div class = "title-block">
                            <h3 class = "mode-title">${element.ru || element.translate}</h3>
                        </div>
                    </div>
                    
                </div>`
            );
        });
    }

    reverse(cardEn) {
        cardEn.classList.add("active");
        cardEn.nextElementSibling.classList.add("active");
    }

    reverseOff(cardRu) {
        cardRu.firstElementChild.classList.remove("active");
        cardRu.lastElementChild.classList.remove("active");
    }

    playSound(cardEn) {
        cardEn.lastElementChild.play();
    }
}
