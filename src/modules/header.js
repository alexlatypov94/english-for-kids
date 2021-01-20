export class Header {
    constructor() {
        this.isPlayModeChecked = false;
    }

    init() {
        this.render();
        this.initBurgerMenu();
        this.addEventListeners();
    }

    render() {
        document.body.insertAdjacentHTML(
            "beforeend",
            `
              <header>
                  <div class="container">
                      <div class = "header-content">
                          <div class = "burger-btn-wrapper" >
                              <button type = "button" class = "burger-btn"></button>
                          </div>
                          <h1 class = "header-title">English for kids</h1>
                          <lable class = "button-container">
                              <input class="check" type="checkbox">
                              <span class="check-move"></span>
                          </lable>
                      </div>
                  </div>
              </header>    
          `
        );
    }

    initBurgerMenu() {
        document.body.insertAdjacentHTML(
            "afterbegin",
            `
        <div class = "burger-menu">
            <div class = "shadow"></div>
            <div class = "burger-wrapper burger-trane">
                <div class = "burger-wrapper-scroll">
                    <ul class = "categories-list">
                        <li class = "category current-page" data-attribute = "menu"><img src = "assets/img/home-page.svg" alt = "">Main page</li>
                        <li class = "category" data-attribute = "tableware"><img src = "assets/img/tableware.svg" alt = "">Tableware</li>
                        <li class = "category" data-attribute = "furniture"><img src = "assets/img/couch.svg" alt = "">Furniture</li>
                        <li class = "category" data-attribute = "nature"><img src = "assets/img/seeding.svg" alt = "">Nature</li>
                        <li class = "category" data-attribute = "fruit"><img src = "assets/img/fruit.svg" alt = "">Fruit</li>
                        <li class = "category" data-attribute = "emotions"><img src = "assets/img/emotions.svg" alt = "">Emotions</li>
                        <li class = "category" data-attribute = "clothes"><img src = "assets/img/black-t-shirt.svg" alt = "">Clothes</li>
                        <li class = "category" data-attribute = "colours"><img src = "assets/img/palette.svg" alt = "">Colours</li>
                        <li class = "category" data-attribute = "weather"><img src = "assets/img/cloudy-day.svg" alt = "">Weather</li>
                        <li class = "category" data-attribute = "statistic"><img src = "assets/img/statistic.svg" alt = "">Statistic</li>
                    </ul>
                </div>
            </div>
            
            
        </div>
        `
        );
    }

    addEventListeners() {
        const buttonWrapperEl = document.querySelector(".burger-btn-wrapper");
        (buttonWrapperEl && buttonWrapperEl).addEventListener("click", this.onButtonWrapperClick);
    }

    onButtonWrapperClick() {
        const burgerBtn = document.querySelector(".burger-btn");
        const burgerMenu = document.querySelector(".burger-menu");

        burgerBtn.classList.toggle("burger-btn-active");
        burgerMenu.classList.toggle("burger-menu-active");
        document.body.style.overflow = burgerBtn.classList.contains("burger-btn-active") ? "hidden" : "visible";
    }

    onTogglePlayMode() {
        this.switchBtn = this.switchBtn || document.querySelector(".check");

        this.isPlayModeChecked
            ? this.switchBtn && this.switchBtn.removeAttribute("checked")
            : this.switchBtn && this.switchBtn.setAttribute("checked", "checked");
        this.isPlayModeChecked = !this.isPlayModeChecked;
    }

    onBurgerMenuMode(wrapper) {
        this.burgerMenu = this.burgerMenu || document.querySelector(".burger-wrapper");
        this.switchButton = this.switchButton || document.querySelector(".check");

        if (wrapper.classList.contains("menu") && this.switchButton.hasAttribute("checked")) {
            this.burgerMenu.classList.remove("burger-trane");
            this.burgerMenu.classList.add("burger-play");
        } else {
            this.burgerMenu.classList.remove("burger-play");
            this.burgerMenu.classList.add("burger-trane");
        }

        if (wrapper.classList.contains("play")) {
            this.burgerMenu.classList.remove("burger-trane");
            this.burgerMenu.classList.add("burger-play");
        }
        if (wrapper.classList.contains("train")) {
            this.burgerMenu.classList.add("burger-trane");
            this.burgerMenu.classList.remove("burger-play");
        }
    }

    onBurgerMenuModeStatistic(wrapper) {
        this.burgerMenu = this.burgerMenu || document.querySelector(".burger-wrapper");
        this.switchButton = this.switchButton || document.querySelector(".check");

        if (wrapper.classList.contains("stat") && this.switchButton.hasAttribute("checked")) {
            this.burgerMenu.classList.remove("burger-trane");
            this.burgerMenu.classList.add("burger-play");
        } else {
            this.burgerMenu.classList.remove("burger-play");
            this.burgerMenu.classList.add("burger-trane");
        }
    }
}
