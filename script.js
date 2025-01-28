const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 150;
const hiddenContent = document.getElementById("hiddenContent");

// 繪製金色背景
const drawGoldTexture = () => {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#d4af37");
  gradient.addColorStop(0.3, "#f5d76e");
  gradient.addColorStop(0.6, "#b8860b");
  gradient.addColorStop(1, "#f5d76e");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 添加顆粒感
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const random = Math.random() * 30;
    imageData.data[i] += random;
    imageData.data[i + 1] += random;
    imageData.data[i + 2] += random;
  }
  ctx.putImageData(imageData, 0, 0);
};

drawGoldTexture();

// 設定中獎結果
const prizePool = [
  "🎉 恭喜！您獲得 888 元大獎！ 🎉",
  "🎊 恭喜！中獎 500 元！ 🎊",
  "🎁 恭喜！中獎 200 元！ 🎁",
  "💪 再接再厲！下次一定！💪",
  "🧧 恭喜！中獎 50 元紅包！🧧",
  "🎬 恭喜！獲得一張電影票！🎬"
];

hiddenContent.innerText = prizePool[Math.floor(Math.random() * prizePool.length)];

// 刮除功能
let isScratching = false;

// 🛠 修正觸控支持
canvas.addEventListener("mousedown", (e) => {
  isScratching = true;
});

canvas.addEventListener("mouseup", () => {
  isScratching = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isScratching) return;
  scratchHandler(e.clientX, e.clientY);
});

// **解決手機觸控問題**
canvas.addEventListener("touchstart", (e) => {
  isScratching = true;
  e.preventDefault(); // 防止滾動
});

canvas.addEventListener("touchend", () => {
  isScratching = false;
});

canvas.addEventListener("touchmove", (e) => {
  if (!isScratching) return;
  e.preventDefault(); // 防止滾動

  const touch = e.touches[0]; // 取得第一個手指
  scratchHandler(touch.clientX, touch.clientY);
});

// **刮刮樂刮除邏輯**
const scratchHandler = (clientX, clientY) => {
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const size = Math.random() * 30 + 20;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.ellipse(x, y, size * 1.5, size, 0, 0, Math.PI * 2);
  ctx.fill();

  checkScratchPercentage();
};

// **檢查刮開比例**
const checkScratchPercentage = () => {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let clearPixels = 0;
  for (let i = 3; i < imgData.data.length; i += 4) {
    if (imgData.data[i] === 0) clearPixels++;
  }
  const clearRatio = clearPixels / (canvas.width * canvas.height);

  if (clearRatio > 0.5) {
    canvas.style.opacity = "0"; // 讓刮刮樂層消失
  }
};
