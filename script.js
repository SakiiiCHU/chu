const scratchCanvas = document.getElementById("scratchCanvas");
const resultCanvas = document.getElementById("resultCanvas");
const scratchCtx = scratchCanvas.getContext("2d");
const resultCtx = resultCanvas.getContext("2d");

scratchCanvas.width = resultCanvas.width = 300;
scratchCanvas.height = resultCanvas.height = 150;

// **設置獎項**
const prizePool = [
  "🐍 身體靈活如蛇，健康長壽不老！",
  "🐍 銀蛇獻瑞，強身健體，健康滿分！",
  "🐍 今年少病痛，多歡笑，身體健康最重要！",
  "🐍 蛇年來報喜，願你遠離病痛，健康久久！",
  "🐍 健康如龍蛇飛舞，精神奕奕每一天！",
  "🐍 祝你筋骨柔軟，身體靈活，活力滿滿！",
  "🐍 這一年，遠離感冒與壓力，健康快樂陪著你！",
  "🐍 蛇年大順，身體好，吃嘛嘛香，睡得又甜！",
  "🐍 健康是最棒的財富！願你活力滿滿一整年！",
  "🐍 銀蛇盤福，為你送上無病無痛的一年！",
  
  "🐍 錢財如金蛇蜿蜒，源源不絕進你家！",
  "🐍 今年存款變長條，存摺數字往上飆！",
  "🐍 你的財富像蛇一樣蜿蜒成山，越來越多！",
  "🐍 投資全勝，股票翻倍，暴富不是夢！",
  "🐍 銀蛇招財，願你今年賺大錢，天天開心數鈔票！",
  "🐍 今年鈔票像蛇群一樣，狂湧到你的戶頭！",
  "🐍 幸運來襲！暴富機會在等你，千萬要接住！",
  "🐍 這一年，買什麼都賺，存什麼都翻倍！",
  "🐍 今年財運爆棚，走路都能撿到錢！",
  "🐍 錢包鼓鼓，卡刷不爆，富貴雙全！",
  
  "🐍 今年開心每一天，煩惱全部像蛇皮一樣脫落！",
  "🐍 好運跟著你，霉運繞道走，幸運之神天天陪你！",
  "🐍 今年大吉大利，想做的事情都能順利完成！",
  "🐍 這一年，壞心情全掃除，好運氣全都來！",
  "🐍 願你的日子像蛇滑行一樣順暢無阻！",
  "🐍 生活像銀蛇舞動，精彩豐富，天天開心！",
  "🐍 心情每天都像陽光一樣燦爛，笑容停不下來！",
  "🐍 今年貴人滿滿，機會多多，好事接二連三！",
  "🐍 這一年你將成為最幸運的那個人！",
  "🐍 笑口常開，樂事不斷，開心迎接每一天！"
];

const randomPrize = prizePool[Math.floor(Math.random() * prizePool.length)];

// **繪製底層獎項**
const drawPrizeText = () => {
  resultCtx.fillStyle = "red";
  resultCtx.font = "20px Arial";
  resultCtx.textAlign = "center";
  resultCtx.fillText(randomPrize, resultCanvas.width / 2, resultCanvas.height / 2);
};
drawPrizeText();

// **繪製上層刮刮樂**
const drawGoldLayer = () => {
  const gradient = scratchCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
  gradient.addColorStop(0, "#d4af37"); // 金色
  gradient.addColorStop(0.3, "#f5d76e");
  gradient.addColorStop(0.6, "#b8860b");
  gradient.addColorStop(1, "#f5d76e");

  scratchCtx.fillStyle = gradient;
  scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

  const imageData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const random = Math.random() * 30;
    imageData.data[i] += random;
    imageData.data[i + 1] += random;
    imageData.data[i + 2] += random;
  }
  scratchCtx.putImageData(imageData, 0, 0);
};
drawGoldLayer();

// **刮刮樂功能**
let isScratching = false;

const getTouchPos = (event) => {
  const rect = scratchCanvas.getBoundingClientRect();
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
  scratchCtx.globalCompositeOperation = "destination-out";
  scratchCtx.beginPath();
  scratchCtx.ellipse(x, y, size * 1.5, size, 0, 0, Math.PI * 2);
  scratchCtx.fill();
};

// **開始刮除**
const startScratch = (e) => {
  isScratching = true;
  const pos = getTouchPos(e);
  scratch(pos.x, pos.y, 20);
};

// **持續刮除**
const moveScratch = (e) => {
  if (!isScratching) return;
  e.preventDefault();
  const pos = getTouchPos(e);
  scratch(pos.x, pos.y, 25);
};

// **停止刮除**
const endScratch = () => {
  isScratching = false;
};

// **綁定事件**
scratchCanvas.addEventListener("mousedown", startScratch);
scratchCanvas.addEventListener("mousemove", moveScratch);
scratchCanvas.addEventListener("mouseup", endScratch);
scratchCanvas.addEventListener("mouseleave", endScratch);

scratchCanvas.addEventListener("touchstart", startScratch);
scratchCanvas.addEventListener("touchmove", moveScratch);
scratchCanvas.addEventListener("touchend", endScratch);
