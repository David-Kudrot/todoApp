document.addEventListener("DOMContentLoaded", function() {
  const form = {
    email: document.querySelector("#loginEmail"),
    password: document.querySelector("#loginPassword"),
    submit: document.querySelector("#signin-btn-submit"),
  };

  form.submit.addEventListener("click", (e) => {
    e.preventDefault();

    const loginEndpoint = 'http://127.0.0.1:8000/api/user/login/';

    fetch(loginEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      // Save token and user ID to local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      // Show profile and logout buttons, hide register and login buttons
      const registrationPart = document.querySelector('.registration-part');
      const profilePart = document.querySelector('.profile-part');
      if (registrationPart && profilePart) {
        registrationPart.style.display = 'none';
        profilePart.style.display = 'block';
      }

      // Redirect to index.html
      window.location.href = 'index2.html';
    })
    .catch((err) => {
      console.error(err);
    });
  });
});
