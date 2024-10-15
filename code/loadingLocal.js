import bookStore from '../bookStore.json' with{type:"json"}
localStorage.setItem('booksStorage', JSON.stringify(bookStore.books))