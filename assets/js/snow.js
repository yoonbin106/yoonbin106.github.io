document.addEventListener('DOMContentLoaded', function () {
  const fallingStars = document.querySelector('.falling-stars');
  const button = document.getElementById('toggle-snowing'); // 버튼 선택

  if (!fallingStars || !button) {
    console.error('필요한 요소가 없습니다.');
    return;
  }

  const numberOfStars = 150; // 원하는 만큼 별의 개수를 조절하세요
  let animationPaused = false; // 애니메이션 상태 저장
  let starInterval; // 별 생성 주기 변수

  // 별 생성 함수
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
    star.style.animationDuration = `${randomDuration}s`; // 속도를 느리게 설정

    // fallingStars div에 star 추가
    fallingStars.appendChild(star);

    // 애니메이션이 끝난 후 별을 제거
    setTimeout(() => {
      star.remove();
    }, (randomDuration + randomDelay + 5) * 1000); // 애니메이션 시간 후 제거
  }

  // 별 생성 시작
  function startCreatingStars() {
    starInterval = setInterval(createStar, 100); // 100ms마다 새로운 별을 생성
  }

  // 별 생성 중지
  function stopCreatingStars() {
    clearInterval(starInterval); // 별 생성 주기 멈춤
  }

  // 버튼 클릭 시 애니메이션 상태 변경
  button.addEventListener('click', function () {
    if (animationPaused) {
      // 애니메이션 재개
      const stars = fallingStars.querySelectorAll('.star');
      stars.forEach(star => {
        star.style.animationPlayState = 'running'; // CSS 애니메이션 실행
      });
      startCreatingStars(); // 새로운 별 생성 시작
      button.innerText = 'Stop Snowing !';
    } else {
      // 애니메이션 중지
      const stars = fallingStars.querySelectorAll('.star');
      stars.forEach(star => {
        star.style.animationPlayState = 'paused'; // CSS 애니메이션 중지
      });
      stopCreatingStars(); // 별 생성 중지
      button.innerText = 'Let it Snow !';
    }

    animationPaused = !animationPaused; // 상태 반전
  });

  // 마우스를 클릭하고 있을 때 배경색 유지
  button.addEventListener('mousedown', function () {
    button.classList.add('active'); // 클릭 상태에서 배경색 유지
  });

  button.addEventListener('mouseup', function () {
    button.classList.remove('active'); // 클릭 해제 시 배경색 원상복구
  });

  button.addEventListener('mouseleave', function () {
    button.classList.remove('active'); // 버튼이 영역을 벗어나면 배경색 원상복구
  });

  // 페이지 로드 시 눈 내리기 시작
  startCreatingStars(); // 페이지 로드 시 별 생성 시작
});
