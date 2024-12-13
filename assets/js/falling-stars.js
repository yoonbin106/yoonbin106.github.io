document.addEventListener('DOMContentLoaded', function () {
  const fallingStars = document.querySelector('.falling-stars');
  const numberOfStars = 100; // 원하는 만큼 별의 개수를 조절하세요

  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    // 랜덤한 위치와 애니메이션 속성 값 설정
    const randomX = Math.random(); // 0에서 1 사이의 랜덤 값
    const randomY = Math.random();
    const randomDelay = Math.random() * 2; // 0에서 2초 사이의 랜덤 딜레이

    // 별의 속도를 더 느리게 설정
    const randomDuration = 5 + Math.random() * 5; // 5초에서 10초 사이의 랜덤 애니메이션 시간

    // 스타일 속성에 랜덤 값 적용
    star.style.setProperty('--star-x', randomX);
    star.style.setProperty('--star-y', randomY);
    star.style.animationDelay = `${randomDelay}s`;
    star.style.animationDuration = `${randomDuration + 0.1}s`; // 속도를 느리게 설정

    // fallingStars div에 star 추가
    fallingStars.appendChild(star);

    // 애니메이션이 끝난 후 별을 제거
    setTimeout(() => {
      star.remove();
    }, (randomDuration + randomDelay + 5) * 1000); // 애니메이션 시간 후 제거
  }

  // 일정 간격으로 별을 생성 (100ms마다 생성)
  setInterval(createStar, 100); // 100ms마다 새로운 별을 생성
});
