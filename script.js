let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let taxes = document.getElementById('taxes');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tmp;
let mood='create ';

//get total
function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +ads.value + +taxes.value) - +discount.value
        total.innerHTML = result
        total.style.background='#040'
    }
    else{
        total.innerHTML ='';
        total.style.background='rgb(20, 17, 212)'
    }
}

//create product
let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product)
}
else{
    dataPro=[];
}
    
    submit.onclick =function(){
    let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        title:title.value,
        category:category.value,
        count:count.value
}
    if(title.value !=''){
        if(mood ==='create'){
            if(newPro.count > 1){
                for(let i = 0 ;i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{ dataPro.push(newPro);}
        } 
    }
   else{
        dataPro[tmp]=newPro;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block'

    }
   
    localStorage.setItem('product', JSON.stringify(dataPro))
   
    clearData()
    showData()
}

//clear inputs
function clearData(){
    title.value='';
    price.value ='';
    taxes.value ='';
    ads.value='';
    discount.value='';
    total.innerHTML ='';
    category.value ='';
    count.value='';

}
 //show data
 function showData(){
    let table ='';
    for(let i=0 ; i< dataPro.length ; i++){
        table +=
      `  <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" >update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

    </tr>`
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete= document.getElementById('deleteAll');
    if(dataPro.length>0){
        btnDelete.innerHTML=`<button onclick="deleteAll()" >delete All(${dataPro.length})</button>`
    }
    else{btnDelete.innerHTML=''}
 }
 showData()

 //delete element
 function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
 }
  
 //delete all data
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData()
}
//update data
function updateData(i){
title.value=dataPro[i].title
price.value=dataPro[i].price
ads.value=dataPro[i].ads
discount.value=dataPro[i].discount
taxes.value=dataPro[i].taxes
getTotal();
count.style.display='none';
category.value=dataPro[i].category
submit.innerHTML='Update';
mood='update'
tmp=i;
scroll({top :0 ,behavior:'smooth'})
}

//search function
let searchMood='title';
function getSearchMood(id){
if(id=='searchTitle'){
    searchMood='title'
    search.placeholder ='search by title'
}else{searchMood='category'
    search.placeholder ='search by category'
}
search.value='';
showData()
}

function searchData(value){
    let table=''
if(searchMood=='title'){
    for(let i=0 ; i<dataPro.length ;i++){
        if(dataPro[i].title.includes(value.toLowerCase())){
            table +=
            `  <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" >update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      
          </tr>`
        }
    }
}else{
    for(let i=0 ; i<dataPro.length ;i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
            table +=
            `  <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" >update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      
          </tr>`
        }
    }
}
document.getElementById('tbody').innerHTML=table;
}
