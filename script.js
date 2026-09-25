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
      const passwordField = document.getElementById('login-password');
      const emailError = document.getElementById('login-id-error');
      const passwordError = document.getElementById('login-password-error');

      const enteredEmail = emailField ? emailField.value.trim() : '';
      const enteredPassword = passwordField ? passwordField.value.trim() : '';

      let hasError = false;

      if (!enteredEmail) {
        if (emailError) {
          emailError.textContent = 'Please enter your Email or LRN.';
          emailError.style.display = 'block';
        }
        hasError = true;
      } else if (
        enteredEmail.toLowerCase().includes('staff') &&
        enteredEmail.toLowerCase() !== AUTHORIZED_STAFF_EMAIL
      ) {

        if (emailError) {
          emailError.textContent = 'Wrong email. Please check your email and try again.';
          emailError.style.display = 'block';
        }
        hasError = true;
      } else {
        if (emailError) emailError.style.display = 'none';
      }

      if (!enteredPassword) {
        if (passwordError) passwordError.style.display = 'block';
        hasError = true;
      } else {
        if (passwordError) passwordError.style.display = 'none';
      }

      if (hasError) return;

      sessionStorage.setItem('bpesEmail', enteredEmail);
      window.location.href = 'user-role.html';
    });
  }

  // Sign up page
  const signupBtn = document.getElementById('signup-submit-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const nameField = document.getElementById('signup-name');
      const emailField = document.getElementById('signup-email');
      const lrnField = document.getElementById('signup-lrn');
      const passwordField = document.getElementById('signup-password');
      const confirmField = document.getElementById('signup-confirm-password');

      const nameError = document.getElementById('signup-name-error');
      const emailError = document.getElementById('signup-email-error');
      const lrnError = document.getElementById('signup-lrn-error');
      const passwordError = document.getElementById('signup-password-error');
      const confirmError = document.getElementById('signup-confirm-password-error');

      const enteredName = nameField ? nameField.value.trim() : '';
      const enteredEmail = emailField ? emailField.value.trim() : '';
      const enteredLrn = lrnField ? lrnField.value.trim() : '';
      const enteredPassword = passwordField ? passwordField.value.trim() : '';
      const enteredConfirm = confirmField ? confirmField.value.trim() : '';

      let hasError = false;

      if (!enteredName) {
        if (nameError) nameError.style.display = 'block';
        hasError = true;
      } else if (nameError) {
        nameError.style.display = 'none';
      }

      if (!enteredEmail) {
        if (emailError) emailError.style.display = 'block';
        hasError = true;
      } else if (emailError) {
        emailError.style.display = 'none';
      }

      if (!enteredLrn) {
        if (lrnError) lrnError.style.display = 'block';
        hasError = true;
      } else if (lrnError) {
        lrnError.style.display = 'none';
      }

      if (!enteredPassword) {
        if (passwordError) passwordError.style.display = 'block';
        hasError = true;
      } else if (passwordError) {
        passwordError.style.display = 'none';
      }

      if (!enteredConfirm || enteredConfirm !== enteredPassword) {
        if (confirmError) confirmError.style.display = 'block';
        hasError = true;
      } else if (confirmError) {
        confirmError.style.display = 'none';
      }

      if (hasError) return;

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

  const parentCard = document.getElementById('parent-role-card');
  if (parentCard) {
    parentCard.addEventListener('click', function (event) {
      event.preventDefault();
      const savedEmail = (sessionStorage.getItem('bpesEmail') || '').trim().toLowerCase();

      if (savedEmail === AUTHORIZED_STAFF_EMAIL) {
        window.location.href = 'invalid-email.html';
      } else {
        window.location.href = 'index.html';
      }
    });
  }
});

