document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', function() {
    // details 태그를 찾아서 open 속성을 제거하여 닫음
    this.closest('details').removeAttribute('open');
  });
});
