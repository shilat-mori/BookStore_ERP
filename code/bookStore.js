import bookStore from '../bookStore.json' with{type:"json"}
const booksShown = 5
var booksStorage
var maxPage
var pagination = 1
var bookId = 0

load_page()
function load_page(){
    let books = load_books()
    console.log(books);
    
    console.log(load_books());
    console.log(books); 
    fill_table(books)
}

function load_books(){
    let books
    localStorage.setItem('booksStorage', JSON.stringify(bookStore.books))
    booksStorage = JSON.parse(localStorage.getItem('booksStorage')||'[]')
    maxPage = booksStorage.length/booksShown
    console.log(booksStorage);
    
    return booksStorage.splice((booksShown*(pagination-1)),booksShown)
}

function fill_table(books){
    let tbody, row, tr,td,btn
    tbody = document.getElementById('tableBody')
    row = document.getElementById('row-')
    for(let i in books){
        //multiple the node including its innerHTML nodes
        tr = row.cloneNode(true)
        
        //update tags ids and fill them
        tr.id = 'row-'+i
        
        //id
        td = tr.querySelector('#column-id-')
        td.id = 'column-id-'+i
        td.textContent = books[i].id

        //title
        td = tr.querySelector('#column-title-')
        td.id = 'column-title-'+i
        td.textContent = books[i].title

        //price
        td = tr.querySelector('#column-price-')
        td.id = 'column-price-'+i
        td.textContent = books[i].price+'$'

        //action buttons
        //read
        btn = tr.querySelector('#action-read-')
        btn.id = 'action-read-'+i
        btn.onclick = read_book(i)

        //update
        btn = tr.querySelector('#action-update-')
        btn.id = 'action-update-'+i
        btn.onclick = update_book(i)

        //delete
        btn = tr.querySelector('#action-delete-')
        btn.id = 'action-delete-'+i
        btn.onclick = delete_book(i)
        
        //choose the book
        tr.addEventListener('click', ()=>{
            show_book_details(books[i])
        })   
        //append row to table
        tbody.appendChild(tr)

    }
}

function read_book(bookId){

}

function update_book(bookId){

}

function delete_book(bookId){

}

function show_book_details(book){
    //title
    document.getElementById('bookTitle').innerText = book.title

    //show img
    document.getElementById('bookImg').src = book.image
    console.log(book.img);
    
    //price
    document.getElementById('price').innerText = book.price

    //rate
    document.getElementById('rateInput').value = book.rate
}

function paging(count){
    pagination+=(count+pagination<1)?1:(count+pagination>maxPage)?maxPage:count+pagination
    page_numbers = document.getElementsByClassName('page-num')
    for(let i in page_numbers){
        pag
    }
}