// Request Document Form validation
document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById('request-submit-btn');
  if (!submitBtn) return;

  const requiredFields = [
    { id: 'requester-name', errorId: 'requester-name-error' },
    { id: 'student-name', errorId: 'student-name-error' },
    { id: 'contact-number', errorId: 'contact-number-error' },
    { id: 'email-address', errorId: 'email-address-error' },
    { id: 'year-level', errorId: 'year-level-error' },
    { id: 'lrn', errorId: 'lrn-error' },
    { id: 'number-copies', errorId: 'number-copies-error' }
  ];

  submitBtn.addEventListener('click', function (event) {
    let hasError = false;

    requiredFields.forEach(function (field) {
      const input = document.getElementById(field.id);
      const errorText = document.getElementById(field.errorId);
      const value = input ? input.value.trim() : '';

      if (!value) {
        if (errorText) errorText.style.display = 'block';
        hasError = true;
      } else if (errorText) {
        errorText.style.display = 'none';
      }
    });

    const certifyCheckbox = document.getElementById('certify-info');
    const certifyError = document.getElementById('certify-info-error');
    if (certifyCheckbox && !certifyCheckbox.checked) {
      if (certifyError) certifyError.style.display = 'block';
      hasError = true;
    } else if (certifyError) {
      certifyError.style.display = 'none';
    }

    if (hasError) {
      event.preventDefault();
    } else {
      const docTypeSelect = document.getElementById('document-type');
      if (docTypeSelect) {
        const selected = docTypeSelect.options[docTypeSelect.selectedIndex];
        sessionStorage.setItem('bpesDocType', selected.textContent.trim());
      }
    }
  });
});

// Restrict Contact Number, LRN, and Number of Copies to digits only
document.addEventListener('DOMContentLoaded', function () {
  const contactField = document.getElementById('contact-number');
  const lrnField = document.getElementById('lrn');
  const copiesField = document.getElementById('number-copies');

  // Contact Number: allow digits and a leading "+" only
  if (contactField) {
    contactField.addEventListener('input', function () {
      let value = contactField.value;
      const hasPlus = value.startsWith('+');
      value = value.replace(/[^0-9]/g, '');
      contactField.value = hasPlus ? '+' + value : value;
    });
  }

  // LRN: digits only
  if (lrnField) {
    lrnField.addEventListener('input', function () {
      lrnField.value = lrnField.value.replace(/[^0-9]/g, '');
    });
  }

  // Number of Copies: digits only
  if (copiesField) {
    copiesField.addEventListener('input', function () {
      copiesField.value = copiesField.value.replace(/[^0-9]/g, '');
    });
  }
});

// Track Request page validation
document.addEventListener('DOMContentLoaded', function () {
  const trackBtn = document.getElementById('track-request-submit-btn');
  if (!trackBtn) return;

  const TRACKING_DESTINATIONS = {
    'REQ-2024-00123': 'track-request-completed.html',
    'REQ-2024-00456': 'track-request-processing.html',
    'REQ-2024-00892': 'track-request-rejected.html'
  };

  const trackingInput = document.getElementById('tracking-number');
  const trackingError = document.getElementById('tracking-number-error');

  trackBtn.addEventListener('click', function () {
    const value = trackingInput ? trackingInput.value.trim().toUpperCase() : '';

    if (!value) {
      if (trackingError) {
        trackingError.textContent = 'Please enter a tracking number.';
        trackingError.style.display = 'block';
      }
      return;
    }

    const destination = TRACKING_DESTINATIONS[value];

    if (!destination) {
      if (trackingError) {
        trackingError.textContent = 'Your input is invalid.';
        trackingError.style.display = 'block';
      }
      return;
    }

    trackingError.style.display = 'none';
    window.location.href = destination;
  });
});

