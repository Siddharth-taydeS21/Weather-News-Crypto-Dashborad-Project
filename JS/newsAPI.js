// ============================= EXPORTS AND IMPORTS ==============================
export { getNews, getCategoryNews, fetchNextPage, NewsClicks, nKey };
import { isCategoryNewsLoading, isNewsSectionLoading, addBreakingNews, addTopHeadlines, addNextCategoryNews, addCategoryNews } from "./newsUI.js";

const nKey = import.meta.env.VITE_NEWS_API_KEY;


// Global Variable for avoiding the misuse of show more button clicks
const NewsClicks = {
    SportsCategoryNewsClicks: 0,
    TechCategoryNewsClicks: 0,
    BusinessCategoryNewsClicks: 0
}

const fetchNextPage = (str1, str, HtmlContainer, obj) => {
    const showMoreBtnID = `${str}_show_moreBtn`;
    const showMoreBtn = document.getElementById(showMoreBtnID);

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', async () => {

            if (str === 'sports') {
                NewsClicks.SportsCategoryNewsClicks++;
            }
            if (str === 'technology') {
                NewsClicks.TechCategoryNewsClicks++;
            }
            if (str === 'business') {
                NewsClicks.BusinessCategoryNewsClicks++;
            }

            const BtnWrapper = HtmlContainer.lastElementChild;
            if (BtnWrapper) {
                BtnWrapper.remove()
            }

            isCategoryNewsLoading(HtmlContainer, 'load', 'HTMLcontainer-NotEmpty')

            const nextPage = obj.nextPage;

            try {
                const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${nKey}&q=${str1}&category=${str}&size=10&page=${nextPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch news data!');
                }
                const News_Data = await response.json();

                // ADDING NEXT BATCH OF NEWS TO UI ====
                addNextCategoryNews(News_Data, HtmlContainer, str)

                fetchNextPage(str1, str, HtmlContainer, News_Data);

            } catch (error) {
                //alert("Could not load data. Please try again later.");
                isCategoryNewsLoading(HtmlContainer, 'error', 'HTMLcontainer-NotEmpty')
            }

        })
    }
}

const getCategoryNews = async (str, category, HtmlContainer) => {
    // category news Loading state ---
    isCategoryNewsLoading(HtmlContainer, 'load', 'HTMLcontainer-Empty');

    try {
        const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${nKey}&q=${str}&category=${category}&size=10`);
        if (!response.ok) {
            throw new Error('Failed to fetch news data!');
        }

        const data = await response.json();

        // GIVING FETCHED DATA TO RENDER ON UI
        addCategoryNews(data, HtmlContainer, category);
        
        // IF WE WANTED TO FETCH NEXT BATCH OF NEWS 
        fetchNextPage(str, category, HtmlContainer, data);


    } catch (error) {
        //alert("Could not load data. Please try again later.");
        isCategoryNewsLoading(HtmlContainer, 'error', 'HTMLcontainer-Empty')
    }
}

const getNews = async (str) => {
    // ===========  LOADING STATE FOR WEATHER SECTION  ============
    isNewsSectionLoading('load');
    try {
        const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${nKey}&qInTitle=${str}`);
        if (!response.ok) {
            throw new Error('Failed to fetch news data!');
        }

        const data = await response.json();
        addBreakingNews(data);

        const nextPage = data.nextPage;
        addTopHeadlines(str, data, nextPage);

    } catch (error) {
        //alert("Could not load data. Please try again later.");
        isNewsSectionLoading('error');
    }
}