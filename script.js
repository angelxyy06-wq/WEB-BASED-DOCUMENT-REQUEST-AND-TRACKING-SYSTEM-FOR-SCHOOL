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


// Login / Signup / Role validation
document.addEventListener('DOMContentLoaded', function () {
  const AUTHORIZED_STAFF_EMAIL = 'schoolstaff123@gmail.com';
 
  // Login page
  const loginBtn = document.getElementById('login-submit-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const emailField = document.getElementById('login-id');
      const enteredEmail = emailField ? emailField.value.trim() : '';
      sessionStorage.setItem('bpesEmail', enteredEmail);
      window.location.href = 'user-role.html';
    });
  }
 
  // Sign up page
  const signupBtn = document.getElementById('signup-submit-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const emailField = document.getElementById('signup-email');
      const enteredEmail = emailField ? emailField.value.trim() : '';
      sessionStorage.setItem('bpesEmail', enteredEmail);
      window.location.href = 'user-role.html';
    });
  }
 
  // Role selection page
  const staffCard = document.getElementById('staff-role-card');
  if (staffCard) {
    staffCard.addEventListener('click', function (event) {
      event.preventDefault();
      const savedEmail = (sessionStorage.getItem('bpesEmail') || '').trim().toLowerCase();
 
      if (savedEmail === AUTHORIZED_STAFF_EMAIL) {
        window.location.href = 'staff-dashboard.html';
      } else {
        window.location.href = 'invalid-email.html';
      }
    });
  }
});
 