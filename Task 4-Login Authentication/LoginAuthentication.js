// Cache DOM elements for quick access
const loginForm = document.getElementById('loginForm');
const forgotForm = document.getElementById('forgotForm');
const registerForm = document.getElementById('registerForm');

const formHeading = document.getElementById('formHeading');

const forgotLink = document.getElementById('forgotLink');
const showRegisterBtn = document.getElementById('showRegisterBtn');

const cancelForgotBtn = document.getElementById('cancelForgotBtn');
const cancelRegisterBtn = document.getElementById('cancelRegisterBtn');

const forgotPassStrength = document.getElementById('forgotPassStrength');
const registerPassStrength = document.getElementById('registerPassStrength');

const newPassInput = document.getElementById('newPass');
const regPassInput = document.getElementById('regPass');

// Helper: Show one form, hide others
function showForm(formToShow) {
  [loginForm, forgotForm, registerForm].forEach(form => {
    form.classList.remove('active-form');
  });
  formToShow.classList.add('active-form');
}

// Password strength checker function
function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;               // length check
  if (/[A-Z]/.test(password)) strength++;             // uppercase check
  if (/[0-9]/.test(password)) strength++;             // number check
  if (/[\W]/.test(password)) strength++;               // special char check
  return strength;
}

// Update strength meter with emoji and color
function updateStrengthIndicator(element, password) {
  const strength = checkPasswordStrength(password);

  element.className = 'strength-meter';  // reset classes

  let strengthText = 'Weak';

  if (strength <= 1) {
    strengthText = 'Weak';
    element.classList.add('strength-weak');
  } else if (strength === 2 || strength === 3) {
    strengthText = 'Medium';
    element.classList.add('strength-medium');
  } else if (strength === 4) {
    strengthText = 'Strong';
    element.classList.add('strength-strong');
  }

  element.textContent = strengthText; // Emoji via CSS ::before
}

// Event listeners for password strength update on forgot form
newPassInput.addEventListener('input', () => {
  updateStrengthIndicator(forgotPassStrength, newPassInput.value);
});

// Event listeners for password strength update on register form
regPassInput.addEventListener('input', () => {
  updateStrengthIndicator(registerPassStrength, regPassInput.value);
});

// Toggle to Forgot Password form
forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  formHeading.textContent = 'Reset Password 🔑';
  showForm(forgotForm);
});

// Toggle to Register form
showRegisterBtn.addEventListener('click', () => {
  formHeading.textContent = 'Register 📝';
  showForm(registerForm);
});

// Cancel buttons go back to login
cancelForgotBtn.addEventListener('click', () => {
  formHeading.textContent = 'Login 🔐';
  showForm(loginForm);
});

cancelRegisterBtn.addEventListener('click', () => {
  formHeading.textContent = 'Login 🔐';
  showForm(loginForm);
});

// Handle Login Form Submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;

  // Get users from localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if user exists and password matches
  const foundUser = users.find(u => u.userId === user || u.email === user);

  if (!foundUser) {
    alert('User not found. Please register first.');
    return;
  }

  if (foundUser.password !== pass) {
    alert('Incorrect password!');
    return;
  }

  alert(`Welcome back, ${foundUser.userId}! 🎉`);

  // TODO: Redirect to secure page or dashboard
});

// Handle Forgot Password Submit
forgotForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPass = newPassInput.value;
  const confirmPass = document.getElementById('confirmNewPass').value;

  if (newPass !== confirmPass) {
    alert('Passwords do not match!');
    return;
  }

  // Here, you could add more secure update logic
  alert('Password updated successfully! Please login with your new password.');
  formHeading.textContent = 'Login 🔐';
  showForm(loginForm);
});

// Handle Register Form Submit
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('regEmail').value.trim();
  const userId = document.getElementById('regUserId').value.trim();
  const password = document.getElementById('regPass').value;
  const confirmPass = document.getElementById('regConfirmPass').value;
  const rememberMe = document.getElementById('regRememberMe').checked;

  if (password !== confirmPass) {
    alert('Passwords do not match!');
    return;
  }

  // Validate user uniqueness
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some(u => u.userId === userId || u.email === email)) {
    alert('User ID or Email already registered.');
    return;
  }

  // Save new user to localStorage
  users.push({ email, userId, password, rememberMe });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration successful! Please login.');
  formHeading.textContent = 'Login 🔐';
  showForm(loginForm);
});
