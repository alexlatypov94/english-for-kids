export class Footer {
    initFooter() {
        document.body.insertAdjacentHTML(
            "beforeend",
            `
            <footer>
                <div class = "container">
                    <div class = "footer-content">
                        <a href = "https://github.com/alexlatypov94" class = "github-ref"><img src = "assets/img/github.svg" class = "github-img"></a>
                        <h2 class = "create-app-year">Aliaksei Latypau 2020</h2>
                        
                        <a href = "https://rs.school/js/" class = "course-ref"><img src = "assets/img/rs-school-js.svg" class = "course-logo"></a>
                    </div>
                </div>
            </footer>
        `
        );
    }
}
