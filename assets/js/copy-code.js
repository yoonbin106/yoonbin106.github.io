document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.copy-button');

  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const codeBlock = button.nextElementSibling; // 버튼 바로 뒤에 있는 <code>
      const codeText = codeBlock.innerText;

      // 클립보드에 텍스트 복사
      navigator.clipboard.writeText(codeText).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => (button.textContent = 'Copy'), 2000); // 2초 후에 버튼 텍스트 복원
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        button.textContent = 'Failed';
      });
    });
  });
});
