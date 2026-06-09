// ============================= EXPORTS AND IMPORTS ==============================
export { forMatSunTime, turnCateText, getNewsImageSrc, renderNewsImg, getWeatherImageSrc, getWindSpeed };
const forMatSunTime = (unixSeconds, offsetSec) => {
    const date = new Date((unixSeconds + offsetSec) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, 0);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    return `${hours12}:${minutes} ${period}`;
    // console.log(date)
    // console.log(hours)
    // console.log(minutes)
}

const turnCateText = (str, limit) => {
    const maxLength = limit;
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str + '.';
}

const newsImageFallback = '/assets/Images/default_breaking_news_image.avif';
const getNewsImageSrc = (url) => url || newsImageFallback;

const renderNewsImg = (url, alt) => {
    return `<img src="${getNewsImageSrc(url)}" alt="${alt}" class="news-image object-cover object-center bg-no-repeat" onerror="this.onerror=null;this.src='${newsImageFallback}'">`;
}


// ==================== OBJECT OF WEATHER CONDITIONS AND WEATHER IMAGES ======================= 
const weatherImages = [
    { name: 'clearSky', src: '/assets/Images/clear_sky.avif' },
    { name: 'fewClouds', src: '/assets/Images/few_clouds.avif' },
    { name: 'scatteredClouds', src: '/assets/Images/scattered_clouds.jpg' },
    { name: 'brokenClouds', src: '/assets/Images/broken_clouds.avif' },
    { name: 'showerRain', src: '/assets/Images/shower_rain.webp' },
    { name: 'rain', src: '/assets/Images/rain.jpg' },
    { name: 'thunderstorm', src: '/assets/Images/thunderStorm.jpg' },
    { name: 'snow', src: '/assets/Images/snow.avif' },
    { name: 'mist', src: '/assets/Images/mist.avif' }
]

// =========== SETTING WEATHER IMAGES ACCORDING TO WEATHER STATUS CODES  =============
const defaultWeatherImage = '/assets/Images/sky_default_image.avif'
const getWeatherImageSrc = (statusCode) => {
    let conditionName = null

    if (statusCode >= 200 && statusCode <= 232) {
        conditionName = 'thunderstorm'
    } else if (statusCode === 511 || (statusCode >= 600 && statusCode <= 622)) {
        conditionName = 'snow'
    } else if (
        (statusCode >= 300 && statusCode <= 321) ||
        (statusCode >= 520 && statusCode <= 531 && statusCode !== 511)
    ) {
        conditionName = 'showerRain'
    } else if (statusCode >= 500 && statusCode <= 504) {
        conditionName = 'rain'
    } else if (statusCode >= 701 && statusCode <= 781) {
        conditionName = 'mist'
    } else if (statusCode === 800) {
        conditionName = 'clearSky'
    } else if (statusCode === 801) {
        conditionName = 'fewClouds'
    } else if (statusCode === 802) {
        conditionName = 'scatteredClouds'
    } else if (statusCode === 803 || statusCode === 804) {
        conditionName = 'brokenClouds'
    }

    const match = weatherImages.find((img) => img.name === conditionName)
    return match ? match.src : defaultWeatherImage
}

// =========== CONVERTING SPEED FROM METER PER SECOND TO MILES PER HUR AND KM/HOUR ===========
const getWindSpeed = (speed) => {
    const milesPerHours = speed * 2.237;
    const km_perHours = speed * 3.6;
    return `${Math.round(milesPerHours)} mph <br> (${Math.round(km_perHours)} km/h)`
}



// const showLoader = (HtmlContainer) => {
//     const images = HtmlContainer.querySelectorAll('.news-image');
//     if (images) {
//         images.forEach(img => {img.addEventListener("load", () => {
//                 parent = img.parentElement;
//                 const spinner = parent.querySelector('.spinner');
//                 spinner.classList.add("hidden");
//                 img.style.opacity = '100%';
//             })
//         });
//     }

//     const spinners = HtmlContainer.querySelectorAll('.spinner');
//     if (spinners) {
//         spinners.forEach(spinner => {
//             spinner.classList.add("hidden");
//             // console.log(spinner)
//         })
//     }



//     // const image = document.querySelectorAll('.news-image');
//     // const spinner = document.querySelector('.spinner');

//     // if (image) {
//     //     image.addEventListener("load", () => {
//     //         image.classList.replace('opacity-0', 'opacity-100');
//     //         spinner.classList.add("hidden");
//     //     });

//     //     image.addEventListener("error", () => {
//     //         spinner.classList.add("hidden");
//     //     });
//     // }
// }