// Track Your Application (Request page CTA (Call to Action)) validation
document.addEventListener('DOMContentLoaded', function () {
  const trackNowBtn = document.getElementById('track-now-btn');
  if (!trackNowBtn) return;

  const TRACKING_DESTINATIONS = {
    'REQ-2024-00123': 'track-request-completed.html',
    'REQ-2024-00456': 'track-request-processing.html',
    'REQ-2024-00892': 'track-request-rejected.html'
  };

  const refInput = document.getElementById('track-ref');
  const refError = document.getElementById('track-ref-error');

  trackNowBtn.addEventListener('click', function () {
    const value = refInput ? refInput.value.trim().toUpperCase() : '';

    if (!value) {
      if (refError) {
        refError.textContent = 'Please enter a reference number.';
        refError.style.display = 'block';
      }
      return;
    }

    const destination = TRACKING_DESTINATIONS[value];

    if (!destination) {
      if (refError) {
        refError.textContent = 'Your input is invalid.';
        refError.style.display = 'block';
      }
      return;
    }

    refError.style.display = 'none';
    window.location.href = destination;
  });
});

// Feedback submit (frontend-only fake success)
document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById('feedback-submit-btn');
  const toast = document.getElementById('feedback-toast');
  if (!submitBtn || !toast) return;

  const starRow = document.querySelector('.feedback-star-row');
  const stars = starRow ? Array.from(starRow.querySelectorAll('.feedback-star')) : [];
  const ratingError = document.getElementById('feedback-rating-error');

  const categorySelect = document.getElementById('feedback-category');
  const categoryError = document.getElementById('feedback-category-error');

  const detailTextarea = document.getElementById('feedback-detail');
  const detailError = document.getElementById('feedback-detail-error');

  const anonymousToggle = document.querySelector('.feedback-anonymous-row input[type="checkbox"]');

  let toastTimeout;

  submitBtn.addEventListener('click', function () {
    let hasError = false;

    // Star rating check
    const currentRating = starRow ? starRow.getAttribute('data-rating') : null;
    if (!currentRating) {
      if (ratingError) ratingError.style.display = 'block';
      hasError = true;
    } else if (ratingError) {
      ratingError.style.display = 'none';
    }

    // Category check
    if (!categorySelect || !categorySelect.value) {
      if (categoryError) categoryError.style.display = 'block';
      hasError = true;
    } else if (categoryError) {
      categoryError.style.display = 'none';
    }

    // Detailed feedback check
    if (!detailTextarea || !detailTextarea.value.trim()) {
      if (detailError) detailError.style.display = 'block';
      hasError = true;
    } else if (detailError) {
      detailError.style.display = 'none';
    }

    if (hasError) return;

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

// Populate Document Type on Request Submitted page from the selected type
document.addEventListener('DOMContentLoaded', function () {
  const summaryFields = document.querySelectorAll('.summary-field');
  if (!summaryFields.length) return;

  const docType = sessionStorage.getItem('bpesDocType');
  if (!docType) return;

  summaryFields.forEach(function (field) {
    const label = field.querySelector('.summary-label');
    if (label && label.textContent.trim() === 'Document Type') {
      const value = field.querySelector('.summary-value');
      if (value) value.textContent = docType;
    }
  });
});

// Status filter + search (Staff Dashboard - Recent Requests table)
document.addEventListener('DOMContentLoaded', function () {
  const filterOptions = document.querySelectorAll('.status-filter-option');
  const filterLabel = document.getElementById('status-filter-label');
  const filterPanel = document.getElementById('status-filter-panel');
  const searchInput = document.getElementById('request-search');
  const tableRows = document.querySelectorAll('#requests-table tbody tr[data-status]');
  const noResultsRow = document.getElementById('no-results-row');

  if (!tableRows.length) return;

  let currentStatus = 'all';

  function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    tableRows.forEach(function (row) {
      const statusMatch = currentStatus === 'all' || row.getAttribute('data-status') === currentStatus;

      const reqNoCell = row.querySelector('.req-no');
      const reqNo = reqNoCell ? reqNoCell.textContent.trim().toLowerCase() : '';

      const cells = row.querySelectorAll('td');
      const requesterName = cells[1] ? cells[1].textContent.trim().toLowerCase() : '';

      const searchMatch = searchTerm === '' || reqNo.includes(searchTerm) || requesterName.includes(searchTerm);

      const isMatch = statusMatch && searchMatch;
      row.style.display = isMatch ? '' : 'none';
      if (isMatch) visibleCount++;
    });

    if (noResultsRow) {
      noResultsRow.style.display = visibleCount === 0 ? '' : 'none';
    }
  }

  filterOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      currentStatus = option.getAttribute('data-status');

      if (filterLabel) filterLabel.textContent = option.textContent.trim();

      filterOptions.forEach(function (opt) {
        opt.classList.remove('active');
      });
      option.classList.add('active');

      if (filterPanel) filterPanel.classList.remove('show');

      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
});

// Status filter + search + date filter (Request Management page)
document.addEventListener('DOMContentLoaded', function () {
  const filterOptions = document.querySelectorAll('#requests-status-filter-panel .status-filter-option');
  const filterLabel = document.getElementById('requests-status-filter-label');
  const filterPanel = document.getElementById('requests-status-filter-panel');
  const searchInput = document.getElementById('requests-search-input');
  const searchBtn = document.getElementById('requests-search-btn');
  const dateInput = document.getElementById('requests-date-filter');
  const clearBtn = document.getElementById('requests-clear-filters-btn');
  const tableRows = document.querySelectorAll('#management-requests-table tbody tr[data-status]');
  const noResultsRow = document.getElementById('management-no-results-row');

  if (!tableRows.length) return;

  let currentStatus = 'all';

  function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedDate = dateInput ? dateInput.value : '';
    let visibleCount = 0;

    tableRows.forEach(function (row) {
      const statusMatch = currentStatus === 'all' || row.getAttribute('data-status') === currentStatus;
      const dateMatch = selectedDate === '' || row.getAttribute('data-date') === selectedDate;

      const reqNoCell = row.querySelector('.req-no');
      const reqNo = reqNoCell ? reqNoCell.textContent.trim().toLowerCase() : '';

      const cells = row.querySelectorAll('td');
      const studentName = cells[1] ? cells[1].textContent.trim().toLowerCase() : '';
      const parentName = cells[2] ? cells[2].textContent.trim().toLowerCase() : '';

      const searchMatch = searchTerm === '' ||
        reqNo.includes(searchTerm) ||
        studentName.includes(searchTerm) ||
        parentName.includes(searchTerm);

      const isMatch = statusMatch && dateMatch && searchMatch;
      row.style.display = isMatch ? '' : 'none';
      if (isMatch) visibleCount++;
    });

    if (noResultsRow) {
      noResultsRow.style.display = visibleCount === 0 ? '' : 'none';
    }
  }

  // Status filter dropdown options
  filterOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      currentStatus = option.getAttribute('data-status');

      if (filterLabel) filterLabel.textContent = option.textContent.trim();

      filterOptions.forEach(function (opt) {
        opt.classList.remove('active');
      });
      option.classList.add('active');

      if (filterPanel) filterPanel.classList.remove('show');

      applyFilters();
    });
  });

  // Search by Request ID, Student Name, or Parent/Guardian
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', applyFilters);
  }

  // Date Submitted filter
  if (dateInput) {
    dateInput.addEventListener('change', applyFilters);
  }

  // Clear Filters — resets status, search, and date back to defaults
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      currentStatus = 'all';
      if (searchInput) searchInput.value = '';
      if (dateInput) dateInput.value = '';
      if (filterLabel) filterLabel.textContent = 'All Statuses';

      filterOptions.forEach(function (opt) {
        opt.classList.remove('active');
      });

      applyFilters();
    });
  }
});

