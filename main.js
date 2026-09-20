document.addEventListener('DOMContentLoaded', () => {
  const profileIcon = document.getElementById('profile-icon');
  const loginModal = document.querySelector('.login-html'); // Targets your login container from the video

  if (profileIcon && loginModal) {
    profileIcon.addEventListener('click', (event) => {
      event.preventDefault(); // Prevents page reload or anchor jump
      loginModal.classList.toggle('show');
    });
  }
});