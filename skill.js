const pexel_API_KEY = 'vBYkPHIonM0rT5kL66U34Cz22s4Lm4Vu7JG9Y3M5lZTmOigvfEqJS8Cw'; // Your Pexels API Key
const skills = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "DevOps Engineer", 
    "Data Scientist", "Machine Learning Engineer", "Mobile Developer", "Cybersecurity Analyst", "Cloud Engineer", 
    "QA Engineer", "Product Manager", "Software Engineer", "Database Administrator", "Systems Analyst", 
    "Network Engineer", "Technical Support Specialist", "Security Engineer", "Web Developer", 
    "Game Developer", "Blockchain Developer", "Artificial Intelligence Engineer", "Business Analyst", 
    "Site Reliability Engineer", "IT Project Manager", "IT Consultant", "Data Engineer", 
    "Business Intelligence Analyst", "Embedded Systems Developer", "IoT Developer"
];

document.addEventListener('DOMContentLoaded', () => {
    const skillsGrid = document.getElementById('skills-grid');
    const searchInput = document.getElementById('search');
    const profileContainer = document.getElementById('profile-container');

    // Safely load profile details from localStorage
    const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
    const profileInfo = {
        imageUrl: localStorage.getItem('profileImage') || 'default-image.jpg',
        fullName: profileData.fullName || 'John Doe',
        location: profileData.country || 'Unknown',
        skills: profileData.role || 'N/A'
    };

    // Fetch skill images from Pexels based on skill names
    async function fetchSkillImages(skill) {
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${skill}&per_page=1`, {
                headers: {
                    Authorization: pexel_API_KEY // Pexels API requires Authorization in headers
                }
            });
            const data = await response.json();
            return data.photos[0]?.src?.medium || 'default-image.jpg'; // Return image URL or a default image
        } catch (error) {
            console.error('Error fetching image:', error);
            return 'default-image.jpg'; // Return a default image in case of error
        }
    }

    // Function to display skills in the grid
    async function displaySkills(skills) {
        skillsGrid.innerHTML = ''; // Clear previous content
        profileContainer.innerHTML = ''; // Clear profile display
        skillsGrid.style.display = 'grid'; // Show skills grid

        for (const skill of skills) {
            const imageUrl = await fetchSkillImages(skill); // Fetch image for each skill

            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';

            const skillImage = document.createElement('img');
            skillImage.src = imageUrl;
            skillImage.alt = skill;

            const skillName = document.createElement('h3');
            skillName.textContent = skill;

            skillItem.appendChild(skillImage);
            skillItem.appendChild(skillName);

            skillsGrid.appendChild(skillItem);
        }
    }

    // Function to display the profile, skill, location, and chat button with the "Back" button below
    function displayProfileWithChat(profile) {
        skillsGrid.style.display = 'none'; // Hide skills grid
        profileContainer.innerHTML = `
            <div class="profile-details">
                <img src="${profile.imageUrl}" alt="Profile Picture" class="profile-pic">
                <h2>${profile.fullName}</h2>
                <p>Location: ${profile.location}</p>
                <p>Skills: ${profile.skills}</p>
                <button class="chat-button">Chat</button>
                <button id="backButton" class="back-button">Back to Skills</button>
            </div>
        `;

        // Add an event listener to the "Back" button
        document.getElementById('backButton').addEventListener('click', () => {
            profileContainer.innerHTML = ''; // Clear profile display
            skillsGrid.style.display = 'grid'; // Show skills grid again
        });
    }

    // Initial load of skills
    displaySkills(skills);

    // Click event for skill items to display profile details
    skillsGrid.addEventListener('click', (event) => {
        const clickedSkill = event.target.closest('.skill-item');
        if (clickedSkill) {
            displayProfileWithChat(profileInfo); // Display the profile when a skill is clicked
        }
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredSkills = skills.filter(skill => skill.toLowerCase().includes(searchTerm));
        displaySkills(filteredSkills);
    });
});