// Status + Date + Document filter + search (Release & Completed page)
document.addEventListener('DOMContentLoaded', function () {
  const filterOptions = document.querySelectorAll('#release-status-filter-panel .status-filter-option');
  const filterLabel = document.getElementById('release-status-filter-label');
  const filterPanel = document.getElementById('release-status-filter-panel');
  const searchInput = document.getElementById('release-search-input');
  const tableRows = document.querySelectorAll('#release-requests-table tbody tr[data-status]');
  const noResultsRow = document.getElementById('release-no-results-row');

  if (!tableRows.length) return;

  // Advanced filter panel pieces
  const advPanel = document.getElementById('release-adv-filter-panel');
  const advPills = advPanel ? advPanel.querySelectorAll('.adv-filter-pill') : [];
  const dateField = document.getElementById('release-adv-date-field');
  const documentField = document.getElementById('release-adv-document-field');
  const dateInput = document.getElementById('release-adv-date-input');
  const documentSelect = document.getElementById('release-adv-document-select');
  const clearBtn = document.getElementById('release-adv-filter-clear');

  let currentStatus = 'all';

  function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedDate = dateInput ? dateInput.value : '';
    const selectedDocument = documentSelect ? documentSelect.value : '';
    let visibleCount = 0;

    tableRows.forEach(function (row) {
      const statusMatch = currentStatus === 'all' || row.getAttribute('data-status') === currentStatus;
      const dateMatch = selectedDate === '' || row.getAttribute('data-date') === selectedDate;
      const documentMatch = selectedDocument === '' || row.getAttribute('data-document') === selectedDocument;

      const reqNoCell = row.querySelector('.req-no');
      const reqNo = reqNoCell ? reqNoCell.textContent.trim().toLowerCase() : '';

      const cells = row.querySelectorAll('td');
      const nameCell = cells[1] ? cells[1].textContent.trim().toLowerCase() : '';

      const searchMatch = searchTerm === '' || reqNo.includes(searchTerm) || nameCell.includes(searchTerm);

      const isMatch = statusMatch && dateMatch && documentMatch && searchMatch;
      row.style.display = isMatch ? '' : 'none';
      if (isMatch) visibleCount++;
    });

    if (noResultsRow) {
      noResultsRow.style.display = visibleCount === 0 ? '' : 'none';
    }
  }

  // "All Statuses" dropdown (unchanged behavior)
  filterOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      currentStatus = option.getAttribute('data-status');

      if (filterLabel) filterLabel.textContent = option.textContent.trim();

      filterOptions.forEach(function (opt) {
        opt.classList.remove('active');
      });
      option.classList.add('active');

      if (filterPanel) filterPanel.classList.remove('show');

      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Advanced filter pills: "Status" opens the existing dropdown, others reveal a field
  advPills.forEach(function (pill) {
    pill.addEventListener('click', function (event) {
      event.stopPropagation();
      const type = pill.getAttribute('data-filter');

      if (type === 'status') {
        if (advPanel) advPanel.classList.remove('show');
        if (filterPanel) filterPanel.classList.add('show');
        return;
      }

      if (type === 'date' && dateField) {
        dateField.hidden = !dateField.hidden;
        if (documentField) documentField.hidden = true;
      }

      if (type === 'document' && documentField) {
        documentField.hidden = !documentField.hidden;
        if (dateField) dateField.hidden = true;
      }
    });
  });

  if (dateInput) {
    dateInput.addEventListener('change', applyFilters);
  }

  if (documentSelect) {
    documentSelect.addEventListener('change', applyFilters);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      currentStatus = 'all';
      if (searchInput) searchInput.value = '';
      if (dateInput) dateInput.value = '';
      if (documentSelect) documentSelect.value = '';
      if (filterLabel) filterLabel.textContent = 'All Statuses';

      filterOptions.forEach(function (opt) {
        opt.classList.remove('active');
      });

      if (dateField) dateField.hidden = true;
      if (documentField) documentField.hidden = true;

      applyFilters();
    });
  }
});

