export class Statistic {
    constructor() {
        this.isTriangleUp = false;
    }

    initStatistic(wrapper, sortLocal) {
        wrapper.insertAdjacentHTML(
            "beforeend",
            `
        <h1 class = "category-current-title">Statistics</h1>
        `
        );
        wrapper.insertAdjacentHTML(
            "beforeend",
            `
            <div class = "btn-wrapper">
                <button class = "reset-btn" type = "button">reset</button>
                <button class = "repeat-diff" type = "button">Repeat difficult words</button>
            </div>
        `
        );

        wrapper.insertAdjacentHTML(
            "beforeend",
            `
    <div class = "row row-sort">
        <a href ="#" class = "word word-sort" data-attribute = "word"><p>word</p><img class = "triangle" src = "assets/img/triangle.svg"></a>
        <a href ="#" class = "translate translate-sort" data-attribute = "trainClicks"><p>Train clicks</p><img class = "triangle" src = "assets/img/triangle.svg"></a>
        <a href ="#" class = "clicks clicks-sort"  data-attribute = "gameClicks"><p>Game clicks</p><img class = "triangle" src = "assets/img/triangle.svg"></a>
        <a href ="#" class = "correct correct-sort" data-attribute = "correct"><p>correct</p><img class = "triangle" src = "assets/img/triangle.svg"></a>
        <a href ="#" class = "wrong wrong-sort" data-attribute = "wrong"><p>wrong</p><img class = "triangle" src = "assets/img/triangle.svg"></a>
        <a href ="#" class = "percent percent-sort" data-attribute = "error"><p>%error</p><img class = "triangle" src = "assets/img/triangle.svg"></a>
    </div>
    <div class = "table-wrapper"></div>
        `
        );

        const tableWrapper = document.querySelector(".table-wrapper");

        this.initStatisticBody(tableWrapper, sortLocal);
    }

    initStatisticBody(tableWrapper, sortLocal) {
        let localWords = null;
        !sortLocal ? (localWords = JSON.parse(localStorage.getItem("statistic"))) : (localWords = sortLocal);

        Object.entries(localWords).forEach(([key, value]) => {
            tableWrapper.insertAdjacentHTML(
                "beforeend",
                `
            <div class = "category-title">${key}</div>
            `
            );

            value.forEach((element) => {
                tableWrapper.insertAdjacentHTML(
                    "beforeend",
                    `
                <div class = "row">
                    <div class = "word">${element.word}</div>
                    <div class = "translate">${element.trainClicks}</div>
                    
                    <div class = "clicks">${element.gameClicks}</div>
                    <div class = "correct">${element.correct}</div>
                    <div class = "wrong">${element.wrong}</div>
                    <div class = "percent">${element.error}</div>
                </div>
                `
                );
            });
        });

        const sortItem = document.querySelector(".row-sort");

        sortItem.addEventListener("click", (event) => {
            const imgTr = document.querySelectorAll(".triangle");
            imgTr.forEach((el) => {
                el.classList.remove("triangle-show");
            });

            const paramOfSort = event.target.closest("a").getAttribute("data-attribute");
            const imgTriangle = event.target.closest("a").lastChild;
            imgTriangle.classList.add("triangle-show");
            imgTriangle.classList.contains("rotate-triangle")
                ? imgTriangle.classList.remove("rotate-triangle")
                : imgTriangle.classList.add("rotate-triangle");

            if (event.target.closest("a")) {
                event.stopImmediatePropagation();
                this.sortByNumberOrAlphabet(tableWrapper, localWords, paramOfSort, event);
            }
        });
    }

    sortByNumberOrAlphabet(tableWrapper, localWords, param) {
        const tableWrapperBlock = tableWrapper;
        tableWrapperBlock.innerHTML = "";
        this.initStatisticBody(tableWrapperBlock, localWords);

        Object.values(localWords).forEach((item) => {
            this.isTriangleUp
                ? item.sort((a, b) => (a[param] > b[param] ? 1 : -1))
                : item.sort((a, b) => (a[param] > b[param] ? -1 : 1));
        });

        this.isTriangleUp = !this.isTriangleUp;
        tableWrapperBlock.innerHTML = "";

        this.initStatisticBody(tableWrapperBlock, localWords);
    }
}
