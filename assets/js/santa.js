document.addEventListener("DOMContentLoaded", function () {
  const santa = document.querySelector(".santa-animation");
  let isRightToLeft = true; // 현재 방향 (true: 오른쪽 아래 -> 왼쪽 위, false: 왼쪽 아래 -> 오른쪽 위)

  // 산타 이미지의 초기 위치를 화면 밖으로 설정
  function setInitialPosition() {
    if (isRightToLeft) {
      santa.style.top = '90%'; // 화면 아래
      santa.style.left = '90%'; // 화면 오른쪽
    } else {
      santa.style.top = '90%'; // 화면 아래
      santa.style.left = '10%'; // 화면 왼쪽
    }
    santa.style.opacity = '0'; // 초기 투명도 설정
  }

  // 애니메이션 함수: 산타가 계속 날아다니도록 이동
  function animateSanta() {
    const duration = 8000; // 애니메이션 시간 8초

    // 애니메이션이 끝날 때마다 방향을 변경
    if (isRightToLeft) {
      santa.style.animation = `santa-fly-right-to-left ${duration}ms linear 1`;
    } else {
      santa.style.animation = `santa-fly-left-to-right ${duration}ms linear 1`;
    }

    // 애니메이션이 끝날 때마다 방향을 반대로 변경
    santa.addEventListener('animationend', function () {
      // 방향 변경
      isRightToLeft = !isRightToLeft;
      // 초기 위치 설정
      setInitialPosition();
      // 애니메이션 재시작
      animateSanta();
    }, { once: true }); // 이벤트 리스너가 한 번만 실행되도록 설정
  }

  // 초기 산타 위치 설정 및 애니메이션 시작
  setInitialPosition();
  animateSanta();

  // 오른쪽 아래에서 왼쪽 위로 날아가는 애니메이션 (CSS로 정의된 @keyframes을 JavaScript로 추가)
  const styleSheet = document.styleSheets[0];

  // 오른쪽 아래 -> 왼쪽 위 애니메이션 추가
  styleSheet.insertRule(`
    @keyframes santa-fly-right-to-left {
      0% {
        top: 90%; /* 시작 위치: 화면 아래 */
        left: 90%; /* 시작 위치: 화면 오른쪽 */
      }
      100% {
        top: -50%; /* 끝 위치: 화면 위 */
        left: -50%; /* 끝 위치: 화면 왼쪽 */
      }
    }
  `);

  // 왼쪽 아래 -> 오른쪽 위 애니메이션 추가
  styleSheet.insertRule(`
    @keyframes santa-fly-left-to-right {
      0% {
        top: 90%; /* 시작 위치: 화면 아래 */
        left: -50%; /* 화면 왼쪽 밖 */
      }
      100% {
        top: -50%; /* 끝 위치: 화면 위 */
        left: 110%; /* 끝 위치: 화면 오른쪽 */
      }
    }
  `);
});
