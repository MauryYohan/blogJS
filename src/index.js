import "./assets/styles/styles.scss";
import "./index.scss";
const articleContainerElement = document.querySelector(".articles-container");

const createArticles = (articles) => {
    const articlesDOM = articles.map( (article) => {
        const articleDOM = document.createElement('div');
        articleDOM.classList.add('article');
        articleDOM.innerHTML = `
            <img src="${ article.img }" alt="profile">
            <h2>${ article.title }</h2>
            <p class="article-category">Categorie : ${ article.category }</p>
            <p class="article-author">Ecrit par : ${ article.author }</p>
        
            <p class="article-content">${ article.content }</p>
            <div class="article-actions">
                <button class="btn btn-danger" data-id=${ article._id }>Supprimer</button>
            </div>
        `;
        return articleDOM;
    });
    articleContainerElement.innerHTML = '';
    articleContainerElement.append(...articlesDOM);
    const deleteBtn = articleContainerElement.querySelectorAll('.btn-danger');
    deleteBtn.forEach ( button => {
        button.addEventListener('click', async evt => {
            try {
                const target = evt.target;
                const articleId = target.dataset.id;
                const response = await fetch("https://restapi.fr/api/article/" + articleId, 
                {
                    method: "DELETE"
                }); 
                const body = await response.json();
                getArticles();
                console.log(body);
            } catch(e) {
                console.error("error: ", e);
            }
               
        })
    })
    
}

const getArticles = async () => {
    try {
        const response = await fetch("https://restapi.fr/api/article");
        const articles = await response.json();
        console.log(articles);
        createArticles(articles);
    } catch (e) {
        console.error(e);
    }

}

getArticles();