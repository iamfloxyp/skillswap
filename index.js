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
