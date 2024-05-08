var bookName=document.getElementById("bookName");
var bookUrl=document.getElementById("url");
var myTable=document.getElementById("myTable");
var error=document.querySelector(".error")

var bookList;
if(localStorage.getItem('bookList')){
  bookList=JSON.parse(localStorage.getItem('bookList'));
  displayBook(bookList);
}else{
  bookList=[];
}

// function to add book
function addBook(){
if(validateName()===true&&validateUrl()===true){
  var book={
    name:bookName.value,
    url:bookUrl.value
  }
  bookList.push(book);
  error.classList.replace("d-block","d-none")

}else{
  error.classList.replace("d-none","d-block")
  bookName.classList.add('is-invalid');
  bookUrl.classList.add('is-invalid');
}
  addToLocalStorage()
  displayBook(bookList);
  clearInputs();
}


// function to display book
function displayBook(bList){
var cartoona=``;
for(var i=0;i<bList.length;i++){
  cartoona +=`
  <tr>
  <td>${i+1}</td>
  <td>${bList[i].name}</td>
  <td><a href="${bList[i].url}" target="_blank" class="btn btn-success"><i class="fas fa-eye"></i> Visit</a></td>
  <td><button onclick="deleteBook(${i})"  class="btn btn-danger"><i class="fas fa-trash-can"></i> Delete</button></td>
  </tr>
  `
}
myTable.innerHTML=cartoona;
}


// function to clear inputs
function clearInputs(){
  bookName.value="";
  bookUrl.value="";
  bookName.classList.remove('is-valid');
  bookUrl.classList.remove('is-valid');

}


// function to set item in localStorage
function addToLocalStorage(){
  localStorage.setItem('bookList',JSON.stringify(bookList))
}


// function to delete book
function deleteBook(index){
bookList.splice(index,1);
addToLocalStorage(bookList)
displayBook(bookList);
}


// function to validate bookName
function validateName(){
  var regex=/^[A-Za-z0-9]{3,10}$/;
  if(regex.test(bookName.value)){
    bookName.classList.add('is-valid');
    bookName.classList.remove('is-invalid');
      return true;
  }else{
    bookName.classList.add('is-invalid');
    bookName.classList.remove('is-valid');
    return false ;
  }
}



// function to validate bookURL
function validateUrl(){
  var regx=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  if(regx.test(bookUrl.value)){
    bookUrl.classList.add('is-valid');
    bookUrl.classList.remove('is-invalid');
      return true;
  }else{
    bookUrl.classList.add('is-invalid');
    bookUrl.classList.remove('is-valid');
    return false ;
  }
}

