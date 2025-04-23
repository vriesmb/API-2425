// document.addEventListener("DOMContentLoaded", function () {
//     const priceElement = document.getElementById("price-display");

//     const price = priceElement.textContent;

//     if (!price) {
//         priceElement.textContent = 'Is not available yet';
//         return;
//     }

//     const rawCents = parseFloat(price);

//     // hier van cents naar dollars
//     const dollars = rawCents / 100;

//     const formattedPrice = new Intl.NumberFormat('nl-NL', {
//         style: 'currency',
//         currency: 'USD'
//     }).format(dollars);

//     priceElement.textContent = formattedPrice;
// });