export class MainMenu {
    initMainMenu() {
        document.body.insertAdjacentHTML(
            "beforeend",
            `
        <main>
            <div class = "container">
                <div class = "wrapper menu"></div>
            </div>
        </main>
        `
        );

        this.initCards();
    }

    initCards(mode) {
        let gameMode = mode;
        if (!mode) {
            gameMode = "trane-mode";
        }
        const wrapper = document.querySelector(".wrapper");

        wrapper.insertAdjacentHTML(
            "beforeend",
            `
            <h1 class = "category-current-title">Main menu</h1>
        `
        );

        wrapper.insertAdjacentHTML(
            "beforeend",
            `
         <div class = "card ${gameMode} hover-condition" data-attribute = "tableware">
            <img class = "card-img" src = "assets/img/tom&jery.png" alt = "">
            <h3 class = "card-title">Tableware</h3>
        </div>
        <div class = "card ${gameMode} hover-condition" data-attribute = "furniture">
            <img class = "card-img" src = "assets/img/furniture.png" alt = "">
            <h3 class = "card-title">furniture</h3>
        </div>
        <div class = "card ${gameMode} hover-condition" data-attribute = "nature">
            <img class = "card-img" src = "assets/img/nature.png" alt = "">
            <h3 class = "card-title">nature</h3>
        </div>
        <div class = "card ${gameMode} hover-condition" data-attribute = "fruit">
            <img class = "card-img" src = "assets/img/fruit.png" alt = "">
            <h3 class = "card-title">fruit</h3>
        </div>
        <div class = "card ${gameMode} hover-condition" data-attribute = "emotions">
            <img class = "card-img" src = "assets/img/emotions.png" alt = "">
            <h3 class = "card-title">Emotions</h3>
        </div>
        <div class = "card ${gameMode} hover-condition" data-attribute = "clothes">
            <img class = "card-img" src = "assets/img/closes.png" alt = "">
            <h3 class = "card-title">Clothes</h3>
        </div>
        <div class = "card ${gameMode} hover-condition" data-attribute = "colours">
            <img class = "card-img" src = "assets/img/colours.png" alt = "">
            <h3 class = "card-title">Colours</h3>
        </div>
        <div class = "card ${gameMode} hover-condition" data-attribute = "weather">
            <img class = "card-img" src = "assets/img/weather.png" alt = "">
            <h3 class = "card-title">weather</h3>
        </div>
        `
        );
    }
}
