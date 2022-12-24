const defaultSettings = {
    running: false,
    speed: 2000
};

function createSettingsNode(settings) {
    const settingsNode = document.createElement('div');
    settingsNode.id = 'window-reloader-settings';
    settingsNode.style.display = 'none';
    settingsNode.innerText = JSON.stringify(settings);
    document.body.appendChild(settingsNode);
}

function injectScript() {
    const script = document.createElement('script', {id: "window-reloader"});
    script.src = chrome.runtime.getURL('script.js');
    script.onload = function () {
        this.remove();
    };
    document.head.appendChild(script);
}

if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.get(["running", "speed"], function (items) {
      createSettingsNode(items);
      injectScript();
    });
  } else {
    createSettingsNode(defaultSettings);
    injectScript();
}
