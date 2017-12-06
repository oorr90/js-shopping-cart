window.onload = init;

var myCart = [];

function init() {
    
    //Create the ul to place inside the cart contents div
    var myListItems = document.createElement("ul");
    myListItems.setAttribute("id", "inMyCart");
    
    //Grab the cart contents div
    var contents = document.getElementById("cart_contents");
    contents.appendChild(myListItems);
    
        
    //Check to see if there are items in the localStorage
    if (localStorage.myItems) {
        //If there are, store these in the myCart array
        myCart = JSON.parse(localStorage.getItem("myItems"));
        document.getElementById("cartInfo").querySelector("p").style.display = "none";
        showCart();
    } else {
        emptyCart();
    } 
    
    //Set a click handler on all of the grocery items
    var allProducts = document.getElementById("products");
    var productList = allProducts.querySelectorAll("li");
        
    for (var i = 0; i < productList.length; i++) {
        productList[i].querySelector("input[type=button]").addEventListener("click", function(){
            
            //Create an object for the single item with id, caption, and quantity
            var addItem = {
                id: this.parentNode.getAttribute("id"),
                caption: this.parentNode.querySelector("figcaption").innerHTML,
                quantity: 1,
            };
            
            //Check the existance of the item in the cart already by comparing the ids
            for (var j = 0; j < myCart.length; j++) {
                if (myCart[j].id == addItem.id) {
                    //console.log(addItem.id);
                    myCart[j].quantity++;
                    addItem.qtyUpdate = true; //ONLY update the quantity if the ids match
                }
            }
            
            //If the ids match, do nothing, but otherwise push the item into the cart
            if (addItem.qtyUpdate !== true) {
                myCart.push(addItem);
            }
            
            document.getElementById("cartInfo").querySelector("p").style.display = "none";
            document.getElementById("cart_contents").style.display = "block";
            document.getElementById("emptyCart").style.display = "block";
            
            addToStorage();
        });
        
    }
}


function addToStorage() {
    
    localStorage.setItem('myItems', JSON.stringify(myCart));
    
    showCart();
}


function showCart() {
        
    var myCartItems = document.getElementById("inMyCart");
    
    //Start from scratch every time the ul is built
    myCartItems.innerHTML = "";
    
    //Pull items from the myCart array to display in the shopping cart
    for (var i = 0; i < myCart.length; i++) {
        var singleItem = document.createElement("li");
        singleItem.setAttribute("id", myCart[i].id);
        var itemName = document.createTextNode(myCart[i].caption + " ");
        singleItem.appendChild(itemName);
        
        var itemQty = document.createElement("span");
        itemQty.innerHTML = myCart[i].quantity;
        itemQty.setAttribute("class", "quantity");
        singleItem.appendChild(itemQty);
        
        
        var itemImg = document.createElement("img");
        itemImg.src = "images/delete.png";
        itemImg.onclick = decrease;
        singleItem.appendChild(itemImg);
        
        myCartItems.appendChild(singleItem);
    }
    
    //Grab the empty cart button
    var emptyButton = document.getElementById("emptyCart");
    emptyButton.addEventListener("click", emptyCart);
    
}



function emptyCart() {
    
    //Hide and show elements in the Cart area depending on the status of the cart
    document.getElementById("cart_contents").style.display = "none";
    document.getElementById("cartInfo").querySelector("p").style.display = "block";
    document.getElementById("emptyCart").style.display = "none";
    
    localStorage.removeItem("myItems");
        
    myCart = [];
    
    showCart();
}


//Show the updated quantity each time the delete image is clicked
function decrease() {
        
    var singleItem = this.parentNode;
    var itemId = singleItem.getAttribute("id");
    var singleSpan = singleItem.querySelector(".quantity");
        
    for (var i = 0; i < myCart.length; i++) {
        if (myCart[i].id == itemId) {
            myCart[i].quantity--;
            if (myCart[i].quantity >= 1) {
                singleItem.querySelector(".quantity").innerHTML = myCart[i].quantity;
            } else if (myCart[i].quantity == 0) {
                myCart.splice(i,1);
            }
        }
    }
    
    if (myCart.length < 1) {
        emptyCart();
    } else {
       addToStorage(); 
    }

}





