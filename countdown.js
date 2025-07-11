async function fetchConfig() {
  const res = await fetch('config.json');
  const data = await res.json();
  return new Date(data.targetDate);
}

function updateCountdown(targetDate) {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    const el = document.getElementById('countdown');
    el.style.transform = 'scale(1.1)';
    el.style.transition = 'transform 0.1s ease-in-out';
    setTimeout(() => {
      el.style.transform = 'scale(1)';
    }, 100);
    
    el.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('countdown').innerText =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

async function startCountdown() {
  const targetDate = await fetchConfig();
  updateCountdown(targetDate);
  setInterval(() => updateCountdown(targetDate), 1000);
}

startCountdown();

