const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 150;

// 繪製高質感金色背景
const drawGoldTexture = () => {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#d4af37"); // 金色
  gradient.addColorStop(0.3, "#f5d76e");
  gradient.addColorStop(0.6, "#b8860b");
  gradient.addColorStop(1, "#f5d76e");
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 加入顆粒感
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const random = Math.random() * 30;
    imageData.data[i] += random;     // R
    imageData.data[i + 1] += random; // G
    imageData.data[i + 2] += random; // B
  }
  ctx.putImageData(imageData, 0, 0);
};

drawGoldTexture();

// 設定中獎結果
const prizePool = [
  "恭喜！中獎 888 元！🎉",
  "恭喜！中獎 500 元！🎉",
  "恭喜！中獎 200 元！🎉",
  "哎呀！再接再厲～💪",
  "恭喜！中獎 50 元紅包！🎁",
  "恭喜！獲得一張電影票！🎬",
];

const randomPrize = prizePool[Math.floor(Math.random() * prizePool.length)];
document.getElementById("scratchCanvas").setAttribute("data-prize", randomPrize);

// 儲存刮除狀態
let isScratching = false;
let hasScratched = false;

// 觸控 & 滑鼠支援
const getTouchPos = (event) => {
  const rect = canvas.getBoundingClientRect();
  if (event.touches) {
    return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top,
    };
  }
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const scratch = (x, y, size) => {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.ellipse(x, y, size * 1.5, size, 0, 0, Math.PI * 2);
  ctx.fill();
};

// 開始刮除
const startScratch = (e) => {
  isScratching = true;
  hasScratched = true;
  const pos = getTouchPos(e);
  scratch(pos.x, pos.y, 20);
};

// 進行刮除
const moveScratch = (e) => {
  if (!isScratching) return;
  e.preventDefault();
  const pos = getTouchPos(e);
  scratch(pos.x, pos.y, 25);
};

// 停止刮除
const endScratch = () => {
  isScratching = false;

  // 計算刮除比例
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let clearPixels = 0;
  const totalPixels = imgData.data.length / 4;

  for (let i = 3; i < imgData.data.length; i += 4) {
    if (imgData.data[i] === 0) clearPixels++;
  }

  const clearRatio = clearPixels / totalPixels;
  if (clearRatio > 0.5) {
    document.getElementById("result").style.visibility = "visible";
  }
};

// 設置事件監聽
canvas.addEventListener("mousedown", startScratch);
canvas.addEventListener("mousemove", moveScratch);
canvas.addEventListener("mouseup", endScratch);
canvas.addEventListener("mouseleave", endScratch);

canvas.addEventListener("touchstart", startScratch);
canvas.addEventListener("touchmove", moveScratch);
canvas.addEventListener("touchend", endScratch);
