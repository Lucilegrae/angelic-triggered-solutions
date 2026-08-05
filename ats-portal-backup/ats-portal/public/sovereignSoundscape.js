document.addEventListener("DOMContentLoaded", () => {
  const audio = document.createElement("audio");

  audio.src = "/sovereign-ambient.mp3";
  audio.loop = true;
  audio.volume = 0.25;

  // Autoplay attempt (browser may require user interaction)
  const tryPlay = () => {
    audio.play().catch(() => {});
  };

  document.body.addEventListener("click", tryPlay, { once: true });
  document.body.addEventListener("touchstart", tryPlay, { once: true });

  document.body.appendChild(audio);
});
