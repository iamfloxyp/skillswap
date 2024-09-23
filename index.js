// Navbar toggling
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener('click',()=>{
    navLinks.style.display = "flex";
    menuIcon.style.display ="none";
    closeIcon.style.display ="block"
});
closeIcon.addEventListener('click',()=>{
    navLinks.style.display= 'none';
    menuIcon.style.display ="block";
    closeIcon.style.display= 'none';
});
// Faq section toggling
const questions = document.querySelectorAll('.question');

questions.forEach(function (question) {
  const btn = question.querySelector('.question-btn');
  btn.addEventListener('click', function () {
    questions.forEach(function (item) {
      if (item !== question) {
        item.classList.remove('show-text');
      }
    });
    question.classList.toggle('show-text');
  });
});

// year
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

// toggle button for the password
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.nextElementSibling.querySelector('i');

  if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
  } else {
      input.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
  }
}