const settings = JSON.parse(document.getElementById('window-reloader-settings').innerText);
const RUNNING = settings.running;
const SPEED = settings.speed;

if (RUNNING) {
    setInterval(() => {
        window.location.reload();
    }, SPEED);
}