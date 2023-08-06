class PokemonTCGCatalog {
    constructor() {
        this.pageSize = 4;
        this.currentPage = 1;
        this.cards = [];
        this.newCards = [];
        this.catalog = null;
        this.button = null;
        this.loader = null;
        
        this.API = `https://api.pokemontcg.io`;
        this.API_VERSION = `v1`;
        this.API_RESOURCE = `cards`;
        
        this.API_ENDPOINT = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE}`;
        
        this.UiSelectors = {
            content: '[data-content]',
            button: '[data-button]',
            loader: '[data-loader]'
        };
    }
    
     initializeCatalog() {
        this.catalog = document.querySelector(this.UiSelectors.content);
        this.button = document.querySelector(this.UiSelectors.button);
        this.loader = document.querySelector(this.UiSelectors.loader);
         
         this.addEventListeners();
        
         this.pullCards();
    }
    
    addEventListeners() {
        this.button.addEventListener('click', () => this.pullCards());
    }
    
    async pullCards() {
        this.toogleShowElement(this.loader, this.button);
        const { cards } = await this.fetchData(`${this.API_ENDPOINT}?page=${this.currentPage}&pageSize=${this.pageSize}`);
        
         this.toogleShowElement(this.loader, this.button);
        
        this.cards = [...this.cards, ...cards];
        
        this.newCards = [...cards];
        
        this.createCatalog(this.newCards);
        
        this.currentPage++;
    }
    
    toogleShowElement(...elements) {
      elements.forEach(element => element.classList.toggle(`hide`));  
    }
    
    async fetchData(url) {
         const response = await fetch(url);
        const parsedResponse = await response.json();
        
        return parsedResponse;
    }
    
    createCatalog(cards) {
        this.catalog.insertAdjacentHTML('beforeend',[
            cards.map((card) => this.createCard(card)).join('')
        ]);
        }

    createCard({ name, number, imageUrl, supertype, subtype, rarity}) {
        return `
        <article class="card">
        <header class="card__header">
        <h2 class="card__heading">
        ${name}
                </h2>
                <p class="card__number">Nr: ${number}</p>
            </header>
            <img class="card__image" src="${imageUrl}" alt="${name}">
            <p class="card_description"><span class="bold">Supertype: </span>${supertype}</p>
            <p class="card_description"><span class="bold">Subtype: </span>${subtype}</p>
            <p class="card_description"><span class="bold">Rarity: </span> ${rarity}</p>
        </article>
        `;
    }
}

