let width = 0;
let height = 0;
let aspect = 0;
let winampWidth = 0;
let winampHeight = 0;
let winampAspect = 0;
let elm_winamp = null;

function getById(id) {
    return document.getElementById(id);
}
function getDimensions() {
    const mainWindow = getById("main-window");
    const playlistWindow = getById("playlist-window");
    const equalizerWindow = getById("equalizer-window");

    winampWidth = mainWindow.offsetWidth;
    winampHeight = mainWindow.offsetHeight + playlistWindow.offsetHeight + equalizerWindow.offsetHeight;
    width = window.innerWidth;
    height = window.innerHeight;
    winampAspect = winampHeight / winampWidth;
    aspect = height / width;

    elm_winamp = getById('webamp');
}
function resizeWinamp() {

    const window2winampWidthRatio = width / winampWidth;
    const window2winampHeightRatio = height / winampHeight;
    if (winampAspect > aspect) { // winamp is taller relative to how tall is the window
        const leftoverWidth = (width - winampWidth * window2winampHeightRatio) / 2;
        elm_winamp.style.transform =
            `translateX(${leftoverWidth}px)` +
            `scale(${window2winampHeightRatio})`;
    } else {
        // const leftoverHeight = (height - winampHeight * window2winampWidthRatio) / 2;
        elm_winamp.style.transform =
            // `translateY(${leftoverHeight}px)` +
            `scale(${window2winampWidthRatio})`;
    }
}

const Webamp = window.Webamp;
const webamp = new Webamp();
webamp.renderWhenReady(document.getElementById('winamp-container')).then(() => {
    getDimensions();
    resizeWinamp();
});

window.addEventListener('resize', () => {
    getDimensions();
    resizeWinamp();
})

window.addEventListener('message', function (event) {
    // Check the origin of the message for security purposes
    // if (event.origin !== 'http://localhost:3000') { // Replace with the parent window's origin
    //     return;
    // } TODO
    const { task, data } = event.data;

    switch (task) {
        case "setRandomSkin":
            webamp.setSkinFromUrl(data);
            break;
        case "setTraks":
            webamp.setTracksToPlay(data);
            break;       
    }
});



// webamp.setSkinFromUrl('https://archive.org/download/winampskins_Bidibidi/Bidibidi.wsz');
