document.addEventListener("DOMContentLoaded", function () {
    const priceElement = document.getElementById("price-display");
    const rawCents = parseFloat(priceElement.textContent);

    // Convert cents to dollars
    const dollars = rawCents / 100;

    const formattedPrice = new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'USD'
    }).format(dollars);

    priceElement.textContent = formattedPrice;
});