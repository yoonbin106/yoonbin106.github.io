document.addEventListener('DOMContentLoaded', function () {
  const fallingStars = document.querySelector('.falling-stars');
  const button = document.getElementById('toggle-snowing');

  if (!fallingStars || !button) {
    console.error('필요한 요소가 없습니다.');
    return;
  }

  const numberOfStars = 150; // 원하는 만큼 별의 개수를 조절하세요
  let animationPaused = false; // 애니메이션 상태 저장
  let starInterval; // 별 생성 주기 변수
  let isDesktop = window.innerWidth >= 768;

  // 별 생성 함수
  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    const randomX = Math.random();
    const randomY = Math.random();
    const randomDelay = Math.random() * 2;
    const randomDuration = 5 + Math.random() * 5;

    star.style.setProperty('--star-x', randomX);
    star.style.setProperty('--star-y', randomY);
    star.style.animationDelay = `${randomDelay}s`;
    star.style.animationDuration = `${randomDuration}s`;

    fallingStars.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, (randomDuration + randomDelay + 5) * 1000);
  }

  function startCreatingStars() {
    starInterval = setInterval(createStar, 100);
  }

  function stopCreatingStars() {
    clearInterval(starInterval);
  }

  button.addEventListener('click', function () {
    if (animationPaused) {
      const stars = fallingStars.querySelectorAll('.star');
      stars.forEach(star => {
        star.style.animationPlayState = 'running';
      });
      startCreatingStars();
      button.innerText = 'Stop Snowing !';
    } else {
      const stars = fallingStars.querySelectorAll('.star');
      stars.forEach(star => {
        star.style.animationPlayState = 'paused';
      });
      stopCreatingStars();
      button.innerText = 'Let it Snow !';
    }

    animationPaused = !animationPaused;
  });

  function addDesktopHoverEffect() {
    button.addEventListener('mouseenter', desktopHoverEnter);
    button.addEventListener('mouseleave', desktopHoverLeave);
  }

  function removeDesktopHoverEffect() {
    button.removeEventListener('mouseenter', desktopHoverEnter);
    button.removeEventListener('mouseleave', desktopHoverLeave);
    button.style.backgroundColor = '';
    button.style.color = '';
    button.style.transform = '';
  }

  function desktopHoverEnter() {
    button.style.backgroundColor = 'rgb(194, 194, 194)';
    button.style.color = 'white';
    button.style.transform = 'scale(1.05)';
  }

  function desktopHoverLeave() {
    button.style.backgroundColor = '';
    button.style.color = '';
    button.style.transform = '';
  }

  button.addEventListener('touchstart', function () {
    button.classList.add('active');
  });

  button.addEventListener('touchend', function () {
    button.classList.remove('active');
  });

  button.addEventListener('mouseup', function () {
    button.classList.remove('active');
  });

  function handleResize() {
    const newIsDesktop = window.innerWidth >= 768;
    if (newIsDesktop !== isDesktop) {
      isDesktop = newIsDesktop;
      if (isDesktop) {
        addDesktopHoverEffect();
      } else {
        removeDesktopHoverEffect();
      }
    }
  }

  window.addEventListener('resize', handleResize);

  if (isDesktop) {
    addDesktopHoverEffect();
  }

  startCreatingStars();
});
