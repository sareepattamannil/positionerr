document.addEventListener('DOMContentLoaded', function () {
    // Load saved values from localStorage
    document.getElementById('balance').value = localStorage.getItem('balance') || '';
    document.getElementById('risk').value = localStorage.getItem('risk') || '';
    document.getElementById('stopLoss').value = localStorage.getItem('stopLoss') || '';
    
    // Calculate button event listener
    document.getElementById('calculate').addEventListener('click', function () {
        const balance = parseFloat(document.getElementById('balance').value);
        const riskSize = parseFloat(document.getElementById('risk').value) / 100;
        const stopLoss = parseFloat(document.getElementById('stopLoss').value);

        if (isNaN(balance) || isNaN(riskSize) || isNaN(stopLoss) || stopLoss <= 0) {
            alert('Please enter valid values.');
            return;
        }

        const riskAmount = balance * riskSize;
        const positionSize = riskAmount / stopLoss;

        document.getElementById('riskAmount').innerText = `Risk Amount: $${riskAmount.toFixed(2)}`;
        document.getElementById('positionSize').innerText = `Position Size: ${positionSize.toFixed(2)} shares`;
    });

    // Save values to localStorage when inputs change
    document.getElementById('balance').addEventListener('input', function () {
        localStorage.setItem('balance', this.value);
    });

    document.getElementById('risk').addEventListener('input', function () {
        localStorage.setItem('risk', this.value);
    });

    document.getElementById('stopLoss').addEventListener('input', function () {
        localStorage.setItem('stopLoss', this.value);
    });
});