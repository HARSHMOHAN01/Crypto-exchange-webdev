document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const walletSection = document.getElementById('wallet-section');
    const loginSection = document.getElementById('login-section');
    const walletForm = document.getElementById('wallet-form');
    const walletMessage = document.getElementById('wallet-message');

    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin';

    // Handle login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            loginSection.style.display = 'none';
            walletSection.style.display = 'block';
        } else {
            loginError.textContent = 'Invalid username or password';
        }
    });

    // Handle wallet addition
    walletForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const walletUsername = document.getElementById('wallet-username').value;
        const walletPassword = document.getElementById('wallet-password').value;

        if (walletUsername && walletPassword) {
            walletMessage.textContent = `Wallet for ${walletUsername} added successfully.`;
            setTimeout(() => {
                window.location.href = 'bank.html';
            }, 1000); // Redirect after 1 second
        } else {
            walletMessage.textContent = 'Please provide valid wallet credentials.';
        }
    });
});
