document.addEventListener('DOMContentLoaded', () => {
    const taxForm = document.getElementById('taxForm');
    const recordsTable = document.getElementById('recordsTable').getElementsByTagName('tbody')[0];
    const totalsDiv = document.getElementById('totals');
    const records = [];

    function updateTotals() {
        const totals = {};
        records.forEach(record => {
            if (!totals[record.category]) {
                totals[record.category] = 0;
            }
            totals[record.category] += parseFloat(record.amount);
        });

        let totalsHtml = '<strong>Totals:</strong><br>';
        for (const [category, amount] of Object.entries(totals)) {
            totalsHtml += `${category}: $${amount.toFixed(2)}<br>`;
        }
        totalsDiv.innerHTML = totalsHtml;
    }

    taxForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;

        if (date && description && category && amount) {
            const newRecord = { date, description, category, amount };
            records.push(newRecord);

            // Add record to table
            const row = recordsTable.insertRow();
            row.insertCell(0).textContent = date;
            row.insertCell(1).textContent = description;
            row.insertCell(2).textContent = category;
            row.insertCell(3).textContent = `$${parseFloat(amount).toFixed(2)}`;

            updateTotals();

            // Clear form fields
            taxForm.reset();
        }
    });
});
