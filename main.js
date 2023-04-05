// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

function uppercase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let initProducts = () => {
    // To see the shirts object, run:
    //console.log(shirts);

    // Your Code Here
    fetch('shirts.js')
    const container = document.getElementById("product-container");
    container.classList.add("product-container");

    // Iterate through the data in shirts.js and create an entry for each item
    for (let i = 0; i < shirts.length; i++) {
    // Create a new product entry element
    const entry = document.createElement("div");
    entry.classList.add("product-entry");

    // Create a new image element for the main picture
    const img = document.createElement("img");
    img.classList.add("product-img");
    img.src = shirts[i].colors[Object.keys(shirts[i].colors)[0]].front;
    img.onclick = function() {
        sessionStorage.setItem('selectedProduct', JSON.stringify(shirts[i]));
        window.location.href = 'details.html';
    };
    entry.appendChild(img);

    // Create a new heading element for the product name
    const name = document.createElement("h2");
    name.classList.add("product-name");
    name.classList.add("text");
    name.textContent = shirts[i].name;
    entry.appendChild(name);

    // Create a new paragraph element for the number of colors available
    const colors = document.createElement("p");
    colors.classList.add("product-colors");
    colors.classList.add("text");
    const count = Object.keys(shirts[i].colors).length;
    colors.textContent = `Available in ${count} color` + (count === 1 ? '' : 's');
    entry.appendChild(colors);

    const buttonbox = document.createElement("div");
    buttonbox.classList.add("button-box")

    const button1 = document.createElement("button");
    button1.classList.add("quick-view");
    button1.textContent = "Quick View";
    button1.style.color = '#dbdbdb';
    button1.style.fontFamily = 'Open Sans';

    button1.onmouseover = function() {
        button1.style.color = 'white';
    };

    button1.onmouseout = function() {
        button1.style.color = '#dbdbdb';
    };

    button1.onclick = function() {
        window.location.href = 'not_implemented.html';
    };

    const button2 = document.createElement("button");
    button2.classList.add("product-details");
    button2.textContent = "See page";
    button2.style.color = '#dbdbdb';
    button2.style.fontFamily = 'Open Sans';

    button2.onclick = function() {
        sessionStorage.setItem('selectedProduct', JSON.stringify(shirts[i]));
        window.location.href = 'details.html';
    };

    button2.onmouseover = function() {
        button2.style.color = 'white';
    };

    button2.onmouseout = function() {
        button2.style.color = '#dbdbdb';
    };

    buttonbox.appendChild(button1);
    buttonbox.appendChild(button2);
    
    entry.appendChild(buttonbox);

    container.appendChild(entry);
    }
};

let initDetails = () => {
    const container = document.getElementById("detail-container");
    container.classList.add("detail-container");


    // Retrieve the selected product information from sessionStorage
    const selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct'));
  
    // Create a new heading element for the product name
    const name = document.getElementById("product-name");
    name.textContent = selectedProduct.name;

    // Create a new product detail entry element
    const entry = document.createElement("div");
    entry.classList.add("product-detail-entry");

    document.querySelector('#product-price').textContent = selectedProduct.price;
    document.querySelector('#product-description').textContent = selectedProduct.description;

    var colorButtons = document.querySelector(".color-buttons");
    var sideButtons = document.querySelector(".side-buttons");
    var selected_color = Object.keys(selectedProduct.colors)[0];
    var sides = ["front", "back"];

    for (var color in selectedProduct.colors) {
        var button = document.createElement("button");
        button.innerText = uppercase(color);
        button.style.fontFamily = 'Open Sans';
        button.style.backgroundColor = color;
        button.style.color = 'black';
        button.addEventListener("click", function(event) {
            var color = event.target.innerText.toLowerCase();
            var image = selectedProduct.colors[color].front;
            selected_color = color;
            document.getElementById("shirt-image").src = image;
        });

        button.addEventListener("mouseover", function(event) {
            this.style.color = 'white';
            if (this.style.backgroundColor === 'white') this.style.color = 'gray';
        });
        button.addEventListener("mouseout", function(event) {
            this.style.color = 'black';
        });

        colorButtons.appendChild(button);
    }

    for (var side in sides) {
        var button = document.createElement("button");
        button.innerText = uppercase(sides[side]);
        button.style.fontFamily = 'Open Sans';
        button.style.backgroundColor = '#c51230';
        button.style.color = 'white';
        button.addEventListener("click", function(event) {
            var side = event.target.innerText.toLowerCase();
            var image = selectedProduct.colors[selected_color][side];
            document.getElementById("shirt-image").src = image;
        });

        button.addEventListener("mouseover", function(event) {
            this.style.color = 'gray';
        });
        button.addEventListener("mouseout", function(event) {
            this.style.color = 'white';
        });

        sideButtons.appendChild(button);
    }

    var defaultImage = selectedProduct.colors[selected_color].front;
    document.getElementById("shirt-image").src = defaultImage;

    container.appendChild(entry);
  };