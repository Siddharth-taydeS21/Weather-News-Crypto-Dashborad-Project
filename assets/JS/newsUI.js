// ============================= EXPORTS AND IMPORTS ==============================
export { isNewsSectionLoading, isCategoryNewsLoading, addTopHeadlines, addBreakingNews, addNextCategoryNews, addCategoryNews };
import { renderNewsImg, turnCateText } from "./utils.js";
import { NEWS_API_KEY, NewsClicks } from "./newsAPI.js";
import { errorSvg } from "./wetherUI.js"
// ================================ LOADING STATES UI LOGIC FOR NEWS SECTION =================================
const topHeadlinesContainer = document.querySelector('.top_headlines_container');

const isNewsSectionLoading = (str) => {
    if (str === 'load') {
        // breaking news loading State --
        const breakingNewsCard = document.querySelector('.breaking_news');
        breakingNewsCard.innerHTML = '';
        const breakingNewsCardTemplate = document.getElementById('breaking_news_template');
        const loader = breakingNewsCardTemplate.content.cloneNode(true);
        breakingNewsCard.append(loader);

        // Top headlines section loading State --
        topHeadlinesContainer.innerHTML = '';
        const topHeadlinesContainerTemplate = document.getElementById('Top_headlines_template');
        const loader2 = topHeadlinesContainerTemplate.content.cloneNode(true);
        topHeadlinesContainer.append(loader2);
    } else if (str === 'error') {
        const BreakingNewsCard = document.querySelector('.breaking_news_content')
        const newsImage = BreakingNewsCard.querySelector('.breaking_news_image');
        newsImage.classList.remove('animate-pulse');
        newsImage.innerHTML = `${errorSvg}`;
        BreakingNewsCard.querySelectorAll('p').forEach(p => p.remove())

        const warning = document.createElement('h1');
        warning.classList.add('flex', 'flex-col', 'items-center', '-translate-y-[25px]')
        warning.innerHTML = `
        ${errorSvg}
        Error: News details not Available
        `
        BreakingNewsCard.append(warning);

        const HeadlinesLoaders = topHeadlinesContainer.querySelectorAll('.news_slide_loaders')
        HeadlinesLoaders.forEach(card => {
            card.querySelector('.headline_image').classList.remove('animate-pulse');
            const tilesBars = card.querySelector('.headline_title');
            tilesBars.querySelectorAll('p').forEach(p => p.remove());
            tilesBars.classList.remove('items-center')
            tilesBars.innerHTML = `
            ${errorSvg}
            <p>Data is not available..</p>
            `
        })
    }
};

const isCategoryNewsLoading = (HtmlContainer, str, str2) => {
    const HtmlContainerTemplate = document.getElementById('category_news_template');
    const loader = HtmlContainerTemplate.content.cloneNode(true);
    if (str === 'load' && str2 === 'HTMLcontainer-Empty') {
        HtmlContainer.innerHTML = '';
        HtmlContainer.append(loader);
    }
    else if (str === 'load' && str2 === 'HTMLcontainer-NotEmpty') {
        HtmlContainer.append(loader);
    }
    else if (str === 'error' && str2 === 'HTMLcontainer-Empty') {
        HtmlContainer.innerHTML = '';
        HtmlContainer.append(loader);

        // ERROR UI LOGIC
        const loaders = HtmlContainer.querySelectorAll('.news_card_loaders');
        loaders.forEach(card => {
            const image = card.querySelector('.loading_news_image')
            image.innerHTML = `${errorSvg}`;
            image.classList.add('flex', 'justify-center', 'items-center')
            image.classList.remove('animate-pulse');
            card.querySelectorAll('p').forEach(p => p.remove());
            const p = document.createElement('p');
            p.classList.add('flex', 'gap-2')
            p.innerHTML = `
            ${errorSvg} Data is not available, please try again later...
            `
            card.append(p);
        })
    }
    else if (str === 'error' && str2 === 'HTMLcontainer-NotEmpty') {
        HtmlContainer.append(loader);
        const loaders = HtmlContainer.querySelectorAll('.news_card_loaders');
        loaders.forEach(card => {
            const image = card.querySelector('.loading_news_image')
            image.innerHTML = `${errorSvg}`;
            image.classList.add('flex', 'justify-center', 'items-center')
            image.classList.remove('animate-pulse');
            card.querySelectorAll('p').forEach(p => p.remove());
            const p = document.createElement('p');
            p.classList.add('flex', 'gap-2')
            p.innerHTML = `
            ${errorSvg} Data is not available, please try again later...
            `
            card.append(p);
        })
    }
};

// GLOBAL VARIABLE FOR HANDLING SHOW MORE BUTTON OVERUSE
let headLineNewsClicks = 0;

