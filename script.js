// Dropdown behavior for Notifications, Settings, and Profile
document.addEventListener('DOMContentLoaded', function () {
  const toggles = document.querySelectorAll('[data-dropdown-toggle]');

  function closeAllPanels() {
    document.querySelectorAll('.dropdown-panel.show').forEach(function (panel) {
      panel.classList.remove('show');
    });
  }

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      event.stopPropagation(); 

      const panelId = toggle.getAttribute('data-dropdown-toggle');
      const panel = document.getElementById(panelId);
      const isAlreadyOpen = panel.classList.contains('show');

      closeAllPanels(); 

      if (!isAlreadyOpen) {
        panel.classList.add('show');
      }
    });
  });


  document.addEventListener('click', function () {
    closeAllPanels();
  });

  
  document.querySelectorAll('.dropdown-panel').forEach(function (panel) {
    panel.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeAllPanels();
    }
  });
});