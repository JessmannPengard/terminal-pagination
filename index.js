const pageSize = 18; // Page size

let currentPage = 1; // Current page

const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52];

const preparedProducts = preparePagination(products);
const container = document.querySelector("#products-container");


renderPage(currentPage);


function renderPage(pageNumber) {
    currentPage = pageNumber;
    container.innerHTML = buildPage(currentPage, preparedProducts);
}


function buildPage(pageNumber) {

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageElements = preparedProducts.slice(startIndex, endIndex);

    let html = '';

    for (let i = 0; i < pageElements.length; i++) {
        if (i % 6 === 0) {
            html += '<div class="row">';
        }

        html += "<div class='col'><div class='card'>";
        html += pageElements[i] == "<" ? "<button onclick='renderPage(" + (currentPage - 1) + ")'><</button>" : pageElements[i] == ">" ? "<button onclick='renderPage(" + (currentPage + 1) + ")'>></button>" : pageElements[i];
        html += "</div></div>";

        if ((i + 1) % 6 === 0 || i === pageElements.length - 1) {
            html += '</div>'; // Close div at the end or every 6 elements
        }
    }

    return html;
}


function preparePagination(products) {
    const arrayLength = products.length;

    if (arrayLength <= pageSize) {
        return products; // If array is smaller than the page size, no modifications will be done
    }

    let paginatedProducts = [];
    let currentIndex = 0;

    while (currentIndex < arrayLength) {
        // Insert elements
        const elementsToInsert = Math.min(arrayLength - currentIndex, currentIndex === 0 ? (pageSize - 1) : (pageSize - 2));
        paginatedProducts = paginatedProducts.concat(products.slice(currentIndex, currentIndex + elementsToInsert));

        currentIndex += elementsToInsert;

        // Insert arrows
        if (currentIndex < arrayLength) {
            paginatedProducts.push('>');
            paginatedProducts.push('<');
        }
    }

    return paginatedProducts;
}
