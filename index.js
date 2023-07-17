var n = document.getElementById("productName")
var p = document.getElementById("productPrice")
var c = document.getElementById("productCat")
var d = document.getElementById("productDesc")
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")

var tableBody = document.getElementById('tableBody')

var productContainer = [];
if (localStorage.getItem('products') != null) {
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts(productContainer);
}
// add product function
function addProduct() 
{
    if (validate() == true) 
    {

        var product = 
        {

            name: n.value,
            price: p.value,
            cat: c.value,
            desc: d.value
        }
        productContainer.push(product)
        localStorage.setItem("products", JSON.stringify(productContainer));
        displayProducts(productContainer)
        clearForm();
    }

    else 
    {
        alert('product name invalide')
    }
    // console.log(productContainer);
}

// display function
function displayProducts() //(productContainer)
{
    var box = ``;

    for (var i = 0; i < productContainer.length; i++) {
        box +=
            `<tr>
          <td>${i + 1} </td>
          <td>${productContainer[i].name}</td>
          <td>${productContainer[i].price}</td>
          <td>${productContainer[i].cat}</td>
          <td>${productContainer[i].desc}</td>
          <td > <button onclick="update(${i});" class="btn text-bg-light btn-outline-dark">Update</button>  </td>
          <td > <button onclick="deletProduct(${i})" class="btn text-bg-light btn-outline-dark">Delete</button>  </td>
        </tr>`
    }
    console.log(productContainer[i]);
    document.getElementById('tableBody').innerHTML = box;
}


//clear
function clearForm() {
    n.value = "";
    p.value = "";
    c.value = "";
    d.value = "";
}



//delet
function deletProduct(productIndex) {
    productContainer.splice(productIndex, 1)
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts(productContainer); //display new array
}


//search /// it needs new display function or making display function takes parameters
function search(term) {
    var searchArr = []
    for (var i = 0; i <= searchArr.length; i++) {
        if (productContainer[i].n.toLowerCase().includes(term.toLowerCase()) === true)
            searchArr.push(productContainer[i])
    }
    displayProducts(searchArr);
}




//update
var globleIndex;
function update(i) {
    globleIndex = i;
    addBtn.classList.replace('d-block', 'd-none')
    updateBtn.classList.replace('d-none', 'd-block')
    n.value = productContainer[i].name;
    p.value = productContainer[i].price;
    c.value = productContainer[i].cat;
    d.value = productContainer[i].desc;

}
function finalUpdate() {
    productContainer[globleIndex].name = n.value;
    productContainer[globleIndex].price = p.value;
    productContainer[globleIndex].cat = c.value;
    productContainer[globleIndex].desc = d.value;
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts(productContainer);
    addBtn.classList.replace('d-none', 'd-block')
    updateBtn.classList.replace('d-block', 'd-none')
    clearForm();


}
//validate
function validate() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    return regex.test(n.value);

}