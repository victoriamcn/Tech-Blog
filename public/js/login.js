// LOGIN FUNCTION
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Check if the user is already logged in
      const loggedInResponse = await fetch('/api/users/checkLoggedIn');
      const loggedInData = await loggedInResponse.json();
      
      if (loggedInData.loggedIn) {
        // If the user is already logged in, redirect to the dashboard
        document.location.replace('/dashboard');
      } else {
        // Otherwise, redirect to the login page
        document.location.href = '/dashboard';
      }
    } else {
      const errorMessage = await response.text();
      alert(errorMessage || 'Failed to log in');
    }

    if (err.response && err.response.status === 400) {
      alert(err.response.data.message);
    } else {
      alert('An error occurred while logging in.');
    }
  }
};

//SIGNUP FUNCTION
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (password.length < 6) {
    alert('Password must be at least 6 characters long');
    return;
  }

  if (username && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Check if the user is already logged in
      const loggedInResponse = await fetch('/api/users/checkLoggedIn');
      const loggedInData = await loggedInResponse.json();
      
      if (loggedInData.loggedIn) {
        // If the user is already logged in, redirect to the dashboard
        document.location.href = '/dashboard';
      } else {
        // Otherwise, redirect to the login page
        document.location.replace('/login');
      }
    } else {
      const errorMessage = await response.text();
      alert(errorMessage || 'Failed to log in');
    }

    if (err.response && err.response.status === 400) {
      alert(err.response.data.message);
    } else {
      alert('An error occurred while logging in.');
    }
  }
};

// LOG-IN EVENT LISTENER
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


// SIGN-UP EVENT LISTENER
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);