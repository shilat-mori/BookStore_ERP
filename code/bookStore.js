import books from '../bookStore.json' with{type:"json"}
var pagination = 1
var bookId = 0
load_page()
function load_page(){
    let books = load_5_books()
    console.log(books); 
    fill_table(books)
}

function load_5_books(){
    return books.books.splice((5*pagination)-1,5)
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
        td.textContent = books[i].price

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