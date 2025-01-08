// Event for opening file input to upload an image
document.getElementById('editBtn').addEventListener('click', function() {
    document.getElementById('fileInput').click(); // Trigger the file input click
});

// Event for handling image upload and setting it as profile image
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImageUrl = e.target.result;
            document.getElementById('profileImg').src = uploadedImageUrl; // Set the new image source
            localStorage.setItem('profileImage', uploadedImageUrl); // Save uploaded image URL to localStorage
            localStorage.setItem('imageType', 'uploaded'); // Set imageType as 'uploaded'
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});

// Open avatar modal and generate avatars
document.getElementById('avatarBtn').addEventListener('click', function() {
    document.getElementById('avatarModal').style.display = "block";
    generateAvatars();
});

// Close the modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('avatarModal').style.display = "none";
});

// Generate avatars using Robohash API
function generateAvatars() {
    const avatarContainer = document.getElementById('avatarContainer');
    avatarContainer.innerHTML = ''; // Clear previous avatars
    for (let i = 0; i < 50; i++) { // Generate 50 random avatars
        const randomNumber = Math.floor(Math.random() * 1000); // Generate random number
        const avatarUrl = `https://robohash.org/avatar${randomNumber}?set=set4`; // Use random number in URL

        const avatarOption = document.createElement('div');
        avatarOption.classList.add('avatar-option');
        avatarOption.innerHTML = `<img src="${avatarUrl}" alt="Avatar">`;

        avatarOption.addEventListener('click', function() {
            document.getElementById('profileImg').src = avatarUrl; // Set the profile image to the selected avatar
            localStorage.setItem('profileImage', avatarUrl); // Save avatar URL to localStorage
            localStorage.setItem('imageType', 'avatar'); // Set imageType as 'avatar'
            document.getElementById('avatarModal').style.display = "none"; // Close modal after selection
        });

        avatarContainer.appendChild(avatarOption);
    }
}

