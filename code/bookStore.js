import bookStore from '../bookStore.json' with{type:"json"}
const booksShown = 5
var booksStorage
var maxPage
var pagination = 1
var bookId = 0
var paging_range = [1,2,3]
var add_update = 1

loading_data()

function loading_data(){
    load_books()
    paging(0)
    eventListenersSetting()
    
}

function load_books(){
    // localStorage.setItem('booksStorage', JSON.stringify(bookStore.books))
    booksStorage = JSON.parse(localStorage.getItem('booksStorage'))      
    maxPage = Math.ceil(booksStorage.length/booksShown)
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
    let start,end
    start = (booksShown*(pagination-1))
    end = (((booksShown*(pagination-1))+booksShown)>=booksStorage.length)?booksStorage.length:(booksShown*(pagination-1)+booksShown)
    booksToFill = booksStorage.slice(start,end)
    console.log(start, end);
    
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
        btn.addEventListener('click', ()=>{read_book(booksToFill[i])})

        //update
        btn = tr.querySelector('#action-update-')
        btn.id = 'action-update-'+i
        btn.addEventListener('click',()=>{
            document.getElementById('bookForm').style.display = 'flex';
            update_book(booksToFill[i])
        })

        //delete
        btn = tr.querySelector('#action-delete-')
        btn.id = 'action-delete-'+i
        btn.addEventListener('click',()=>{
            delete_book(booksToFill[i].id)
        })
        //choose the book
        tr.addEventListener('click', ()=>{
            // show_book_details(booksToFill[i])
        })

        //append row to table
        tbody.appendChild(tr)

    }
}

function create_book(){
    document.getElementById('bookForm').style.display = 'flex';
    add_update = 1
    loading_data()
}

function read_book(book){
    bookId = book.id
    document.getElementById('details').style.display = 'flex'
    show_book_details(book)
}

function update_book(book){
    document.getElementById('title').value = book.title
    document.getElementById('price').value = book.price
    document.getElementById('image').value = book.image
    add_update = 0
    bookId = book.id
}

function delete_book(id){
    let index = booksStorage.findIndex(item => (item.id==id))
    if(index == -1) return
    booksStorage.splice(index, 1)
    localStorage.setItem('booksStorage',JSON.stringify(booksStorage))
    loading_data()
}

function show_book_details(book){
    //title
    document.getElementById('bookTitle').innerText = book.title

    //show img
    document.getElementById('bookImg').src = book.image
    console.log(book.image);
    
    //price
    document.getElementById('bookPrice').innerText = book.price

    //rate
    document.getElementById('rateInput').value = book.rate
}

function paging(count){
    let page_numbers, indexPage
    page_numbers = document.getElementsByClassName('page-num')

    //remove the style from last paging
    indexPage = paging_range.indexOf(pagination)
    console.log(maxPage,pagination,indexPage, paging_range);
    
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
    document.getElementById('details').style.display = 'none'
    fill_table()
}

function eventListenersSetting(){
    document.getElementById('prevPages').addEventListener('click', ()=>{paging(-1)});
    document.getElementById('nextPages').addEventListener('click', ()=>{paging(1)});
    document.getElementById('bookAdding').addEventListener('click',()=>{create_book()});
    document.getElementById('closeForm').addEventListener('click',()=>{
        document.getElementById('bookForm').style.display = 'none';
    })
    document.getElementById('detailsForm').addEventListener('submit',()=>{UpdateData()});
    document.getElementById('rateInput').addEventListener('change', ()=>{change_rate()})
 }

 function UpdateData(){
    let newBook, bookIndex
    if([0,1].includes(add_update)){
        booksStorage = JSON.parse(localStorage.getItem('booksStorage'))
            newBook = {
                id: (booksStorage[booksStorage.length - 1].id+1),
                title: document.getElementById('title').value,
                price: parseInt(document.getElementById('price').value!=NaN?document.getElementById('price').value:0),
                image: document.getElementById('image').value,
                rate: 0
            }
    }
    switch(add_update){
        //adding book
        case 1:{
            booksStorage.push(newBook)
            localStorage.setItem('booksStorage',JSON.stringify(booksStorage))
            booksStorage = JSON.parse(localStorage.getItem('booksStorage'))  
            console.log(booksStorage);
            break
        }
        //updating book
        case 0:{
            bookIndex = booksStorage.findIndex(item=>item.id == bookId)            
            newBook.rate = booksStorage[bookIndex].rate
            booksStorage[bookIndex] = newBook
            localStorage.setItem('booksStorage',JSON.stringify(booksStorage))
            booksStorage = JSON.parse(localStorage.getItem('booksStorage'))  
            break
        }
        default:{

        }
        // loading_data()
    }
}

function change_rate(){
    let bookIndex = booksStorage.findIndex(item=>item.id == bookId)            
    booksStorage[bookIndex].rate = parseInt(document.getElementById('rateInput').value!=NaN?document.getElementById('rateInput').value:0)
    localStorage.setItem('booksStorage',JSON.stringify(booksStorage))
}
