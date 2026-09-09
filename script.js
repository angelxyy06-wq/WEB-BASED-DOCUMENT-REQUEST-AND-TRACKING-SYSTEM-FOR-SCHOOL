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

// Star rating (Feedback page)
document.addEventListener('DOMContentLoaded', function () {
  const starRow = document.querySelector('.feedback-star-row');
  if (!starRow) return;

  const stars = Array.from(starRow.querySelectorAll('.feedback-star'));
  const STAR_EMPTY = 'assets/icons/star-outline.svg';
  const STAR_FILLED = 'assets/icons/star-filled.svg';

  let selectedRating = 0;

  function paintStars(count) {
    stars.forEach(function (star, index) {
      star.src = index < count ? STAR_FILLED : STAR_EMPTY;
    });
  }

  stars.forEach(function (star, index) {
    const value = index + 1;

    star.addEventListener('mouseenter', function () {
      paintStars(value);
    });

    star.addEventListener('click', function () {
      selectedRating = value;
      starRow.setAttribute('data-rating', selectedRating);
      paintStars(selectedRating);
    });
  });

  starRow.addEventListener('mouseleave', function () {
    paintStars(selectedRating);
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
 
// Feedback submit (frontend-only fake success)
document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.querySelector('.feedback-submit-btn');
  const toast = document.getElementById('feedback-toast');
  if (!submitBtn || !toast) return;

  const starRow = document.querySelector('.feedback-star-row');
  const stars = starRow ? Array.from(starRow.querySelectorAll('.feedback-star')) : [];
  const categorySelect = document.getElementById('feedback-category');
  const detailTextarea = document.getElementById('feedback-detail');
  const anonymousToggle = document.querySelector('.feedback-anonymous-row input[type="checkbox"]');

  let toastTimeout;

  submitBtn.addEventListener('click', function () {
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toast.classList.remove('show');
    }, 3000);

    // Reset form
    stars.forEach(function (star) {
      star.src = 'assets/icons/star-outline.svg';
    });
    if (starRow) starRow.removeAttribute('data-rating');
    if (categorySelect) categorySelect.selectedIndex = 0;
    if (detailTextarea) detailTextarea.value = '';
    if (anonymousToggle) anonymousToggle.checked = false;
  });
});