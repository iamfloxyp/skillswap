// Elements
const categories = document.querySelectorAll('.category-item');
const detailsSection = document.getElementById('help-details');
const detailsTitle = document.getElementById('details-title');
const detailsContent = document.getElementById('details-content');
const backButton = document.getElementById('back-button');
const categoriesSection = document.querySelector('.help-categories');

// Data for each category
const helpData = {
  'getting-started': {
    title: 'Getting Started',
    details: `
      <ul>
        <li><strong>How do I create an account?</strong> <br> Go to the signup page and fill in the required details.</li>
        <li><strong>How do I log in?</strong> <br> Use your registered email and password to log in.</li>
        <li><strong>How do I navigate the platform?</strong> <br> Check out the navigation bar for key features.</li>
      </ul>
    `,
  },
  'account-management': {
    title: 'Account Management',
    details: `
      <ul>
        <li><strong>How do I reset my password?</strong> <br> Click "Forgot Password" on the login page.</li>
        <li><strong>How do I update my profile?</strong> <br> Go to "Account Settings" and edit your information.</li>
      </ul>
    `,
  },
  'billing-payments': {
    title: 'Billing & Payments',
    details: `
      <ul>
        <li><strong>What payment methods do you accept?</strong> <br> We accept credit cards, PayPal, and bank transfers.</li>
        <li><strong>How do I cancel a subscription?</strong> <br> Go to "Billing" under settings and select "Cancel Subscription".</li>
      </ul>
    `,
  },
  'technical-support': {
    title: 'Technical Support',
    details: `
      <ul>
        <li><strong>How do I report a bug?</strong> <br> Contact our support team with details about the issue.</li>
        <li><strong>How do I troubleshoot login issues?</strong> <br> Clear your browser cache and try again.</li>
      </ul>
    `,
  },
};

// Add event listeners to categories
categories.forEach((category) => {
  category.addEventListener('click', () => {
    const categoryKey = category.getAttribute('data-category');
    const categoryData = helpData[categoryKey];

    // Display category details
    detailsTitle.textContent = categoryData.title;
    detailsContent.innerHTML = categoryData.details;

    // Show details section and hide categories
    categoriesSection.style.display = 'none';
    detailsSection.style.display = 'block';
  });
});

// Back button to return to categories
backButton.addEventListener('click', () => {
  detailsSection.style.display = 'none';
  categoriesSection.style.display = 'block';
});