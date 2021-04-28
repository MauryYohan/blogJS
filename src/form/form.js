import "../assets/styles/styles.scss";
import './form.scss';

const form = document.querySelector('form');
const errorElement = document.querySelector('#errors');
let errors = [];

form.addEventListener('submit', async (evt) => {
    console.log(errorElement);
    evt.preventDefault();
    const Data = new FormData(form);
    const entries = Data.entries();
    const article = Object.fromEntries(entries);
    if (formIsValid(article)) {
        try {
            const articleJson = JSON.stringify(article);
            const response = await fetch('https://restapi.fr/api/article', {
                method: "POST",
                body: articleJson,
                headers: { "Content-Type": "application/json" }
            });

            const body = await response.json();
            console.log(body);
        } catch(e) {
            console.error('e: ', e);
        }

    }
});

const formIsValid = (article) => {
    errors = [];
    if(!article.author || !article.img || !article.category || !article.title || !article.content) {
        errors.push("Vous devez renseigner tous les champs");
    } else {
        errors = [];
    }
    if (errors.length) {
        let errorHTML = '';
        errors.forEach(element => {
            errorHTML += `<li>${ element }</li>`
        });
        errorElement.innerHTML = errorHTML;
        return false;
    } else {
        errorElement.innerHTML = '';
        return true;
    }
}
console.log("form");