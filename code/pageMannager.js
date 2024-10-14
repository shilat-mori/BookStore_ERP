import load_10_books from './bookStore' with{type:"module"}
var pagination = 1
var bookId = 0
function load_page(){
    books = load_10_books()
    fillTable(books)
}

function fillTable(books){

}