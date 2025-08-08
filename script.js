const rakhis = document.querySelectorAll('.rakhi');
const handArea = document.querySelector('.hand-area');
const message = document.getElementById('message');

let backgroundAudio = new Audio("song.mp3");
backgroundAudio.loop = true;
let musicStarted = false;

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

rakhis.forEach(rakhi => {
  // Desktop drag
  rakhi.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', rakhi.src);

    if (!musicStarted) {
      backgroundAudio.play().catch(err => console.log("Music blocked:", err));
      musicStarted = true;
    }
  });

  // Mobile tap
  if (isMobile) {
    rakhi.addEventListener('click', () => {
      if (!musicStarted) {
        backgroundAudio.play().catch(err => console.log("Music blocked:", err));
        musicStarted = true;
      }

      const rakhiImg = document.createElement('img');
      rakhiImg.src = rakhi.src;
      rakhiImg.classList.add('rakhi');
      rakhiImg.style.position = 'absolute';
      rakhiImg.style.width = '80px';
      rakhiImg.style.height = '80px';
      rakhiImg.style.pointerEvents = 'none';

      const x = handArea.clientWidth / 2 - 40;
      const y = handArea.clientHeight / 2 - 40;
      rakhiImg.style.left = `${x}px`;
      rakhiImg.style.top = `${y}px`;

      handArea.appendChild(rakhiImg);
      message.classList.remove('hidden');

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    });
  }
});

// Drag-drop support
handArea.addEventListener('dragover', e => e.preventDefault());

handArea.addEventListener('drop', e => {
  e.preventDefault();
  const rakhiSrc = e.dataTransfer.getData('text/plain');
  const rakhiImg = document.createElement('img');
  rakhiImg.src = rakhiSrc;
  rakhiImg.classList.add('rakhi');
  rakhiImg.style.position = 'absolute';
  rakhiImg.style.width = '80px';
  rakhiImg.style.height = '80px';
  rakhiImg.style.pointerEvents = 'none';

  const rect = handArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  rakhiImg.style.left = `${x - 40}px`;
  rakhiImg.style.top = `${y - 40}px`;

  handArea.appendChild(rakhiImg);
  

  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
});


