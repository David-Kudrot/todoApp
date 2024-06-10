
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;

        const formData = {
            email: email,
            name: name,
            password: password,
            password2: password2
        };

        try {
            const response = await fetch('https://todo-app-backend-08b7.onrender.com/api/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log('Registration Success:', data);

            window.location.href = "index.html";
        } catch (error) {
            console.error('Error:', error);
            // Handle errors (e.g., show error message to the user)
        }
    });
