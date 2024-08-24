document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const cryptoBalanceElement = document.getElementById('crypto-balance');
    const cryptoSymbolElement = document.getElementById('crypto-symbol');
    const amountInput = document.getElementById('amount');
    const depositButton = document.getElementById('deposit');
    const withdrawButton = document.getElementById('withdraw');
    const transactionMessage = document.getElementById('transaction-message');
    const logoutButton = document.getElementById('logout');
    const closeWalletButton = document.getElementById('close-wallet');
    const cryptoSelect = document.getElementById('crypto-select');
    const sideSelect = document.getElementById('side-select');
    const betAmountInput = document.getElementById('bet-amount');
    const flipCoinButton = document.getElementById('flip-coin');
    const coinflipResult = document.getElementById('coinflip-result');
    const convertWarning = document.getElementById('convert-warning');

    let balance = 0;
    let cryptoBalance = 0;
    let selectedCrypto = 'eth';

    // Conversion rates (example rates, can be updated)
    const conversionRates = {
        'eth': 2000, // 1 ETH = $2000
        'sol': 30,   // 1 SOL = $30
        'btc': 30000 // 1 BTC = $30000
    };

    // Update balance display
    function updateBalance() {
        balanceElement.textContent = balance.toFixed(2);
    }

    // Update crypto balance display
    function updateCryptoBalance() {
        cryptoBalanceElement.textContent = cryptoBalance.toFixed(4);
        cryptoSymbolElement.textContent = selectedCrypto.toUpperCase();
    }

    // Handle deposit
    depositButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            transactionMessage.textContent = 'Please enter a valid amount.';
            return;
        }
        balance += amount;
        updateBalance();
        cryptoBalance += amount / conversionRates[selectedCrypto]; // Convert to crypto
        updateCryptoBalance();
        transactionMessage.textContent = `Deposited $${amount.toFixed(2)}`;
        amountInput.value = '';
    });

    // Handle withdrawal
    withdrawButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            transactionMessage.textContent = 'Please enter a valid amount.';
            return;
        }
        if (amount > balance) {
            transactionMessage.textContent = 'Insufficient balance.';
            return;
        }
        balance -= amount;
        updateBalance();
        cryptoBalance -= amount / conversionRates[selectedCrypto]; // Convert from crypto
        updateCryptoBalance();
        transactionMessage.textContent = `Withdrew $${amount.toFixed(2)}`;
        amountInput.value = '';
    });

    // Handle cryptocurrency selection
    cryptoSelect.addEventListener('change', (e) => {
        selectedCrypto = e.target.value;
        updateCryptoBalance(); // Update crypto balance display with new selection
    });

    // Handle coin flip
    flipCoinButton.addEventListener('click', () => {
        const userChoice = sideSelect.value;
        const betAmount = parseFloat(betAmountInput.value);
        if (isNaN(betAmount) || betAmount <= 0) {
            coinflipResult.textContent = 'Please enter a valid bet amount.';
            return;
        }
        if (betAmount > cryptoBalance) {
            coinflipResult.textContent = 'Insufficient crypto balance for this bet.';
            return;
        }

        const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';
        const resultMessage = flipResult === userChoice ? 
            `You won! It was ${flipResult}.` : 
            `You lost! It was ${flipResult}.`;

        if (flipResult === userChoice) {
            cryptoBalance += betAmount; // Win: Add bet amount to crypto balance
        } else {
            cryptoBalance -= betAmount; // Lose: Subtract bet amount from crypto balance
        }

        balance = cryptoBalance * conversionRates[selectedCrypto]; // Update balance from crypto balance
        updateBalance();
        updateCryptoBalance();
        coinflipResult.textContent = resultMessage;
        betAmountInput.value = '';
    });

    // Handle logout
    logoutButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Handle close wallet
    closeWalletButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Warn user to convert back to USD
    setTimeout(() => {
        convertWarning.textContent = 'Don\'t forget to convert your crypto back to USD before closing the wallet!';
    }, 5000); // Show warning after 5 seconds

    // Initialize displays
    updateBalance();
    updateCryptoBalance();
});
