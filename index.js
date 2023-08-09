// start vars
let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.querySelector("#total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");


let mode = "create";
let index;
// end vars


// start total price function
function getTotal() {
    if(price.value != '') {
        let result = (+price.value + +tax.value + +ads.value) - discount.value;
        total.innerHTML =  result;
        total.style.backgroundColor = "#040";
    }else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";
    }
}
// end total price function



// start create product function
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
}
create.onclick = function() {
    if(title.value == "" || price.value == "" || category.value == "") {
        window.alert("title and price and category are required");
    }else {
        let newPro = {
        title: title.value,
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
        }
        if(mode === "create") {
            if(newPro.count > 1) {
                for(let i=0; i<newPro.count; i++) {
                    dataPro.push(newPro);
                };
            }else {
                dataPro.push(newPro);
            }
        }else {
            dataPro[index] = newPro;
            create.innerHTML = "create";
            count.style.display = "block";
            mode = "create";
        }
        localStorage.setItem('product', JSON.stringify(dataPro));
        clearInputs();
        showData();
    }
    
};
// end create product function


// start clear inputs function
function clearInputs() {
    title.value = "";
    price.value = "";
    tax.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "total:- ";
    count.value = "";
    category.value = "";
    total.style.backgroundColor = "#a00d02";

}
// end clear inputs function


// start read function
function showData() {
    let table = ''
    for(let i=0; i<dataPro.length; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].tax}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
    if(dataPro.length > 0) {
        document.getElementById("deleteAll").innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `;
    }else {
        document.getElementById("deleteAll").innerHTML = "";
    };
};
showData();
// end read function

// start delete function
function deleteData(item) {
    dataPro.splice(item, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
// end delete function

// start clear data function
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
// end clear data function


// start update function
function updateData(item) {
    title.value = dataPro[item].title;
    price.value = dataPro[item].price;
    tax.value = dataPro[item].tax;
    ads.value = dataPro[item].ads;
    ads.value = dataPro[item].ads;
    discount.value = dataPro[item].discount;
    category.value = dataPro[item].category;
    getTotal();
    count.style.display = "none";
    create.innerHTML = "update";
    mode = "update";
    index = item;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
// end update function

// start search function
let searchMode = "title";

function getSearchMode(id) {
    if(id === "searchTitle") {
        searchMode = "title";
    }else {
        searchMode = "category";
    }
    search.placeholder = "search by " + searchMode;
    search.value = "";
    showData();
}

function searchData(value) {
    let table = "";
    if(searchMode === "title") {
        for(let i=0; i<dataPro.length; i++) {
            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `
            }
        }
    }else {
        for(let i=0; i<dataPro.length; i++) {
            if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `
            };
        };
    };
    document.getElementById("tbody").innerHTML = table;
};
// end search function


