const booksShown = 5;
var booksStorage;
var maxPage;
var pagination = 1;
var bookId = 0;
var paging_range = [1, 2, 3];
var add_update = true;
var sort_title = true;
var sort_price = true;

function loading_data() {
  load_books();
  paging(0);
}

function load_books() {
  //get data from localStorage
  booksStorage = JSON.parse(localStorage.getItem("booksStorage"));
  maxPage = Math.ceil(booksStorage.length / booksShown);
}

function fill_table() {
  let tbody, row, tr, td, btn, booksToFill;

  //empty the table
  tbody = document.getElementById("tableBody");
  while (tbody.children.length > 1) {
    tbody.children[1].remove();
  }

  //multiple the first row model and fill it
  row = document.getElementById("row-");
  let start, end;
  start = booksShown * (pagination - 1);
  end =
    booksShown * (pagination - 1) + booksShown >= booksStorage.length
      ? booksStorage.length
      : booksShown * (pagination - 1) + booksShown;
  booksToFill = booksStorage.slice(start, end);
  console.log(start, end);

  for (let i in booksToFill) {
    //multiple the node including its innerHTML nodes
    tr = row.cloneNode(true);

    //update tags ids and fill them
    tr.id = "row-" + i;

    //id
    td = tr.querySelector("#column-id-");
    td.id = "column-id-" + i;
    td.textContent = booksToFill[i].id;

    //title
    td = tr.querySelector("#column-title-");
    td.id = "column-title-" + i;
    td.textContent = booksToFill[i].title;

    //price
    td = tr.querySelector("#column-price-");
    td.id = "column-price-" + i;
    td.textContent = booksToFill[i].price + "$";

    //action buttons
    //read
    btn = tr.querySelector("#action-read-");
    btn.id = "action-read-" + i;
    btn.addEventListener("click", () => {
      read_book(booksToFill[i]);
    });

    //update
    btn = tr.querySelector("#action-update-");
    btn.id = "action-update-" + i;
    btn.addEventListener("click", () => {
      document.getElementById("bookForm").style.display = "flex";
      book_to_update(booksToFill[i]);
    });

    //delete
    btn = tr.querySelector("#action-delete-");
    btn.id = "action-delete-" + i;
    btn.addEventListener("click", () => {
      delete_book(booksToFill[i].id);
    });
    //choose the book
    tr.addEventListener("click", () => {
      // show_book_details(booksToFill[i])
    });

    //append row to table
    tbody.appendChild(tr);
  }
}

function open_form() {
  //opaning form to fill details
  document.getElementById("bookForm").style.display = "flex";
  add_update = true;
}

function read_book(book) {
  //show book details inside of the board
  bookId = book.id;
  document.getElementById("details").style.display = "flex";
  show_book_details(book);
}

function book_to_update(book) {
  //get the details before submit
  document.getElementById("title").value = book.title;
  document.getElementById("price").value = book.price;
  document.getElementById("image").value = book.image;
  add_update = false;
  bookId = book.id;
}

function delete_book(id) {
  //pop out the object from local storage
  let index = booksStorage.findIndex((item) => item.id == id);
  if (index == -1) return;
  booksStorage.splice(index, 1);
  localStorage.setItem("booksStorage", JSON.stringify(booksStorage));
  loading_data();
}

function show_book_details(book) {
  //title
  document.getElementById("bookTitle").innerText = book.title;

  //show img
  document.getElementById("bookImg").src = book.image;
  console.log(book.image);

  //price
  document.getElementById("bookPrice").innerText = book.price;

  //rate
  document.getElementById("rateInput").value = book.rate;
}

function paging(count) {
  //by PREVIOUS and NEXT buttons navigate the data

  let page_numbers, indexPage;
  page_numbers = document.getElementsByClassName("page-num");

  //remove the style from last paging
  indexPage = paging_range.indexOf(pagination);
  console.log(maxPage, pagination, indexPage, paging_range);

  //change style
  page_numbers[indexPage].classList.add("btn-dark");
  page_numbers[indexPage].classList.remove("btn-light");

  //paging
  pagination =
    count + pagination < 1
      ? 1
      : count + pagination > maxPage
      ? maxPage
      : pagination + count;
  indexPage = paging_range.indexOf(pagination);

  //switch the pagination nav
  switch (count) {
    case 0: {
      break;
    }
    //forward
    case 1: {
      if (indexPage != -1) break;
      paging_range.push(paging_range[paging_range.length - 1] + 1);
      paging_range.shift();
      indexPage = page_numbers.length - 1;
      break;
    }
    //backward
    case -1: {
      if (indexPage != -1) break;
      paging_range.pop();
      paging_range.unshift(paging_range[0] - 1);
      indexPage = 0;
      break;
    }
  }
  for (let i in paging_range) page_numbers[i].innerText = paging_range[i];

  //add style to current paging
  if (indexPage != -1) {
    page_numbers[indexPage].classList.remove("btn-dark");
    page_numbers[indexPage].classList.add("btn-light");
  }
  document.getElementById("details").style.display = "none";
  //update the table the new data
  fill_table();
}

function UpdateData() {
  // function witch called on submit form (when create/update book)
  // declaring new book and fill it the details on sides
  // according the add_update variable call the correct functions
  // and update localStorage

  let newBook = {
    id: booksStorage[booksStorage.length - 1].id + 1,
    title: document.getElementById("title").value,
    price: parseInt(
      document.getElementById("price").value != NaN
        ? document.getElementById("price").value
        : 0
    ),
    image: document.getElementById("image").value,
    rate: 0,
  };
  booksStorage = JSON.parse(localStorage.getItem("booksStorage"));
  if (add_update) create_book(newBook);
  else update_book(newBook);

  localStorage.setItem("booksStorage", JSON.stringify(booksStorage));
  booksStorage = JSON.parse(localStorage.getItem("booksStorage"));
}

function create_book(book) {
  booksStorage.push(book);
}

function update_book(book) {
  let bookIndex = booksStorage.findIndex((item) => item.id == bookId);
  book.rate = booksStorage[bookIndex].rate;
  booksStorage[bookIndex] = book;
}

function change_rate() {
  //update book rate according user changes
  let bookIndex = booksStorage.findIndex((item) => item.id == bookId);
  booksStorage[bookIndex].rate = parseInt(
    document.getElementById("rateInput").value != NaN
      ? document.getElementById("rateInput").value
      : 0
  );
  //update the localStorage
  localStorage.setItem("booksStorage", JSON.stringify(booksStorage));
}

function close_form() {
  //closing the form block
  document.getElementById("bookForm").style.display = "none";
}

function orderStore(type) {
  //sort the bookStorage
  let arrow;
  booksStorage = JSON.parse(localStorage.getItem("booksStorage"));
  switch (type) {
    case "title": {
      booksStorage = sortByKey(booksStorage, "title", sort_title);
      sort_title = !sort_title;
      arrow = sort_title ? "⬆" : "⬇";
      document.getElementById("title-td").innerHTML = "Title " + arrow;
      break;
    }
    case "price": {
      booksStorage = sortByKey(booksStorage, "price", sort_price);
      sort_price = !sort_price;
      arrow = sort_title ? "⬆" : "⬇";
      document.getElementById("price-td").innerHTML = "Price " + arrow;
      break;
    }
  }

  localStorage.setItem("booksStorage", JSON.stringify(booksStorage));
  fill_table();
}

function sortByKey(arr, key, ascending = true) {
  return arr.sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
}
