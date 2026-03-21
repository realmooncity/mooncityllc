// ===== AUTH STATE MANAGER =====
// Runs on every page to sync navbar auth items and service buttons.

const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  const signinItem = document.getElementById('nav-auth-signin');
  const userItem   = document.getElementById('nav-auth-user');
  const userEmail  = document.getElementById('nav-user-email');

  if (user) {
    if (signinItem) signinItem.style.display = 'none';
    if (userItem)   userItem.style.removeProperty('display');
    if (userEmail)  userEmail.textContent = user.email;
  } else {
    if (signinItem) signinItem.style.removeProperty('display');
    if (userItem)   userItem.style.display = 'none';
  }

  updateServiceButtons(!!user);
  prefillContactForm(user);
});

// Logout button (present on all pages via navbar)
const logoutBtn = document.getElementById('nav-logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => auth.signOut());
}

function prefillContactForm(user) {
  const nameInput  = document.getElementById('name');
  const emailInput = document.getElementById('email');
  if (!nameInput || !emailInput) return;

  if (user) {
    if (user.displayName) nameInput.value = user.displayName;
    emailInput.value = user.email;
    emailInput.readOnly = true;
    emailInput.style.opacity = '0.6';
  } else {
    nameInput.value = '';
    emailInput.value = '';
    emailInput.readOnly = false;
    emailInput.style.opacity = '';
  }
}

function updateServiceButtons(isLoggedIn) {
  document.querySelectorAll('.service-btn').forEach((btn) => {
    if (isLoggedIn) {
      btn.textContent = 'Book Now';
      btn.className = btn.className.replace('btn--outline', 'btn--primary');
      // When Stripe is ready, replace '#contact' with the Stripe checkout URL
      btn.href = '#contact';
    } else {
      btn.textContent = 'Sign In to Book';
      btn.className = btn.className.replace('btn--primary', 'btn--outline');
      btn.href = 'signin.html';
    }
  });
}