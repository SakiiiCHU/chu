const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 150;
const hiddenContent = document.getElementById("hiddenContent");

// 繪製金屬質感金色背景
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
    "🐍 金蛇狂舞！財運翻倍！🧧",
    "🎊 恭喜！你抽中了「蛇來運轉」大獎！🎉",
    "💰 你的錢包像蛇一樣越來越長！💰",
    "🧧 恭喜獲得 888 元蛇年開運紅包！🧧",
    "🐍 蛇年特別獎！再刮一次！",
    "💎 你得到了金蛇吐寶，財富值+100！",
    "🐍 神秘蛇神賜福！你未來一週會有好運！",
    "🐍 照片拍出蛇精臉，2025 年最上相！",
    "🐍 這張刮刮樂蘊含靈氣，快供奉起來！",
    "💰 錢不是問題，問題是你沒錢！",
    "🐍 你獲得蛇年的「滑溜溜運勢」，無往不利！",
    "🐍 你被蛇咬了一口……然後變成了 VIP！",
    "🐍 恭喜！今年你「蛇」了個寂寞……",
    "🐍 你的運勢像蛇一樣滑進大獎區！",
    "🐍 你的運氣像蛇一樣蜿蜒曲折……再刮一次！",
    "🐍 你中了一條「紫金靈蛇」，帶來一整年好運！",
    "🐍 你獲得「蛇王封號」，今年吃蛇羹免費！",
    "🐍 「蛇」到用時方恨少，今年快去多學點技能吧！",
    "🐍 你抽到了蛇年幸運數字——快買 2025 這組號碼！",
    "🐍 你是今年的「躺平神蛇」，財運自己來！",
    "🐯 死胖虎出來了！他要跟你搶紅包！",
    "🐯 你抽中了「胖虎壓歲錢」，但他已經拿走了！",
    "🐯 胖虎說：刮刮樂？這是給窮人玩的！",
    "🐯 胖虎親筆簽名卡！可惜沒人想要！",
    "🐯 胖虎給你 1000 元，但前提是你要還他 2000！",
    "🐯 胖虎發來訊息：「有錢借我」",
    "🐯 恭喜！你抽到胖虎友情卡，但他說要收 10% 友情費！",
    "🐯 你抽到了胖虎限定 NFT！但沒人願意買……",
    "🐯 你贏了胖虎一局，但輸掉了一整年的運氣！",
    "🐯 死胖虎送你一條蛇，讓你「蛇」來運轉！",
    "🐍 你今年「蛇」的一手好運，快去買樂透！",
    "🐍 你刮到了「極品龍蛇混雜獎」，今年交友要小心！",
    "🐍 你抽中了神秘蛇蛋！但沒人知道會孵出什麼！",
    "🐍 你中了「毒蛇之眼」，會看到別人看不到的東西！",
    "🐍 你獲得「滑溜溜體質」，倒楣的事全都溜走了！",
    "🐍 這張刮刮樂竟然自己消失了！太靈異了吧！",
    "🐍 你獲得「蛇年大魔王」稱號，未來一年超強運！",
    "🐍 你中了蛇神庇佑，2025 年不會有小人！",
    "🐍 這張刮刮樂是假的！恭喜你獲得「無敵智障獎」！",
    "🐍 你獲得了「蛇行天下」技能，未來出門不用排隊！"  
];

hiddenContent.innerText = prizePool[Math.floor(Math.random() * prizePool.length)];

// 刮除功能
let isScratching = false;
canvas.addEventListener("mousedown", () => (isScratching = true));
canvas.addEventListener("mouseup", () => (isScratching = false));

canvas.addEventListener("mousemove", (e) => {
  if (!isScratching) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const size = Math.random() * 30 + 20;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.ellipse(x, y, size * 1.5, size, 0, 0, Math.PI * 2);
  ctx.fill();

  checkScratchPercentage();
});

// 觸控事件
canvas.addEventListener("touchmove", (e) => {
  if (!isScratching) return;

  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  const size = Math.random() * 30 + 20;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.ellipse(x, y, size * 1.5, size, 0, 0, Math.PI * 2);
  ctx.fill();

  checkScratchPercentage();
});

// 檢查刮開的比例
const checkScratchPercentage = () => {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let clearPixels = 0;
  for (let i = 3; i < imgData.data.length; i += 4) {
    if (imgData.data[i] === 0) clearPixels++;
  }
  const clearRatio = clearPixels / (canvas.width * canvas.height);

  // 當刮開 50% 以上時，完全顯示底部內容
  if (clearRatio > 0.5) {
    canvas.style.opacity = "0";
  }
};
