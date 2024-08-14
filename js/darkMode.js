// darkMode.js

// On page load, apply the saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.classList.add(savedTheme);

    const button = document.getElementById('toggleButton');
    if (button) {
        button.textContent = savedTheme === 'light-theme' ? 'Dark' : 'Light';

        // Toggle the theme and save it to localStorage
        button.addEventListener('click', function () {
            document.body.classList.toggle('light-theme');
            document.body.classList.toggle('dark-theme');

            const currentTheme = document.body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
            localStorage.setItem('theme', currentTheme);

            this.textContent = currentTheme === 'light-theme' ? 'Dark Mode' : 'Light Mode';
        });
    }
});