// Load the saved avatar or uploaded image from localStorage on page load
window.onload = function() {
    const savedImageUrl = localStorage.getItem('profileImage'); // Get saved image URL
    const imageType = localStorage.getItem('imageType'); // Get image type (either 'uploaded' or 'avatar')

    // Set the profile image based on the last saved image type
    if (savedImageUrl && savedImageUrl !== '') {
        document.getElementById('profileImg').src = savedImageUrl; // Set the saved image as the profile image
    } else {
        document.getElementById('profileImg').src = 'path/to/default/image.png'; // Default image path for new users
    }
};
// location or counr=try
const geonamesUsername = 'flofloxy'; // Replace with your Geonames username

    // Function to fetch countries from REST Countries API
    async function fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const countrySelect = document.getElementById('country');

        // Sort countries alphabetically
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

        countries.forEach(country => {
          const option = document.createElement('option');
          option.value = country.cca2; // Use the country code (cca2) for the value
          option.textContent = country.name.common; // Display the country common name
          countrySelect.appendChild(option);
        });
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }

    document.addEventListener('DOMContentLoaded', fetchCountries);

    // Function to fetch locations (cities) based on the selected country
    async function fetchLocations(countryCode) {
      const url = `http://api.geonames.org/searchJSON?country=${NG}&maxRows=10&username=${flofloxy}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const locationSelect = document.getElementById('location');
        locationSelect.innerHTML = ''; // Clear any previous location options

        data.geonames.forEach(location => {
          const option = document.createElement('option');
          option.value = location.name;
          option.textContent = location.name;
          locationSelect.appendChild(option);
        });
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    // Event listener to detect when a country is selected and fetch its locations
    document.getElementById('country').addEventListener('change', function () {
      const countryCode = this.value; // Get the selected country code

      if (countryCode) {
        fetchLocations(countryCode);
      } else {
        // Reset the location dropdown if no country is selected
        document.getElementById('location').innerHTML = '<option value="">Select Location</option>';
      }
    });

    // Function to fetch tech roles from a local JSON file

    async function fetchTechRoles() {
        try {
            const response = await fetch('tech-roles.json'); // Replace with the actual path to your JSON file
            const techRoles = await response.json();
            const roleSelect = document.getElementById('role');
            roleSelect.innerHTML = ''; // Clear any previous roles
    
            // Populate the role dropdown with tech job titles
            techRoles.forEach(role => {
                const option = document.createElement('option');
                option.value = role; // Option value for the role dropdown
                option.textContent = role; // Displayed text in the dropdown
                roleSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching tech roles:', error);
        }
    }
    
    async function fetchLookingForOptions() {
        try {
            const response = await fetch('tech-roles.json'); // Replace with the actual path to your JSON file
            const lookingForOptions = await response.json();
            const lookingForSelect = document.getElementById('looking-for');
            lookingForSelect.innerHTML = ''; // Clear any previous options
    
            // Populate the "Looking For" dropdown with options
            lookingForOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option; // Option value
                optionElement.textContent = option; // Displayed text in the dropdown
                lookingForSelect.appendChild(optionElement);
            });
        } catch (error) {
            console.error('Error fetching looking for options:', error);
        }
    }
    
    // Call the functions to fetch data on page load or when needed
    fetchTechRoles();
    fetchLookingForOptions();


// Get the theme buttons
const lightThemeBtn = document.getElementById('light-theme');
const darkThemeBtn = document.getElementById('dark-theme');

// Function to apply the saved theme
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(savedTheme);
    }
}

// Load the saved theme on page load
document.addEventListener('DOMContentLoaded', applySavedTheme);

// Add event listeners to switch between themes
lightThemeBtn.addEventListener('click', () => {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme'); // Save the selected theme
});

darkThemeBtn.addEventListener('click', () => {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme'); // Save the selected theme
});
// profile section
document.addEventListener('DOMContentLoaded', function () {
    const profileInfo = document.getElementById('profile-info');
    const editButton = profileInfo.querySelector('button[type="button"]');
    const saveButton = profileInfo.querySelector('button[type="submit"]');

    // Load saved data from local storage
    loadProfileData();

    // Handle edit button click
    editButton.addEventListener('click', function () {
        // Enable all inputs for editing
        const inputs = profileInfo.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.disabled = false;
        });
        
        // Change button text to "Save Changes"
        saveButton.textContent = 'Save Changes';
    });

    // Handle save button click
    saveButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission

        // Collect data from inputs
        const profileData = {
            fullName: document.getElementById('full-name').value,
            gender: document.getElementById('gender').value,
            country: document.getElementById('country').value,
            role: document.getElementById('role').value,
            lookingFor: document.getElementById('looking-for').value,
            username: document.getElementById('username').value
        };

        // Save data to local storage
        localStorage.setItem('profileData', JSON.stringify(profileData));

        // Change button text to "Saved"
        saveButton.textContent = 'Saved';

        // Disable inputs after saving
        const inputs = profileInfo.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.disabled = true;
        });
    });

    function loadProfileData() {
        const savedData = localStorage.getItem('profileData');
        if (savedData) {
            const profileData = JSON.parse(savedData);
            document.getElementById('full-name').value = profileData.fullName || '';
            document.getElementById('gender').value = profileData.gender || 'male';
            document.getElementById('country').value = profileData.country || 'USA';
            document.getElementById('role').value = profileData.role || '';
            document.getElementById('looking-for').value = profileData.lookingFor || '';
            document.getElementById('username').value = profileData.username || '';

            // Disable inputs if data is loaded
            const inputs = profileInfo.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.disabled = true;
            });

            // Change save button text to "Saved" if data exists
            saveButton.textContent = 'Saved';
        }
    }
});


// account section
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const storedEmail = localStorage.getItem('signupEmail');
    const storedPassword = localStorage.getItem('signupPassword');

    if (storedEmail) emailInput.value = storedEmail;
    if (storedPassword) passwordInput.value = storedPassword;

    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    
    // Prevent form submission and page refresh
    editButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        emailInput.disabled = false;
        passwordInput.disabled = false;
        saveButton.disabled = false;  // Enable the Save Changes button
    });

    // Save Changes button functionality
    saveButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        localStorage.setItem('signupEmail', emailInput.value);
        localStorage.setItem('signupPassword', passwordInput.value);

        emailInput.disabled = true;
        passwordInput.disabled = true;

        saveButton.innerText = 'Saved';
        saveButton.disabled = true; // Disable the Save Changes button again
    });

    // Password toggle functionality
    const togglePassword = (inputField) => {
        const input = document.getElementById(inputField);
        const icon = input.nextElementSibling.querySelector('i');
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            input.type = "password";
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    };

    // Add the toggle functionality to password inputs
    const passwordContainer = document.createElement('div');
    passwordContainer.classList.add('input-container');
    
    const toggleIcon = document.createElement('span');
    toggleIcon.classList.add('toggle-password');
    toggleIcon.innerHTML = '<i class="fa fa-eye-slash"></i>';
    toggleIcon.onclick = () => togglePassword('password');

    passwordInput.parentElement.insertBefore(passwordContainer, passwordInput);
    passwordContainer.appendChild(passwordInput);
    passwordContainer.appendChild(toggleIcon);
});
// deactivation
document.querySelector('.deactivate-button').addEventListener('click', function() {
    // Show the confirmation modal
    document.getElementById('confirmationModal').style.display = 'block';
});

// Handle Yes button click in confirmation modal
document.getElementById('yesButton').addEventListener('click', function() {
    deactivateAccount();
});

// Handle No button click in confirmation modal
document.getElementById('noButton').addEventListener('click', function() {
    // Hide the confirmation modal
    document.getElementById('confirmationModal').style.display = 'none';
});

// Function to handle account deactivation
function deactivateAccount() {
    // Clear user data from local storage
    localStorage.removeItem('signupEmail');
    localStorage.removeItem('signupPassword');
    localStorage.removeItem('profileData');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('imageType');

    // Show the deactivation success modal
    document.getElementById('confirmationModal').style.display = 'none'; // Hide confirmation modal
    document.getElementById('deactivationModal').style.display = 'block'; // Show success modal
}