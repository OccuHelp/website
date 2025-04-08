/**
 * OccuHelp Pricing Calculator
 * Calculates subscription costs based on quantity and tier selections
 * Prices provided are monthly rates
 */

document.addEventListener('DOMContentLoaded', function() {
    // Price tables based on provided data (monthly prices)
    const priceTables = {
        fullAccess: [
            { quantity: 1, price: 275 },
            { quantity: 2, price: 265 },
            { quantity: 3, price: 255 },
            { quantity: 4, price: 245 },
            { quantity: 5, price: 235 },
            { quantity: 6, price: 225 },
            { quantity: 7, price: 215 },
            { quantity: 8, price: 205 },
            { quantity: 9, price: 195 },
            { quantity: 10, price: 185 },
            { quantity: 11, price: 175 }
            // 12+ remains at 175
        ],
        viewerOnly: [
            { quantity: 1, price: 125 },
            { quantity: 2, price: 120 },
            { quantity: 3, price: 115 },
            { quantity: 4, price: 110 },
            { quantity: 5, price: 105 },
            { quantity: 6, price: 100 },
            { quantity: 7, price: 95 },
            { quantity: 8, price: 90 },
            { quantity: 9, price: 85 },
            { quantity: 10, price: 80 },
            { quantity: 11, price: 75 }
            // 12+ remains at 75
        ],
        companies: [
            { quantity: 1, price: 50 },
            { quantity: 2, price: 48 },
            { quantity: 3, price: 46 },
            { quantity: 4, price: 44 },
            { quantity: 5, price: 42 },
            { quantity: 6, price: 40 },
            { quantity: 7, price: 38 },
            { quantity: 8, price: 36 },
            { quantity: 9, price: 34 },
            { quantity: 10, price: 32 },
            { quantity: 11, price: 30 }
            // 12+ remains at 30
        ]
    };

    // Security maintenance fee (monthly) - always applied
    const securityFee = 500;

    // Standard rates (without bulk discount)
    const standardRates = {
        fullAccess: 275,
        viewerOnly: 125,
        companies: 50
    };

    // Get form elements
    const calculator = document.getElementById('price-calculator');
    const fullAccessInput = document.getElementById('full-access-qty');
    const viewerOnlyInput = document.getElementById('viewer-only-qty');
    const companiesInput = document.getElementById('companies-qty');
    const monthlyDisplay = document.getElementById('monthly-price');
    const annualDisplay = document.getElementById('annual-price');

    // Set minimum values for required subscriptions
    if (fullAccessInput) {
        fullAccessInput.min = 1;
        fullAccessInput.value = 1;
    }

    if (companiesInput) {
        companiesInput.min = 1;
        companiesInput.value = 1;
    }

    // Calculate price based on quantity and tier
    function calculatePrice(tier, quantity) {
        if (quantity <= 0) return 0;

        const priceTable = priceTables[tier];

        // If quantity is greater than the last entry in the table, use the last price
        if (quantity >= priceTable[priceTable.length - 1].quantity) {
            return priceTable[priceTable.length - 1].price * quantity;
        }

        // Find the price for the given quantity
        for (let i = 0; i < priceTable.length; i++) {
            if (priceTable[i].quantity === quantity) {
                return priceTable[i].price * quantity;
            }
        }

        // If quantity not found (shouldn't happen with our data), use the closest lower tier
        for (let i = priceTable.length - 1; i >= 0; i--) {
            if (priceTable[i].quantity < quantity) {
                return priceTable[i].price * quantity;
            }
        }

        return 0;
    }

    // Update the total price display
    function updateTotal() {
        // Ensure minimum values are respected
        const fullAccessQty = Math.max(parseInt(fullAccessInput.value) || 1, 1);
        const viewerOnlyQty = parseInt(viewerOnlyInput.value) || 0;
        const companiesQty = Math.max(parseInt(companiesInput.value) || 1, 1);

        // Update input fields to reflect minimum values
        fullAccessInput.value = fullAccessQty;
        companiesInput.value = companiesQty;

        // Calculate discounted prices
        const fullAccessTotal = calculatePrice('fullAccess', fullAccessQty);
        const viewerOnlyTotal = calculatePrice('viewerOnly', viewerOnlyQty);
        const companiesTotal = calculatePrice('companies', companiesQty);

        // Calculate standard prices (without bulk discount)
        const standardFullAccessTotal = standardRates.fullAccess * fullAccessQty;
        const standardViewerOnlyTotal = standardRates.viewerOnly * viewerOnlyQty;
        const standardCompaniesTotal = standardRates.companies * companiesQty;

        // Calculate monthly total with discounted rates
        let monthlyTotal = fullAccessTotal + viewerOnlyTotal + companiesTotal + securityFee;

        // Calculate monthly total with standard rates
        let standardMonthlyTotal = standardFullAccessTotal + standardViewerOnlyTotal + standardCompaniesTotal + securityFee;

        // Calculate savings
        const monthlySavings = standardMonthlyTotal - monthlyTotal;
        const annualSavings = monthlySavings * 12;
        const savingsPercentage = monthlySavings > 0 ? (monthlySavings / standardMonthlyTotal) * 100 : 0;

        // Format the monthly total with commas and dollar sign
        const formattedMonthly = '$' + monthlyTotal.toLocaleString('en-US');

        // Calculate annual total (monthly × 12)
        const annualTotal = monthlyTotal * 12;
        const standardAnnualTotal = standardMonthlyTotal * 12;
        const formattedAnnual = '$' + annualTotal.toLocaleString('en-US');
        const formattedStandardAnnual = '$' + standardAnnualTotal.toLocaleString('en-US');

        // Format savings
        const formattedSavings = '$' + annualSavings.toLocaleString('en-US');
        const formattedPercentage = savingsPercentage.toFixed(1) + '%';

        // Update the displays
        monthlyDisplay.textContent = formattedMonthly;
        annualDisplay.textContent = formattedAnnual;

        // Get savings elements
        const savingsSection = document.getElementById('savings-section');
        const standardPriceElement = document.getElementById('standard-price');
        const savingsAmountElement = document.getElementById('savings-amount');
        const savingsPercentageElement = document.getElementById('savings-percentage');
        const finalPriceElement = document.getElementById('final-price');
        const minimumBillElement = document.querySelector('#savings-section #monthly-price');

        // Show or hide savings section based on whether there are savings
        if (monthlySavings > 0) {
            savingsSection.style.display = 'block';
            standardPriceElement.textContent = formattedStandardAnnual;
            savingsAmountElement.textContent = formattedSavings.replace('$', '');
            savingsPercentageElement.textContent = formattedPercentage;
            finalPriceElement.textContent = formattedAnnual;

            // Update the minimum bill display in the savings section
            if (minimumBillElement) {
                minimumBillElement.textContent = formattedMonthly;
            }
        } else {
            savingsSection.style.display = 'none';
        }
    }

    // Add event listeners to form inputs
    if (calculator) {
        fullAccessInput.addEventListener('input', updateTotal);
        viewerOnlyInput.addEventListener('input', updateTotal);
        companiesInput.addEventListener('input', updateTotal);

        // Initialize with default values
        updateTotal();
    }
});
