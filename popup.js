document.addEventListener('DOMContentLoaded', function () {
    // Load saved values from localStorage
    document.getElementById('balance').value = localStorage.getItem('balance') || '';
    document.getElementById('risk').value = localStorage.getItem('risk') || '';
    document.getElementById('stopLoss').value = localStorage.getItem('stopLoss') || '';

    // Load saved trades from localStorage
    loadTrades();

    // Function to open tabs
    function openTab(tabName) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        const buttons = document.querySelectorAll('.tab-button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
    }

    // Initial call to set the default tab
    openTab('positionSizeTab');

    // Add event listeners for tab buttons
    document.querySelector('.tab-button[onclick="openTab(\'positionSizeTab\')"]').addEventListener('click', function() {
        openTab('positionSizeTab');
    });

    document.querySelector('.tab-button[onclick="openTab(\'tradeLogTab\')"]').addEventListener('click', function() {
        openTab('tradeLogTab');
    });

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

    // Add trade button event listener
    document.getElementById('addTrade').addEventListener('click', function() {
        const entryPrice = document.getElementById('entryPrice').value;
        const profit = document.getElementById('profit').value;

        if (entryPrice && profit) {
            const trade = {
                entryPrice: parseFloat(entryPrice).toFixed(2),
                profit: parseFloat(profit).toFixed(2)
            };

            // Save trade to localStorage
            saveTrade(trade);
            
            // Clear the inputs
            document.getElementById('entryPrice').value = '';
            document.getElementById('profit').value = '';
        } else {
            alert('Please enter both Entry Price and Profit.');
        }
    });

    function saveTrade(trade) {
        let trades = JSON.parse(localStorage.getItem('trades')) || [];
        trades.push(trade);
        localStorage.setItem('trades', JSON.stringify(trades));
        addTradeRow(trade);
        updateTotalProfit();
    }

    function loadTrades() {
        const trades = JSON.parse(localStorage.getItem('trades')) || [];
        trades.forEach(trade => addTradeRow(trade));
        updateTotalProfit();
    }

    function addTradeRow(trade) {
        const tableBody = document.querySelector('#tradeList tbody');
        
        // Create a new row
        const newRow = document.createElement('tr');
        
        // Create and append cells
        const entryCell = document.createElement('td');
        entryCell.textContent = trade.entryPrice;
        newRow.appendChild(entryCell);
        
        const profitCell = document.createElement('td');
        profitCell.textContent = trade.profit;
        newRow.appendChild(profitCell);
        
        // Append the new row to the table body
        tableBody.appendChild(newRow);
    }

    function updateTotalProfit() {
        const rows = document.querySelectorAll('#tradeList tbody tr');
        let totalProfit = 0;

        rows.forEach(row => {
            const profit = parseFloat(row.cells[1].textContent);
            totalProfit += profit;
        });

        document.getElementById('totalProfit').textContent = `$${totalProfit.toFixed(2)}`;
    }
});