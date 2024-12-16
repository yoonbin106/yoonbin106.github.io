// 모바일에서도 hover 효과 적용
document.querySelector('.github-link-box').addEventListener('touchstart', function() {
  this.classList.add('hover');
});

document.querySelector('.github-link-box').addEventListener('touchend', function() {
  this.classList.remove('hover');
});
