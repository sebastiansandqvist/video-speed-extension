const elements = {
  speeds: document.getElementById('speeds') as HTMLDivElement,
  replay: document.getElementById('replay') as HTMLButtonElement,
  forward: document.getElementById('forward') as HTMLButtonElement
};


function setPlaybackSpeed() {
  chrome.storage.sync.get('speed', ({ speed }) => {
    const videos = Array.from(document.getElementsByTagName('video')) as HTMLVideoElement[];
    for (const video of videos) {
      video.playbackRate = speed;
    }
  });
}

function goBack15() {
  const videos = Array.from(document.getElementsByTagName('video')) as HTMLVideoElement[];
  for (const video of videos) {
    video.currentTime = video.currentTime - 15; // in seconds
  }
}

function goForward15() {
  const videos = Array.from(document.getElementsByTagName('video')) as HTMLVideoElement[];
  for (const video of videos) {
    video.currentTime = video.currentTime + 15;
  }
}

const speeds = [0.25, 0.5, 1, 1.25, 1.5, 2, 2.5, 3, 5, 10];

const buttons = speeds.map((speed) => {
  const button = document.createElement('button');

  button.textContent = String(speed);

  button.onclick = async () => {
    chrome.storage.sync.set({ speed });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: setPlaybackSpeed
      });
    }
  };

  return button;
});

for (const button of buttons) {
  elements.speeds.appendChild(button);
}

elements.replay.onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: goBack15
    });
  }
}

elements.forward.onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: goForward15
    });
  }
}
