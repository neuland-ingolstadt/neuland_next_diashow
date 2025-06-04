// Settings
// =======================================================================
// =======================================================================

const images = [    
    {src: "home.webp", text_de: "Home", text_en: "Home"},
    {src: "timetable.webp", text_de: "Stundenplan", text_en: "Timetable"},
    {src: "timetable2.webp", text_de: "Stundenplan", text_en: "Timetable"},
    {src: "map.webp", text_de: "Karte", text_en: "Map"},
    {src: "food.webp", text_de: "Essen", text_en: "Food"},
    {src: "news.webp", text_de: "THI News", text_en: "THI News"},
    {src: "sports.webp", text_de: "Hochschulsport", text_en: "University Sports"},
    {src: "roomsearch.webp", text_de: "Raumsuche", text_en: "Room Search"},
    {src: "dates.webp", text_de: "Semester Termine", text_en: "Semester Dates"},
];

let language = 'de'; // Default festlegen ['de', 'en'] in url: ?lang=en ODER ?language=en

let intervalTime = 5; // [Sekunden] in url: ?time=5 

const frame = false; // Bilder in iP frame


// Vars
// =======================================================================
// =======================================================================

let currentIndex = 0;
let progressBars;


// functions
// =======================================================================
// =======================================================================

function init() {
    read_time_from_url();

    document.documentElement.style.setProperty('--animation_time', `${intervalTime}s`)

    if(frame) {document.getElementById('frame_img').style.removeProperty('display');}

    summon_progressbars();

    progressBars = document.querySelectorAll('.progressbar');

    // Startet die Slideshow
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

    // Setzt das neue Bild und den neuen Text
    imageElement.src = `imgs/${language}/${images[currentIndex].src}`;
    textElement.textContent = images[currentIndex][`text_${language}`];

    // Setzt alle Progress Bars zurück
    if(currentIndex == 0) {
        progressBars.forEach((bar, index) => {
            bar.classList.remove('progressbar_current');
        });

        void progressBars[0].offsetWidth; // Dies erzwingt einen Reflow und startet die Animation neu
    }

    // Aktualisiert die Progress Bars
    progressBars.forEach((bar, index) => {
        if(index == currentIndex) {
            bar.classList.add('progressbar_current');
        } else if(index > currentIndex) {
            bar.classList.remove('progressbar_current');
        }
    });

    // Erhöht den Index für das nächste Bild
    currentIndex = (currentIndex + 1) % images.length;
}