// Status & Timeline progression (Request Details page)
document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.status-timeline .timeline-step');
  const processingBtn = document.getElementById('mark-processing-btn');
  const readyBtn = document.getElementById('mark-ready-btn');
  const statusBadge = document.querySelector('.current-status-badge');

  if (!steps.length) return;

  const stepLabels = Array.from(steps).map(function (step) {
    return step.querySelector('.timeline-step-title').textContent.trim();
  });

  function getCurrentIndex() {
    let activeIndex = 0;
    steps.forEach(function (step, index) {
      if (step.classList.contains('timeline-step-active')) activeIndex = index;
    });
    return activeIndex;
  }

  function formatNow() {
    const now = new Date();
    const datePart = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timePart = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return datePart + ', ' + timePart;
  }

  function setActiveStep(targetIndex) {
    const currentIndex = getCurrentIndex();

    // Only allow moving forward, never back to an earlier step
    if (targetIndex <= currentIndex) return;

    steps.forEach(function (step, index) {
      const icon = step.querySelector('.timeline-step-icon');
      const timeEl = step.querySelector('.timeline-step-time');

      step.classList.remove('timeline-step-done', 'timeline-step-active', 'timeline-step-pending');

      if (index < targetIndex) {
        step.classList.add('timeline-step-done');

        if (!icon.querySelector('img')) {
          icon.innerHTML = '<img src="assets/icons/check.svg" alt="">';
        }

        if (timeEl && (timeEl.textContent.trim() === 'Active Step' || timeEl.textContent.trim() === '')) {
          timeEl.textContent = formatNow();
        }
      } else if (index === targetIndex) {
        step.classList.add('timeline-step-active');
        icon.innerHTML = '';

        if (timeEl) {
          timeEl.textContent = 'Active Step';
        } else {
          const newTime = document.createElement('p');
          newTime.className = 'timeline-step-time';
          newTime.textContent = 'Active Step';
          step.querySelector('.timeline-step-text').appendChild(newTime);
        }
      } else {
        step.classList.add('timeline-step-pending');
        icon.innerHTML = '';
      }
    });

    if (statusBadge) {
      statusBadge.lastChild.textContent = ' ' + stepLabels[targetIndex];
    }
  }

  // Approve marks "Under Review" as done, no step is active yet
  function markApproved() {
    const reviewIndex = stepLabels.indexOf('Under Review');

    steps.forEach(function (step, index) {
      const icon = step.querySelector('.timeline-step-icon');
      const timeEl = step.querySelector('.timeline-step-time');

      step.classList.remove('timeline-step-done', 'timeline-step-active', 'timeline-step-pending');

      if (index <= reviewIndex) {
        step.classList.add('timeline-step-done');

        if (!icon.querySelector('img')) {
          icon.innerHTML = '<img src="assets/icons/check.svg" alt="">';
        }

        if (timeEl && (timeEl.textContent.trim() === 'Active Step' || timeEl.textContent.trim() === '')) {
          timeEl.textContent = formatNow();
        }
      } else {
        step.classList.add('timeline-step-pending');
        icon.innerHTML = '';
      }
    });

    if (statusBadge) {
      statusBadge.lastChild.textContent = ' Approved';
    }
  }

  // Approve Request with confirmation popup
  const approveBtn = document.getElementById('approve-btn');
  const modal = document.getElementById('approve-modal');
  const confirmBtn = document.getElementById('approve-confirm-btn');
  const cancelBtn = document.getElementById('approve-cancel-btn');
  const toast = document.getElementById('approve-toast');

  if (approveBtn && modal) {
    approveBtn.addEventListener('click', function () {
      modal.hidden = false;
    });

    cancelBtn.addEventListener('click', function () {
      modal.hidden = true;
    });

    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.hidden = true;
    });

    confirmBtn.addEventListener('click', function () {
      modal.hidden = true;

      markApproved();

      // Decision is made, so replace Reject/Approve with a label
      const actions = document.querySelector('.details-header-actions');
      if (actions) {
        actions.innerHTML = '<span class="approved-label">Approved</span>';
      }

      // Next step is Processing
      if (processingBtn) processingBtn.disabled = false;

      if (toast) {
        toast.classList.add('show');
        setTimeout(function () {
          toast.classList.remove('show');
        }, 3000);
      }
    });
  }

  // Reject Request: confirmation popup with a required reason
  const rejectBtn = document.getElementById('reject-btn');
  const rejectModal = document.getElementById('reject-modal');
  const rejectConfirmBtn = document.getElementById('reject-confirm-btn');
  const rejectCancelBtn = document.getElementById('reject-cancel-btn');
  const rejectReasonSelect = document.getElementById('reject-reason');
  const rejectReasonError = document.getElementById('reject-reason-error');
  const rejectToast = document.getElementById('reject-toast');
  const rejectOtherField = document.getElementById('reject-other-field');
  const rejectOtherText = document.getElementById('reject-other-text');
  const rejectOtherError = document.getElementById('reject-other-error');

  if (rejectReasonSelect) {
    rejectReasonSelect.addEventListener('change', function () {
      rejectOtherField.style.display = rejectReasonSelect.value === 'other' ? 'block' : 'none';
    });
  }
  if (rejectBtn && rejectModal) {
    rejectBtn.addEventListener('click', function () {
      rejectModal.hidden = false;
    });

    rejectCancelBtn.addEventListener('click', function () {
      rejectModal.hidden = true;
    });

    rejectModal.addEventListener('click', function (event) {
      if (event.target === rejectModal) rejectModal.hidden = true;
    });

    rejectConfirmBtn.addEventListener('click', function () {
      if (!rejectReasonSelect.value) {
        rejectReasonError.style.display = 'block';
        return;
      }
      rejectReasonError.style.display = 'none';

      if (rejectReasonSelect.value === 'other' && !rejectOtherText.value.trim()) {
        rejectOtherError.style.display = 'block';
        return;
      }
      if (rejectOtherError) rejectOtherError.style.display = 'none';

      rejectModal.hidden = true;

      // Gray out the whole timeline to show the request is closed
      steps.forEach(function (step) {
        step.classList.remove('timeline-step-done', 'timeline-step-active');
        step.classList.add('timeline-step-pending');
        step.querySelector('.timeline-step-icon').innerHTML = '';
      });

      if (statusBadge) {
        statusBadge.lastChild.textContent = ' Rejected';
      }

      const actions = document.querySelector('.details-header-actions');
      if (actions) {
        actions.innerHTML = '<span class="rejected-label">Rejected</span>';
      }

      if (processingBtn) processingBtn.disabled = true;
      if (readyBtn) readyBtn.disabled = true;

      if (rejectToast) {
        rejectToast.classList.add('show');
        setTimeout(function () {
          rejectToast.classList.remove('show');
        }, 3000);
      }
    });
  }

  // Mark as Processing (enables the Ready button)
  if (processingBtn) {
    processingBtn.addEventListener('click', function () {
      setActiveStep(stepLabels.indexOf('Processing'));
      processingBtn.disabled = true;
      if (readyBtn) readyBtn.disabled = false;
    });
  }

  // Mark as Ready for Release (disables itself after use)
  if (readyBtn) {
    readyBtn.addEventListener('click', function () {
      setActiveStep(stepLabels.indexOf('Ready for Release'));
      readyBtn.disabled = true;
    });
  }
});