const addTopHeadlines = (str, obj, nextPage, str2) => {

    const headlinesContainer = document.querySelector('.top_headlines_container')
    if (!str2) {
        headlinesContainer.innerHTML = '';
    };

    // REMOVING THE LOADER ARTICLES ====
    const articlesLoaders = document.querySelectorAll('.news_slide_loaders');
    if (articlesLoaders) {
        articlesLoaders.forEach(article => {
            article.remove();
        })
    }

    obj.results.forEach(news => {
        if (news.duplicate) return;

        headlinesContainer.innerHTML += `
                            <article class="news_slide">
                                <div class="headline_image">
                                    ${renderNewsImg(news.image_url, 'news image')}
                                </div>
                                <div class="headline_title">
                                    <a href='${news.link}' target="_blank" id="headline_title_text" class="overflow-clip font-bold">${turnCateText(news.title, 50)}</a>
                                </div>
                            </article>
        `;
    })
    // ADDING SHOW MORE BUTTON AT THE END 

    // RETURN IF THE USER CLICKS ON SHOW MORE NEWS BTN 4 TIMES --- 
    if (headLineNewsClicks >= 4) return;

    headlinesContainer.innerHTML += `
                        <div class="btnWrapper rounded-2xl my-8 flex justify-center items-center">
                            <button class="top_headlines_showMoreBtn bg-blue-400 h-10 w-40 rounded-2xl flex justify-center items-center">Show More..>></button>
                        </div>
    `;

    // ========= ADDING EVENT HANDLER TO THE SHOW MORE FOR FETCHING NEXT NEWS =========
    const showMoreBtn = document.querySelector('.top_headlines_showMoreBtn');

    showMoreBtn.addEventListener('click', async (e) => {
        headLineNewsClicks = headLineNewsClicks + 1;
        const btnWrapper = document.querySelector('.btnWrapper');
        if (btnWrapper) {
            // if the show more button was there --- remove it --
            btnWrapper.remove();
        };


        // Loading state for next articles when click event happens on show more button --
        const topHeadlinesContainerTemplate = document.getElementById('Top_headlines_template');
        const loader2 = topHeadlinesContainerTemplate.content.cloneNode(true);
        headlinesContainer.append(loader2);

        // ========== FETCHING NEXT BATCH OF TOP HEADLINES CONTAINER ==========
        const url = `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&q=${str}&size=10&page=${nextPage}`
        const response = await fetch(url);
        const newData = await response.json();
        console.log(newData);
        console.log(newData.nextPage);

        // =============  GIVING THE DATA TO FILL RENDER ON UI  ================
        addTopHeadlines(str, newData, newData.nextPage, 'true');
    })
}

const addBreakingNews = (obj) => {
    const breakingNewsCard = document.querySelector('.breaking_news');
    breakingNewsCard.innerHTML = `
                        <h1 class="braking_news_title">Breaking News</h1>
                        <div
                            class="breaking_news_content  w-full h-[440px] flex flex-col justify-between bg-white shadow-md border border-gray-200 p-3 rounded-2xl">
                            <div
                                class="breaking_news_image w-full h-[300px] bg-gray-400 rounded-xl mb-4 overflow-hidden">
                                ${renderNewsImg(obj.results[0].image_url, 'news Image')}
                            </div>
                            <a href="${obj.results[0].link}"
                                class="breaking_news_title font-bold text-lg transition-all duration-300 hover:underline" target="_blank">
                                ${turnCateText(obj.results[0].title, 140)}
                            </a>

                        </div>
    `;
    console.log(`${renderNewsImg(obj.results[0].image_url, 'news Image')}`)
}

const addNextCategoryNews = (obj, HTMLcontainer, str) => {

    const loaders = document.querySelectorAll('.news_card_loaders');
    loaders.forEach(article => {
        article.remove();
    })

    obj.results.forEach(news => {
        if (news.duplicate) return;

        HTMLcontainer.innerHTML += `
                            <article class="news_card">
                                 <div class="news_image">
                                    ${renderNewsImg(news.image_url, 'image')}
                                </div>
                                <a href='${news.link}' class="news_title" target="_blank">
                                    ${turnCateText(news.title, 80)}
                                </a>
                            </article>
            `;
    })
    // USER CAN ONLY USE THE SHOW MORE BUTTON 5 TIMES AFTER THAT HW WILL NOT SEE SHOW MORE BTN....
    if (str === 'sports' && NewsClicks.SportsCategoryNewsClicks >= 4) {
        return;
    }
    if (str === 'technology' && NewsClicks.TechCategoryNewsClicks >= 4) {
        return;
    }
    if (str === 'business' && NewsClicks.BusinessCategoryNewsClicks >= 4) {
        return;
    }
    else {
        HTMLcontainer.innerHTML += `
                                        <div class="showMore rounded-2xl flex justify-center items-center py-12">
                                            <button class="bg-blue-400 h-10 w-40 rounded-2xl flex justify-center items-center" id="${str}_show_moreBtn">Show More..>></button>
                                        </div>
                                        `
    }
}

const addCategoryNews = (obj, HtmlContainer, category) => {
    // ============= USING FETCHED DATA TO RENDER ON HTML ==============

    HtmlContainer.innerHTML = '';
    console.log(obj)
    if (obj.results.length === 0) {
        console.log(obj.results.length)
        HtmlContainer.innerHTML = `
                                <div class="text-xl lg:col-span-4 font-semibold text-center grid justify-center gap-2 my-20">
                                    <div
                                        class="icon_wrapper border p-7 text-3xl size-[70px] justify-self-center flex justify-center items-center rounded-full border-gray-200 shadow-sm mb-4">
                                        <i class="ri-error-warning-line text-3xl"></i>
                                    </div>
                                     0 News Articles Found For ${category.charAt(0).toUpperCase() + category.slice(1)} category in this City, <br> Please Try after some time..
                                </div>`;
                                     
        return;
    }
    obj.results.forEach((news) => {
        if (news.duplicate) return;

        HtmlContainer.innerHTML += `
                    <article class="news_card">
                        <div class="news_image">
                            ${renderNewsImg(news.image_url, 'image')}
                        </div>
                        <a href='${news.link}' class="news_title" target="_blank">
                            ${turnCateText(news.title, 80)}
                        </a>
                    </article>
    `;
    })


    HtmlContainer.innerHTML += `
                    <div class="rounded-2xl flex justify-center items-center">
                        <button class="bg-blue-400 h-10 w-40 rounded-2xl flex justify-center items-center" id="${category}_show_moreBtn">Show More..>></button>
                    </div>
`

}