
const images = [    
    {src: "home_de.webp", text_de: "Home", text_en: "Home"},
    {src: "timetable_de.webp", text_de: "Stundenplan", text_en: "Timetable"},
    {src: "timetable2_de.webp", text_de: "Stundenplan", text_en: "Timetable"},
    {src: "map_de.webp", text_de: "Karte", text_en: "Map"},
    {src: "food_de.webp", text_de: "Essen", text_en: "Food"},
    {src: "news_de.webp", text_de: "THI News", text_en: "THI News"},
    {src: "sports_de.webp", text_de: "Hochschulsport", text_en: "University Sports"},
    {src: "roomsearch_de.webp", text_de: "Raumsuche", text_en: "Room Search"},
    {src: "dates_de.webp", text_de: "Semester Termine", text_en: "Semester Dates"},
];

let language = 'de';

let intervalTime = 5;

const frame = false;



let currentIndex = 0;
let progressBars;



function init() {
    read_time_from_url();

    document.documentElement.style.setProperty('--animation_time', `${intervalTime}s`)

    if(frame) {document.getElementById('frame_img').style.removeProperty('display');}

    summon_progressbars();

    progressBars = document.querySelectorAll('.progressbar');

    updateSlideshow();
    setInterval(updateSlideshow, intervalTime * 1000);
}
init();


function read_time_from_url() {
    var url_vars = window.location.search.split('?')[1];
    if(url_vars != undefined){
        url_vars = url_vars.split("&");
        for (let index = 0; index < url_vars.length; index++) {
            if(url_vars[index].split('=')[0] == "time"){
                intervalTime = url_vars[index].split('=')[1];
            }
            if(url_vars[index].split('=')[0] == "lang"){
                language = url_vars[index].split('=')[1];
            }
            if(url_vars[index].split('=')[0] == "language"){
                language = url_vars[index].split('=')[1];
            }
        }
    }
}

function summon_progressbars() {
    for (let index = 0; index < images.length; index++) {
        const code = `<div class="progressbar"> <div> <div></div> </div> </div>`;
        document.getElementById('progressbar_container').insertAdjacentHTML('beforeend', code);
    }
}

function updateSlideshow() {
    const imageElement = document.getElementById('slideshowimage');
    const textElement = document.getElementById('imagetext');

    imageElement.src = `imgs/${images[currentIndex].src}`;
    textElement.textContent = images[currentIndex][`text_${language}`];

    if(currentIndex == 0) {
        progressBars.forEach((bar) => {
            bar.classList.remove('progressbar_current');
        });

        void progressBars[0].offsetWidth;
    }

    progressBars.forEach((bar, index) => {
        if(index == currentIndex) {
            bar.classList.add('progressbar_current');
        } else if(index > currentIndex) {
            bar.classList.remove('progressbar_current');
        }
    });

    currentIndex = (currentIndex + 1) % images.length;
}