var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n,r,i,a,o,s,c,l,u,d,f=e((()=>{j(),w(),n=document.getElementById(`Crypto_coin_card_template`),r=document.querySelector(`.crypto_cards_grid`),i=document.querySelector(`#Loading_crypto_card_template`),a=document.querySelector(`#Error_crypto_card_template`),o=e=>{if(e===`load`)for(let e=0;e<10;e++)r.append(i.content.cloneNode(!0));else e===`error`&&(r.innerHTML=``,r.append(a.content.cloneNode(!0)))},s=()=>{let e=JSON.parse(localStorage.getItem(`crypto_alerts`));if(e){let t=Object.entries(e);v.innerHTML=``,t.forEach(e=>{let t=document.createElement(`div`);t.classList.add(`flex`,`justify-between`,`items-center`),t.id=`remove`,t.dataset.remove=`${e[0]}`,t.innerHTML+=`
            <h1 class="font-semibold">${e[0].charAt(0).toUpperCase()+e[0].slice(1)} -- $${e[1].toLocaleString(`en-US`)}</h1>
            <button class="p-[.3rem_1rem] rounded-lg shadow-sm border border-gray-200" type="button">Remove</button>
            `,v.append(t)})}A(),document.querySelectorAll(`#remove`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.remove;e&&Object.entries(e).find(e=>{e[0]===n&&(delete S[e[0]],localStorage.setItem(`crypto_alerts`,JSON.stringify(S)),s())})})}),d()},c=e=>{r.innerHTML=``,e.forEach(e=>{let t=n.content.cloneNode(!0);t.querySelector(`#coin_img`).src=e.image;let i=t.querySelector(`.coin_name`);i.textContent=e.name,t.querySelector(`.coin_code`).textContent=e.symbol.toUpperCase(),t.querySelector(`.price .main_price`).textContent=`$${Math.ceil(e.current_price).toLocaleString(`en-US`)}`;let a=ae(e.price_change_percentage_24h);t.querySelector(`.price`).innerHTML+=a,t.querySelector(`.market_cap span:nth-child(2)`).textContent=`$${e.market_cap.toLocaleString(`en-US`)}`,i.dataset.name=`${e.id}`;let o=t.querySelector(`#alert`);o.dataset.filed=`${e.id}`;let s=t.querySelector(`.set_alert_btn`);s.dataset.alertBtn=`${e.id}`,r.append(t)}),l(),A()},l=()=>{r.querySelectorAll(`.set_alert_btn`).forEach(e=>{e.addEventListener(`click`,t=>{let n=e.dataset.alertBtn,r=`[data-name="${n}"]`;document.querySelector(r).textContent;let i=`[data-filed="${n}"]`,a=document.querySelector(i),o=Number(a.value);if(o<=0&&!o){alert(`please enter a valid number for alert amount..`);return}S[n]=o,localStorage.setItem(`crypto_alerts`,JSON.stringify(S)),a.value=``,s()})})},u=async e=>{if(!Notification in window){alert(`This browser does not support to show notifications.`);return}let t=await Notification.requestPermission();t===`granted`?new Notification(`Crypto Alert :`,{body:e}):t===`denied`&&(alert(`You will not be able to get important alert Notifications form Crypto Dashboard. Please Allow Notifications to precede`),Notification.requestPermission())},d=()=>{let e=JSON.parse(localStorage.getItem(`crypto_alerts`));e&&Object.entries(e).forEach(e=>{let t=e[0],n=e[1],r=x.find(e=>e.id===t).current_price;n>r&&(u(`${t}'s current Price is ${Math.ceil(r)}$, and Your Target was ${n}$, Target Reached! You can invest Now!`),setTimeout(()=>{delete S[t],localStorage.setItem(`crypto_alerts`,JSON.stringify(S)),s()},3e3))})}})),p,m=e((()=>{f(),w(),p=async()=>{o(`load`);try{let e=await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=15`,{headers:{accept:`application/json`,"x-cg-demo-api-key":`${h}`}});if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);(await e.json()).forEach(e=>{x.push(e)}),c(x),s()}catch{o(`error`)}}})),h,g,_,v,y,b,x,S,C,w=e((()=>{f(),m(),h=`CG-thCGGkV4ePKAt1xzwSibm9HA`,g=document.querySelector(`.refreshBtn`),_=document.querySelector(`.notificationBtn`),v=document.querySelector(`.crypto_alerts_list`),y=document.querySelector(`.clearBtn`),b=document.querySelector(`.crypto_cards_grid`),x=[],S=JSON.parse(localStorage.getItem(`crypto_alerts`)||`{}`),y.addEventListener(`click`,()=>{S={},localStorage.setItem(`crypto_alerts`,JSON.stringify(S)),s()}),C=()=>{!Notification in window||(Notification.permission===`granted`?_.textContent=`Notifications Enabled`:(_.textContent=`Enable Notifications`,_.addEventListener(`click`,async()=>{let e=await Notification.requestPermission();e===`granted`?_.textContent=`Notifications Enabled`:e===`denied`&&alert(`You will never receive Notification If you used alert in Crypto price tracker, if you want us to Notify on alerts then make sure to Allow Notifications`)})))},C(),g.addEventListener(`click`,()=>{x=[],b.innerHTML=``,p()}),setInterval(()=>{x=[],b.innerHTML=``,p()},6e4)})),T,E,D,ee,O,te,ne,k,re,ie,ae,A,j=e((()=>{w(),T=(e,t)=>{let n=new Date((e+t)*1e3),r=n.getUTCHours(),i=n.getUTCMinutes().toString().padStart(2,0),a=r>=12?`PM`:`AM`;return`${r%12||12}:${i} ${a}`},E=(e,t)=>{let n=t;return e.length>n?e.slice(0,n)+`...`:e+`.`},D=`/assets/default_breaking_news_image.avif`,ee=e=>e||D,O=(e,t)=>`<img src="${ee(e)}" alt="${t}" class="news-image object-cover object-center bg-no-repeat" onerror="this.onerror=null;this.src='${D}'">`,te=[{name:`clearSky`,src:`/assets/clear_sky.avif`},{name:`fewClouds`,src:`/assets/few_clouds.avif`},{name:`scatteredClouds`,src:`/assets/scattered_clouds.jpg`},{name:`brokenClouds`,src:`/assets/broken_clouds.avif`},{name:`showerRain`,src:`/assets/shower_rain.webp`},{name:`rain`,src:`/assets/rain.jpg`},{name:`thunderstorm`,src:`/assets/thunderStorm.jpg`},{name:`snow`,src:`/assets/snow.avif`},{name:`mist`,src:`/assets/mist.avif`}],ne=`/assets/sky_default_image.avif`,k=e=>{let t=null;e>=200&&e<=232?t=`thunderstorm`:e===511||e>=600&&e<=622?t=`snow`:e>=300&&e<=321||e>=520&&e<=531&&e!==511?t=`showerRain`:e>=500&&e<=504?t=`rain`:e>=701&&e<=781?t=`mist`:e===800?t=`clearSky`:e===801?t=`fewClouds`:e===802?t=`scatteredClouds`:(e===803||e===804)&&(t=`brokenClouds`);let n=te.find(e=>e.name===t);return n?n.src:ne},re=e=>{let t=e*2.237,n=e*3.6;return`${Math.round(t)} mph <br> (${Math.round(n)} km/h)`},ie=e=>Math.round(e*100)/100,ae=e=>{if(e>0)return`<h1 class="growth text-green-600">+${ie(e)}% (24h)</h1>`;if(e===0)return`<h1 class="growth">${e}% (24h)</h1>`;if(e===null)return`<h1 class="growth text-red-600">not available</h1>`;if(e<0)return`<h1 class=" text-red-600">${e.toFixed(2)}% (24h)</h1>`},A=()=>{if(v.children.length===0){y.textContent=`Add Alerts`;let e=document.createElement(`div`);e.classList.add(`no_alerts_div`,`w-full`,`grid`,`justify-center`,`gap-2`,`text-center`,`my-4`),e.innerHTML=`
        <h1 class="font-semibold">No Alerts added</h1>
        <p>Add an alert to preview</p>
        `,v.append(e)}else if(v.children.length>=1){y.textContent=`Clear All`,y.removeAttribute(`href`);let e=v.querySelector(`.no_alerts_div`);e&&e.remove()}}})),M,N,P,F,I,L,oe,R,se,ce,le,ue=e((()=>{j(),M=document.querySelector(`.main_weather_card`),N=document.getElementById(`weather_card_template`),P=document.getElementById(`weather_error_template`),F=document.querySelector(`.weather_highlights_cards`),I=document.getElementById(`weather_highlights_cards_template`),L=document.querySelector(`.weather_forecast`),oe=document.getElementById(`weather_forecasts_card_template`),L.querySelector(`.weather_forecast_container`),R=e=>{if(e===`load`){M.innerHTML=``;let e=N.content.cloneNode(!0);M.append(e),F.innerHTML=``;let t=I.content.cloneNode(!0);F.append(t),L.innerHTML=``;let n=oe.content.cloneNode(!0);L.append(n)}else e===`error`&&(M.innerHTML=``,M.append(P.content.cloneNode(!0)),F.innerHTML=``,F.append(P.content.cloneNode(!0)),L.innerHTML=``)},se=e=>{let{displayCityName:t,countryCode:n,mainTemp:r,feelsLikeTemp:i,weatherDescription:a,weatherStatusCode:o,maxTemp:s,minTemp:c}=e,l=k(o),u=a.replace(/ /g,`<br>`);M.innerHTML=``,M.innerHTML=`
                            <div class="weather_image_container bg-black flex flex-col gap-y-3 justify-between overflow-hidden p-3 rounded-xl relative h-[250px] md:h-[80%]">
                                <img src="${l}" alt="${a}" class="absolute top-0 left-0 h-full w-full bg-center bg-cover bg-no-repeat object-cover mask-b-from-60% mask-b-to-100%">
                                <div
                                    class="location w-[92%] flex justify-between items-center p-2 bg-gray-200 rounded-4xl absolute top-3 left-0 right-0 mx-auto">
                                    <span id="city" class="ml-3">${t}</span>
                                    <span id="country" class="bg-blue-300 p-[.25rem_.5rem_.25rem_1rem] rounded-3xl">
                                        ${n}
                                        <i class="ri-map-pin-fill"></i>
                                    </span>
                                </div>
                                <div class="temperature text-5xl font-bold md:text-6xl lg:text-7xl text-white text-shadow-xs/50 absolute left-4 bottom-3">${Math.round(r)}°</div>
                                <div class="weather_description text-white flex flex-col text-end text-sm text-shadow-xs absolute right-4 bottom-3">
                                    <h2 class="text-xl lg:text-2xl lg:font-bold capitalize">${u}</h2>
                                    <span id="feels_like_temp">Feels like : ${Math.round(i)}°</span>
                                </div>
                            </div>

                            <div class="detail_badges text-sm flex gap-3 items-end md:h-[20%]">
                                <span class="max_temp bg-red-200 px-2 py-1 rounded-2xl">MAX-TEMP: ${Math.round(s)}°</span>
                                <span class="min_temp bg-blue-200 px-2 py-1 rounded-2xl">MIN-TEMP: ${Math.round(c)}°</span>
                            </div>           
    `},ce=e=>{let{sunRiseTime:t,sunSetTime:n,humidity:r,windSpeed:i}=e;F.innerHTML=`
                            <h1 class="highlights_main_text text-center text-3xl lg:text-4xl font-bold">Todays Highlights</h1>
                             <div class="highlights_cards_container grid gap-4 grid-cols-2 w-full">
                                 <article class="highlight_card">
                                     <div id="item_image" class="w-20 mx-auto">
                                         <img src="/assets/sun-rise.png" alt="image">
                                     </div>
                                     <div>
                                         <h2>Sun-rise: </h2>
                                         <span id="sunrise">${t}</span>
                                     </div>
                                 </article>

                                 <article class="highlight_card">
                                     <div id="item_image" class="w-22 mx-auto">
                                         <img src="/assets/sun-set.png" alt="image">
                                     </div>
                                     <div>
                                         <h2>Sun-set: </h2>
                                         <span id="sunset">${n}</span>
                                     </div>
                                 </article>

                                 <article class="highlight_card">
                                     <div id="item_image" class="w-18 mx-auto">
                                         <img src="/assets/humidity.png" alt="image">
                                     </div>
                                     <div>
                                         <h2>Humidity: </h2>
                                         <span id="humidity">${r}%</span>
                                     </div>
                                 </article>

                                 <article class="highlight_card">
                                     <div id="item_image" class="w-19 mt-2 mx-auto">
                                         <img src="/assets/wind-speed.png" alt="image">
                                     </div>
                                     <div>
                                         <h2>Wind speed: </h2>
                                         <span id="windSpeed">${re(i)}</span>
                                     </div>
                                 </article>
                             </div>
    `},le=e=>{let t=L.querySelector(`button`);t&&(t.outerHTML=`<h1 class="weather_forecast_title my-2 text-3xl md:text-4xl mb-2 md:mb-4 font-extrabold">Next 5 days weather forecast</h1>`);let n=L.querySelector(`.weather_forecast_container`);n.innerHTML=``,e.forEach((e,t)=>{let r=e.dt,i=``,a=new Date(r*1e3);i=t===0?`Today`:a.toLocaleDateString(`en-US`,{weekday:`long`});let o=Math.round(e.main.temp),s=e.weather[0].description.replace(/ /g,`<br>`),c=e.weather[0].id;t===0?n.innerHTML+=`
                        <article class="forecast_card bg-amber-100">
                            <p class="card_date">${i}</p>
                            <div class="weather_image_container">
                            <img src="${k(c)}" alt="image" class="weather_img">
                            </div>
                            <div class="weather_container">
                                <p class="main_temp">${o}°</p>
                                <p class="weather_description">${s}</p>
                            </div>
                        </article>          
           `:n.innerHTML+=`
                        <article class="forecast_card">
                            <p class="card_date">${i}</p>
                            <div class="weather_image_container">
                            <img src="${k(c)}" alt="image" class="weather_img">
                            </div>
                            <div class="weather_container">
                                <p class="main_temp">${o}°</p>
                                <p class="weather_description">${s}</p>
                            </div>
                        </article>

           `})}})),z,B,V,H,U,W,G,K,de,fe,pe=e((()=>{j(),he(),ue(),z=document.querySelector(`.top_headlines_container`),B=document.getElementById(`Error_crypto_card_template`),V=document.getElementById(`Error_TopHeadlines_card_template`),H=e=>{if(e===`load`){let e=document.querySelector(`.breaking_news`);e.innerHTML=``;let t=document.getElementById(`breaking_news_template`).content.cloneNode(!0);e.append(t),z.innerHTML=``;let n=document.getElementById(`Top_headlines_template`).content.cloneNode(!0);z.append(n)}else if(e===`error`){let e=document.querySelector(`.breaking_news_content`),t=document.querySelector(`.braking_news_Title`);t.textContent=`Breaking News`,e.innerHTML=``,e.append(B.content.cloneNode(!0)),z.innerHTML=``,z.append(B.content.cloneNode(!0))}},U=(e,t,n)=>{let r=document.getElementById(`category_news_template`).content.cloneNode(!0);t===`load`&&n===`HTMLcontainer-Empty`?(e.innerHTML=``,e.append(r)):t===`load`&&n===`HTMLcontainer-NotEmpty`?e.append(r):t===`error`&&n===`HTMLcontainer-Empty`?(e.innerHTML=``,e.append(B.content.cloneNode(!0))):t===`error`&&n===`HTMLcontainer-NotEmpty`&&(e.querySelectorAll(`.news_card_loaders`).forEach(e=>e.remove()),e.append(B.content.cloneNode(!0)))},W=0,G=(e,t,n,r)=>{let i=document.querySelector(`.top_headlines_container`);r||(i.innerHTML=``);let a=document.querySelectorAll(`.news_slide_loaders`);a&&a.forEach(e=>{e.remove()}),t.results.forEach(e=>{e.duplicate||(i.innerHTML+=`
                            <article class="news_slide">
                                <div class="headline_image">
                                    ${O(e.image_url,`news image`)}
                                </div>
                                <div class="headline_title">
                                    <a href='${e.link}' target="_blank" id="headline_title_text" class="overflow-clip font-bold">${E(e.title,50)}</a>
                                </div>
                            </article>
        `)}),!(W>=4)&&(i.innerHTML+=`
                        <div class="btnWrapper rounded-2xl my-8 flex justify-center items-center">
                            <button class="top_headlines_showMoreBtn bg-blue-400 h-10 w-40 rounded-2xl flex justify-center items-center">Show More..>></button>
                        </div>
    `,document.querySelector(`.top_headlines_showMoreBtn`).addEventListener(`click`,async t=>{W+=1;let r=document.querySelector(`.btnWrapper`);r&&r.remove();let a=document.getElementById(`Top_headlines_template`).content.cloneNode(!0);i.append(a);try{let t=`https://newsdata.io/api/1/latest?apikey=${q}&q=${e}&size=10&page=${n}`,r=await(await fetch(t)).json();G(e,r,r.nextPage,`true`)}catch{i.append(V.content.cloneNode(!0))}}))},K=e=>{let t=document.querySelector(`.breaking_news`);t.innerHTML=`
                        <h1 class="braking_news_title">Breaking News</h1>
                        <div
                            class="breaking_news_content  w-full h-[440px] flex flex-col justify-between bg-white shadow-md border border-gray-200 p-3 rounded-2xl">
                            <div
                                class="breaking_news_image w-full h-[300px] bg-gray-400 rounded-xl mb-4 overflow-hidden">
                                ${O(e.results[0].image_url,`news Image`)}
                            </div>
                            <a href="${e.results[0].link}"
                                class="breaking_news_title font-bold text-lg transition-all duration-300 hover:underline" target="_blank">
                                ${E(e.results[0].title,140)}
                            </a>

                        </div>
    `},de=(e,t,n)=>{document.querySelectorAll(`.news_card_loaders`).forEach(e=>{e.remove()}),e.results.forEach(e=>{e.duplicate||(t.innerHTML+=`
                            <article class="news_card">
                                 <div class="news_image">
                                    ${O(e.image_url,`image`)}
                                </div>
                                <a href='${e.link}' class="news_title" target="_blank">
                                    ${E(e.title,80)}
                                </a>
                            </article>
            `)}),!(n===`sports`&&J.SportsCategoryNewsClicks>=4)&&(n===`technology`&&J.TechCategoryNewsClicks>=4||n===`business`&&J.BusinessCategoryNewsClicks>=4||(t.innerHTML+=`
                                        <div class="showMore rounded-2xl flex justify-center items-center py-12">
                                            <button class="bg-blue-400 h-10 w-40 rounded-2xl flex justify-center items-center" id="${n}_show_moreBtn">Show More..>></button>
                                        </div>
                                        `))},fe=(e,t,n)=>{if(t.innerHTML=``,e.results.length===0){t.innerHTML=`
                                <div class="text-xl lg:col-span-4 font-semibold text-center grid justify-center gap-2 my-20">
                                    <div
                                        class="icon_wrapper border p-7 text-3xl size-[70px] justify-self-center flex justify-center items-center rounded-full border-gray-200 shadow-sm mb-4">
                                        <i class="ri-error-warning-line text-3xl"></i>
                                    </div>
                                     0 News Articles Found For ${n.charAt(0).toUpperCase()+n.slice(1)} category in this City, <br> Please Try after some time..
                                </div>`;return}e.results.forEach(e=>{e.duplicate||(t.innerHTML+=`
                    <article class="news_card">
                        <div class="news_image">
                            ${O(e.image_url,`image`)}
                        </div>
                        <a href='${e.link}' class="news_title" target="_blank">
                            ${E(e.title,80)}
                        </a>
                    </article>
    `)}),t.innerHTML+=`
                    <div class="showMore rounded-2xl flex justify-center items-center my-20">
                        <button class="bg-blue-400 h-10 w-40 rounded-2xl flex justify-center items-center" id="${n}_show_moreBtn">Show More..>></button>
                    </div>
`}})),q,J,Y,X,me,he=e((()=>{pe(),q=`pub_ba4fb2f46c3342668ac6a7c7fb810055`,J={SportsCategoryNewsClicks:0,TechCategoryNewsClicks:0,BusinessCategoryNewsClicks:0},Y=(e,t,n,r)=>{let i=`${t}_show_moreBtn`,a=document.getElementById(i);a&&a.addEventListener(`click`,async()=>{t===`sports`&&J.SportsCategoryNewsClicks++,t===`technology`&&J.TechCategoryNewsClicks++,t===`business`&&J.BusinessCategoryNewsClicks++;let i=n.lastElementChild;i&&i.remove(),U(n,`load`,`HTMLcontainer-NotEmpty`);let a=r.nextPage;try{let r=await fetch(`https://newsdata.io/api/1/latest?apikey=${q}&q=${e}&category=${t}&size=10&page=${a}`);if(!r.ok)throw Error(`Failed to fetch news data!`);let i=await r.json();de(i,n,t),Y(e,t,n,i)}catch{U(n,`error`,`HTMLcontainer-NotEmpty`)}})},X=async(e,t,n)=>{U(n,`load`,`HTMLcontainer-Empty`);try{let r=await fetch(`https://newsdata.io/api/1/latest?apikey=${q}&q=${e}&category=${t}&size=10`);if(!r.ok)throw Error(`Failed to fetch news data!`);let i=await r.json();fe(i,n,t),Y(e,t,n,i)}catch{U(n,`error`,`HTMLcontainer-Empty`)}},me=async e=>{H(`load`);try{let t=await fetch(`https://newsdata.io/api/1/latest?apikey=${q}&qInTitle=${e}`);if(!t.ok)throw Error(`Failed to fetch news data!`);let n=await t.json();K(n);let r=n.nextPage;G(e,n,r)}catch{H(`error`)}}})),Z,Q,ge,_e,ve,ye,$,be,xe,Se,Ce=e((()=>{ue(),j(),he(),Z=`936f59080b7efe5b8b84c4b6dc4a8619`,Q=document.getElementById(`search_input`),ge=document.querySelector(`.sports_news_container`),_e=document.querySelector(`.tech_news_container`),ve=document.querySelector(`.business_news_container`),ye=e=>{let t=new Set,n=[];e.list.forEach(e=>{let r=e.dt_txt.split(` `)[0];t.has(r)||(t.add(r),n.push(e))}),le(n)},$=async e=>{let{lat:t,lon:n,cityName:r,wKey:i}=e,a=[t,n,r];localStorage.setItem(`Weather_coordinates`,JSON.stringify(a)),R(`load`);try{let e=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${n}&units=metric&appid=${i}`);if(!e.ok)throw Error(`Failed to fetch weather data!`);let a=await e.json(),o=a.city.name,s=a.city.country,c=a.list[0].main.temp,l=a.list[0].main.feels_like,u=a.list[0].weather[0].description,d=a.list[0].weather[0].id,f=a.list[0].main.temp_min,p=a.list[0].main.temp_max;se({displayCityName:o,countryCode:s,mainTemp:c,feelsLikeTemp:l,weatherDescription:u,weatherStatusCode:d,maxTemp:p,minTemp:f});let m=a.city.timezone,h=a.city.sunrise,g=a.city.sunset,_=a.list[0].main.humidity,v=a.list[0].wind.speed;ce({sunRiseTime:T(h,m),sunSetTime:T(g,m),humidity:_,windSpeed:v}),ye(a),Q&&(Q.value=``),me(r),X(r,`sports`,ge),X(r,`technology`,_e),X(r,`business`,ve)}catch{alert(`Could not load data. Please try again later.`),R(`error`)}},be=()=>{Q.addEventListener(`keydown`,async e=>{if(e.key!==`Enter`)return;e.preventDefault();let t=Q.value.trim();if(t)try{let e=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=1&appid=${Z}`);if(!e.ok)throw Error(`Failed to fetch weather data!`);let n=await e.json();if(!n.length){alert(`City not found. Please try another name.`);return}let r=n[0].lat,i=n[0].lon,a=n[0].name;$({lat:r,lon:i,cityName:a,wKey:Z})}catch{R(`error`)}finally{R(`false`)}})},xe=document.getElementById(`current_locationBtn`),Se=()=>{`geolocation`in navigator?navigator.geolocation.getCurrentPosition(e=>{let t=e.coords.latitude,n=e.coords.longitude;$({lat:t,lon:n,wKey:Z})}):alert(`Geolocation is not supported by this browser.`)},xe.addEventListener(`click`,Se)}));t((()=>{Ce(),m(),j();var e=document.getElementById(`toggle_button`),t=document.querySelector(`.nav_menu`),n=()=>{t.classList.toggle(`max-lg:left-[120%]`),t.classList.toggle(`max-lg:left-0`)};e.addEventListener(`click`,n);var r=document.getElementById(`close_button`);document.querySelectorAll(`.nav_link`).forEach(e=>{e.addEventListener(`click`,n)}),r.addEventListener(`click`,n);var i=`936f59080b7efe5b8b84c4b6dc4a8619`;(()=>{let e=JSON.parse(localStorage.getItem(`Weather_coordinates`));if(e){let t=e[0],n=e[1],r=e[2];$({lat:t,lon:n,cityName:r,wKey:i})}else return})(),be(),p(),A()}))();