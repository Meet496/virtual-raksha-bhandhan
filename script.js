const rakhis = document.querySelectorAll('.rakhi');
const handArea = document.getElementById('hand-img');
const message = document.getElementById('message');

// 🎵 Music setup
let backgroundAudio = new Audio("song.mp3");
backgroundAudio.loop = true;
let musicStarted = false;

// Start drag + trigger music once
rakhis.forEach(rakhi => {
  rakhi.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', rakhi.src);

    // ✅ Start music only once
    if (!musicStarted) {
      backgroundAudio.play().catch(err => console.log("Music blocked:", err));
      musicStarted = true;
      console.log("Music blocked:", err.message);

    }
  });
});

// Allow drop
handArea.addEventListener('dragover', e => {
  e.preventDefault();
});

// Drop rakhi on hand
handArea.addEventListener('drop', e => {
  e.preventDefault();

  const rakhiSrc = e.dataTransfer.getData('text/plain');
  const rakhiImg = document.createElement('img');
  rakhiImg.src = rakhiSrc;
  rakhiImg.classList.add('rakhi');

  // Make rakhi positionable
  rakhiImg.style.position = 'absolute';
  rakhiImg.style.width = '80px';
  rakhiImg.style.height = '80px';
  rakhiImg.style.pointerEvents = 'none';

  // Drop position inside hand area
  const rect = handArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  rakhiImg.style.left = `${x - 40}px`;
  rakhiImg.style.top = `${y - 40}px`;

  handArea.appendChild(rakhiImg);

  // ✅ Show message
  message.classList.remove('hidden');

  // ✅ Confetti
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
});
// 💬 Typewriter message
const typewriter = document.getElementById('typewriter');
const text = "Even though you're not here, this Rakhi carries your love all the way to me. 💖, this is our festival, noone can stop us from celebrating it. ";

// Show typewriter
typewriter.classList.remove('hidden');

let i = 0;
function typeNextChar() {
  if (i < text.length) {
    typewriter.textContent += text.charAt(i);
    i++;
    setTimeout(typeNextChar, 50); // speed (ms)
  }
}
typeNextChar();
