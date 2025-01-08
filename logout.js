document.addEventListener('DOMContentLoaded', () => {
    const confirmLogoutBtn = document.getElementById('confirm-logout-btn');
    const popupModal = document.getElementById('popup-modal');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Show popup modal when "Log Out" button is clicked
    confirmLogoutBtn.addEventListener('click', () => {
        popupModal.classList.remove('hidden');
    });

    // Handle "Yes" button click
    yesBtn.addEventListener('click', () => {
        localStorage.clear(); // Clear any session or user data
        window.location.href = 'index.html'; // Redirect to login or home page
    });

    // Handle "No" button click
    noBtn.addEventListener('click', () => {
        popupModal.classList.add('hidden'); // Hide the popup modal
    });
});