// JavaScriptで要素を取得
const image = document.getElementById("moving-image");

// アニメーションの設定
const animationDuration = 7000; // アニメーションの時間（ミリ秒）
const startPosition = 1000; // 開始位置（右端）
const endPosition = -1000; // 終了位置（左端）
const pauseDuration = 10; // 端に到達したときの一時停止時間（ミリ秒）

// アニメーション関数
function animateImage() {
  let startTime;

  // アニメーションフレームを要求する関数
  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsedTime = currentTime - startTime;

    // 進行度合いを計算
    const progress = Math.min(elapsedTime / animationDuration, 1);

    // 位置を更新
    const newPosition = startPosition + (endPosition - startPosition) * progress;
    image.style.transform = `translateX(${newPosition}%)`;

    // 透明度を更新
    if (progress < 1 && progress > 0.9) {
      const fadeProgress = (progress - 0.9) * 10;
      image.style.opacity = 1 - fadeProgress;
    } else {
      image.style.opacity = 1;
    }

    // アニメーションが終了したら停止
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // アニメーションが終了したら一時停止して再度アニメーションを開始
      setTimeout(() => {
        startTime = null;
        requestAnimationFrame(animate);
      }, pauseDuration);
    }
  }

  // アニメーションを開始
  requestAnimationFrame(animate);
}

// ページが読み込まれたらアニメーションを開始
window.addEventListener("load", animateImage);
