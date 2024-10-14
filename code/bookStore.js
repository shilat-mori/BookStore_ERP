import bookStore from '../bookStore.json' with{type:"json"}
const booksShown = 5
var booksStorage
var maxPage
var pagination = 1
var bookId = 0
var paging_range = [1,2,3]

loading_data()

function loading_data(){
    load_books()
    paging(0)
    eventListenersSetting()
    
}

function load_books(){
    localStorage.setItem('booksStorage', JSON.stringify(bookStore.books))
    booksStorage = JSON.parse(localStorage.getItem('booksStorage')||'[]')   
    maxPage = booksStorage.length/booksShown    
}

function fill_table(){
    let tbody, row, tr,td,btn, booksToFill
    
    //empty the table
    tbody = document.getElementById('tableBody')
    while (tbody.children.length > 1) {
        tbody.children[1].remove();
    }
   
    //multiple the first row model and fill it
    row = document.getElementById('row-')
    booksToFill = booksStorage.slice((booksShown*(pagination-1)),(booksShown*(pagination-1))+booksShown)
    
    for(let i in booksToFill){
        //multiple the node including its innerHTML nodes
        tr = row.cloneNode(true)
        
        //update tags ids and fill them
        tr.id = 'row-'+i
        
        //id
        td = tr.querySelector('#column-id-')
        td.id = 'column-id-'+i
        td.textContent = booksToFill[i].id

        //title
        td = tr.querySelector('#column-title-')
        td.id = 'column-title-'+i
        td.textContent = booksToFill[i].title

        //price
        td = tr.querySelector('#column-price-')
        td.id = 'column-price-'+i
        td.textContent = booksToFill[i].price+'$'

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
            show_book_details(booksToFill[i])
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
    let page_numbers, indexPage
    page_numbers = document.getElementsByClassName('page-num')

    //remove the style from last paging
    indexPage = paging_range.indexOf(pagination)
    
    page_numbers[indexPage].classList.add('btn-dark')
    page_numbers[indexPage].classList.remove('btn-light')

    //paging
    pagination=(count+pagination<1)?1:(count+pagination>maxPage)?maxPage:pagination+count
    indexPage = paging_range.indexOf(pagination)

    //switch the pagination nav
    switch(count){
        case 0:{
            break
        }
        case 1:{
            if(indexPage!=-1)break
            paging_range.push(paging_range[paging_range.length-1]+1)
            paging_range.shift()
            indexPage=page_numbers.length-1
            break
        }
        case -1:{
            if(indexPage!=-1)break
            paging_range.pop()
            paging_range.unshift(paging_range[0]-1)
            indexPage=0
            break
        }
    }
    for(let i in paging_range) page_numbers[i].innerText = paging_range[i]
    
    //add style to current paging
    if(indexPage!=-1) {
        page_numbers[indexPage].classList.remove('btn-dark')
        page_numbers[indexPage].classList.add('btn-light')
    }

    fill_table()
 }

 function eventListenersSetting(){
    document.getElementById('prevPages').addEventListener('click', ()=>{paging(-1)});
    document.getElementById('nextPages').addEventListener('click', ()=>{paging(1)});
 }

