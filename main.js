document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    console.log("Nibras Al-Elm App Initialized");

    const notificationContainer = document.getElementById('notification-container');
    const notificationBell = document.getElementById('notification-bell');
    const notificationDropdown = document.getElementById('notification-dropdown');

    if (notificationBell && notificationDropdown) {
        notificationBell.addEventListener('click', (event) => {
            event.stopPropagation();
            notificationDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (event) => {
            if (notificationContainer && !notificationContainer.contains(event.target)) {
                notificationDropdown.classList.add('hidden');
            }
        });
    }
});
