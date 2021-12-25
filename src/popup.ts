const speeds = [0.25, 0.5, 1, 1.25, 1.5, 2, 2.5, 3, 5, 10];

async function setPlaybackSpeed() {
  chrome.storage.sync.get('speed', ({ speed }) => {
    console.log('setting playback speed', speed);
    const videos = Array.from(document.getElementsByTagName('video')) as HTMLVideoElement[];
    for (const video of videos) {
      video.playbackRate = speed;
    }
  });
}

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
  document.body.appendChild(button);
}

