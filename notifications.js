document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar-4");
    const hamburgerMenu = document.getElementById("hamburger-menu-4");
  
    // Toggle sidebar on hamburger menu click
    hamburgerMenu.addEventListener("click", () => {
      sidebar.classList.toggle("active"); // Add or remove "active" class
  
      // Toggle icons between hamburger and times
      if (sidebar.classList.contains("active")) {
        hamburgerMenu.innerHTML = '<i class="fas fa-times"></i>'; // Show times icon
      } else {
        hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>'; // Show hamburger icon
      }
    });
  });