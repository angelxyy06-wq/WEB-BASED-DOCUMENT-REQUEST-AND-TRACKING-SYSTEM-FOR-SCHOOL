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
 
  if (processingBtn) {
    processingBtn.addEventListener('click', function () {
      setActiveStep(stepLabels.indexOf('Processing'));
    });
  }
 
  if (readyBtn) {
    readyBtn.addEventListener('click', function () {
      setActiveStep(stepLabels.indexOf('Ready for Release'));
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
 