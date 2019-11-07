var html = "<br>";
var shopingCart = [];
window.onload = init;
        
function init(){
    buildItems();
    var allProduct = document.querySelectorAll('.productitem');
    for(var i=0; i< allProduct.length; i++){
        allProduct[i].addEventListener('click', function(evt){
        evt.preventDefault();
        addToCart();
        });
    }
    outputCart();
}
        
function addToCart(){
    var itemInfo = event.target.dataset;
    var itemInCart = false;
    itemInfo.quantity = 1;
            
    shopingCart.forEach(function(val){
        if(val.id == itemInfo.id){
            val.quantity = parseInt(val.quantity) + parseInt(itemInfo.quantity);  
            itemInCart = true;
        }
    });
            
    if(!itemInCart){
        shopingCart.push(itemInfo);
    }
            
    localStorage.setItem('shoppingCart', JSON.stringify(shopingCart));
    outputCart();
}
        
function outputCart(){
    if(localStorage.getItem('shoppingCart') != null){
        shopingCart =JSON.parse(localStorage.getItem('shoppingCart'));
    }
    var html = "<table>";
    html += "<tr>";
    html += "<th>Item</th>";
    html += "<th>Quantity</th>";
    html += "<th>Price</th>";
    html += "<th>Id</th>";
    html += "<th>Sub Total</th>";
    html += "<th>Options</th>";
    html += "</tr>";
    var total = 0;
    shopingCart.forEach(function(val){
        var sTotal = val.quantity * val.price;
        total += sTotal;
        html += "<tr><td>"+ val.name +"</td>";
        html += "<td>"+ val.quantity +"</td>";
        html += "<td>"+ convertToDolar(val.price) +"</td>";
        html += "<td>"+ val.id +"</td>";
        html += "<td>"+ convertToDolar(sTotal) +"</td>";
        html += "<td>";
        html += "<button class='remove btn' onclick='remove("+val.id+")'>X</button>";
        html += "</td></tr>";
    });
    html += "<tr><td colspan=6>" + convertToDolar(total) + "</td></tr>";
    html += "</table>";
    document.getElementById("cart").innerHTML = html;
}
        
function buildItems(){
    var x = 1;
    items.forEach(function(val){
        html += "<div class='item'>";
        html += "<h3>" + val.name + "</h3>";
        html += "<img src='" + val.img_src + "' class='img-fluid'>";
        html += "<div>" + val.details + "<br>" + convertToDolar(val.cost) + "<br><br>";
        html += "<a href='#' class='productItem' data-name=" + val.name + " data-details='" + val.details + "' data-price='" + val.cost + "' data-id='" + x + "'>Add to Cart</a>";
        html += "</div>";
        html += "</div>";
        x++;
    });

    document.getElementById("output").innerHTML += html;
}
        
function remove(id){
    for(var i=0; i<shopingCart.length; i++){
        if(shopingCart[i].id == id){
            var removelItem = shopingCart.splice(i,1);   
        }
    }
    localStorage.setItem('shoppingCart', JSON.stringify(shopingCart));
    outputCart();
}
        
function convertToDolar(val){
    return "$ " + (val/100).toFixed(2);
}