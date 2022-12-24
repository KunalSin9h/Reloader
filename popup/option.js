function saveSetting(setting){
    chrome.storage.local.set(setting);
}

document.addEventListener('DOMContentLoaded', () => {

    const startAndStop = document.querySelector('.start-and-stop');
    const speedValue = document.querySelector('.speed');
    const speedArea = document.querySelector('.set-speed');

    chrome.storage.local.get(["running", "speed"], (items) => {
        if (items.running) {
            startAndStop.textContent = "Stop";
            speedValue.value = JSON.stringify(items.speed);
            speedArea.style.pointerEvents = "none";
            speedArea.style.opacity = "0.5";
        }
        else {
            document.querySelector('.dec-speed').addEventListener('click', () => {
                speedValue.value = Math.max(+speedValue.value - 500, 500);
            });
            document.querySelector('.inc-speed').addEventListener('click', () => {
                speedValue.value = +speedValue.value + 500;
            });
        }
    });

    startAndStop.addEventListener('click', () => {
        const text = +speedValue.value;
        if (Number.isInteger(text) && text >= 500) {
            if (startAndStop.textContent == "Start") {
                startAndStop.textContent = "Stop";
                saveSetting({running: true, speed: text});
                speedArea.style.pointerEvents = "none";
                speedArea.style.opacity = "0.5";
            } else{
                startAndStop.textContent = "Start";
                saveSetting({running: false, speed: -1});
                speedArea.style.pointerEvents = "auto";
                speedArea.style.opacity = "1";
            }

        } else {
            speedValue.value = "";
        }
    });



    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        window.close();
    })
});