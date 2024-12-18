document.addEventListener('DOMContentLoaded', function () {
  const fallingStars = document.querySelector('.falling-stars');
  const button = document.getElementById('toggle-snowing'); // 버튼 선택
  const santa = document.querySelector('.santa-animation'); // 산타 이미지 선택

  if (!fallingStars || !button || !santa) {
    console.error('필요한 요소가 없습니다.');
    return;
  }

  const numberOfStars = 150; // 원하는 만큼 별의 개수를 조절하세요
  let animationPaused = false; // 애니메이션 상태 저장
  let starInterval; // 별 생성 주기 변수
  let sparkleInterval; // 산타 깜빡임 효과 주기 변수

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

  // 산타 애니메이션 시작
  function startSantaAnimation() {
    santa.style.animationPlayState = 'running'; // 산타 애니메이션 시작
  }

  // 산타 애니메이션 중지
  function stopSantaAnimation() {
    santa.style.animationPlayState = 'paused'; // 산타 애니메이션 중지
  }

  // 산타 깜빡임 효과 시작
  function startSparkleEffect() {
    let opacityValue = 0;  // 시작 투명도 값 (낮은 값으로 시작)
    let increasing = true;    // 투명도가 증가 중인지 여부

    sparkleInterval = setInterval(function() {
      if (increasing) {
        opacityValue += 0.2; // 투명도 빠르게 증가
        if (opacityValue >= 1) {
          increasing = false; // 최대 투명도에 도달하면 감소 시작
        }
      } else {
        opacityValue -= 0.2; // 투명도 빠르게 감소
        if (opacityValue <= 0) {
          increasing = true;  // 최소 투명도에 도달하면 증가 시작
        }
      }
      santa.style.opacity = opacityValue; // 투명도 업데이트
    },200);
  }

  // 산타 깜빡임 효과 멈추기
  function stopSparkleEffect() {
    clearInterval(sparkleInterval); // 깜빡임 효과 멈추기
    santa.style.opacity = 1; // 투명도 초기화
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
      startSantaAnimation(); // 산타 애니메이션 재개
      startSparkleEffect(); // 산타 깜빡임 재개
      button.innerText = 'Stop Snowing !';
    } else {
      // 애니메이션 중지
      const stars = fallingStars.querySelectorAll('.star');
      stars.forEach(star => {
        star.style.animationPlayState = 'paused'; // CSS 애니메이션 중지
      });
      stopCreatingStars(); // 별 생성 중지
      stopSantaAnimation(); // 산타 애니메이션 중지
      stopSparkleEffect(); // 산타 깜빡임 중지
      button.innerText = 'Let it Snow !';
    }

    animationPaused = !animationPaused; // 상태 반전
  });

  // 모바일 및 데스크탑에서 클릭 시 배경색 유지
  button.addEventListener('touchstart', function () {
    button.classList.add('active');
  });

  button.addEventListener('touchend', function () {
    button.classList.remove('active');
  });

  button.addEventListener('mouseup', function () {
    button.classList.remove('active');
  });

  button.addEventListener('mouseenter', function () {
    button.classList.add('active');
  });
  button.addEventListener('mouseleave', function () {
    button.classList.remove('active');
  });

  // 페이지 로드 시 눈 내리기 시작
  startCreatingStars(); // 페이지 로드 시 별 생성 시작
  startSantaAnimation(); // 페이지 로드 시 산타 애니메이션 시작
  startSparkleEffect(); // 페이지 로드 시 산타 깜빡임 효과 시작
});