// Feedback Management page: rating filter + sort + search
document.addEventListener('DOMContentLoaded', function () {
  const feedbackList = document.querySelector('.feedback-list');
  const feedbackItems = Array.from(document.querySelectorAll('.feedback-item'));
  const noResults = document.getElementById('feedback-no-results');
  const searchInput = document.getElementById('feedback-search-input');

  if (!feedbackItems.length) return;

  const ratingOptions = document.querySelectorAll('#feedback-rating-filter-panel .status-filter-option');
  const ratingLabel = document.getElementById('feedback-rating-filter-label');
  const ratingPanel = document.getElementById('feedback-rating-filter-panel');

  const sortOptions = document.querySelectorAll('#feedback-sort-panel .status-filter-option');
  const sortLabel = document.getElementById('feedback-sort-label');
  const sortPanel = document.getElementById('feedback-sort-panel');

  let currentRating = 'all';
  let currentSort = 'newest';

  function applyFiltersAndSort() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    // Filter — hides items that don't match the rating tier or search term
    feedbackItems.forEach(function (item) {
      const ratingMatch = currentRating === 'all' || item.getAttribute('data-rating') === currentRating;

      const nameEl = item.querySelector('.feedback-name');
      const quoteEl = item.querySelector('.feedback-quote');
      const name = nameEl ? nameEl.textContent.trim().toLowerCase() : '';
      const quote = quoteEl ? quoteEl.textContent.trim().toLowerCase() : '';
      const pills = Array.from(item.querySelectorAll('.feedback-pill'))
        .map(function (pill) { return pill.textContent.trim().toLowerCase(); })
        .join(' ');

      const searchMatch = searchTerm === '' ||
        name.includes(searchTerm) ||
        quote.includes(searchTerm) ||
        pills.includes(searchTerm);

      const isMatch = ratingMatch && searchMatch;
      item.style.display = isMatch ? '' : 'none';
      if (isMatch) visibleCount++;
    });

    // Sort — reorders every item (visible or hidden) so filters + sort combine correctly
    const sorted = feedbackItems.slice().sort(function (a, b) {
      const dateA = a.getAttribute('data-date');
      const dateB = b.getAttribute('data-date');
      const starsA = parseInt(a.getAttribute('data-stars'), 10);
      const starsB = parseInt(b.getAttribute('data-stars'), 10);

      switch (currentSort) {
        case 'oldest':
          return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
        case 'highest':
          return starsB - starsA;
        case 'lowest':
          return starsA - starsB;
        case 'newest':
        default:
          return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
      }
    });

    sorted.forEach(function (item) {
      feedbackList.appendChild(item);
    });

    // Keep the "no results" message
    if (noResults) {
      feedbackList.appendChild(noResults);
      noResults.style.display = visibleCount === 0 ? '' : 'none';
    }
  }

  // Rating filter dropdown
  ratingOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      currentRating = option.getAttribute('data-rating');

      if (ratingLabel) ratingLabel.textContent = option.textContent.trim();

      ratingOptions.forEach(function (opt) {
        opt.classList.remove('active');
      });
      option.classList.add('active');

      if (ratingPanel) ratingPanel.classList.remove('show');

      applyFiltersAndSort();
    });
  });

  // Sort dropdown
  sortOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      currentSort = option.getAttribute('data-sort');

      if (sortLabel) sortLabel.textContent = option.textContent.trim();

      sortOptions.forEach(function (opt) {
        opt.classList.remove('active');
      });
      option.classList.add('active');

      if (sortPanel) sortPanel.classList.remove('show');

      applyFiltersAndSort();
    });
  });

  // Search by name, request number/document tag, or quote text
  if (searchInput) {
    searchInput.addEventListener('input', applyFiltersAndSort);
  }
});

// Prefill Document Type dropdown from URL query parameter (Request Form page)
document.addEventListener('DOMContentLoaded', function () {
  const docTypeSelect = document.getElementById('document-type');
  if (!docTypeSelect) return;

  const params = new URLSearchParams(window.location.search);
  const docParam = params.get('doc');

  if (docParam) {
    const exists = Array.from(docTypeSelect.options).some(opt => opt.value === docParam);
    if (exists) docTypeSelect.value = docParam;
  }
});