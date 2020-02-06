(function(){

    const formContainer = document.getElementById("getBookData"),
        tableBodyContainer = document.querySelector(".table-body"),
        alertContainer = document.querySelector(".alert h2");

    const BOOKS_LS = "books";

    // Book Class : Represents a Book
    class BookData {
        constructor(bookTitle, bookAuthor, bookISBN){
            this.bookTitle = bookTitle;
            this.bookAuthor = bookAuthor;
            this.bookISBN = bookISBN;
        }
    }

    // UI Class : Handle UI Tasks
    class UI {
        static displayBooks() {
            if(localStorage.getItem(BOOKS_LS) === null){
                localStorage.setItem(BOOKS_LS, '[]');
            }

            const StoredBooks = JSON.parse(localStorage.getItem(BOOKS_LS));

            StoredBooks.forEach(book => {UI.addBookToULList(book)});
            tableBodyContainer.querySelectorAll('.delete').forEach(function(deleteButton){
                deleteButton.addEventListener('click', UI.deleteButton);
            });
            
        }

        static addBookToULList(book){
            const newBook =  document.createElement('li');
            newBook.innerHTML += `
                <ul class="table-row clearfix">
                    <li>${book.bookTitle}</li>
                    <li>${book.bookAuthor}</li>
                    <li><span class="text">${book.bookISBN}</span><span class="delete"><i class="fas fa-minus-circle"></i></span></li>
                </ul>
            `;
            newBook.querySelector('.delete').addEventListener('click',this.deleteButton);
            tableBodyContainer.appendChild(newBook);
        }

        static addBookToLocalStorage(book){
            const StoredBooks = JSON.parse(localStorage.getItem(BOOKS_LS));

            StoredBooks.push({bookTitle: book.bookTitle, bookAuthor: book.bookAuthor, bookISBN: book.bookISBN});
            localStorage.setItem(BOOKS_LS, JSON.stringify(StoredBooks));
        }

        static deleteButton(event) {
            const nodeDelete = event.currentTarget,
                nodeDeleteLI = nodeDelete.parentNode.parentNode.parentNode,
                nodeDeleteUL = nodeDeleteLI.parentNode;

            const StoredBooks = JSON.parse(localStorage.getItem(BOOKS_LS));

            for(let i = 0; i < nodeDeleteUL.children.length; i++){
                if(nodeDeleteUL.children[i] === nodeDeleteLI){
                    nodeDeleteUL.removeChild(nodeDeleteLI);
                    StoredBooks.splice(i,1);
                    localStorage.setItem(BOOKS_LS, JSON.stringify(StoredBooks));
                    break;
                }
            }
            alertShow('delete',"That book is deleted.");
        }

        static clearFields(){
            formContainer.querySelector("input#bookTitle").value='';
            formContainer.querySelector("input#bookAuthor").value='';
            formContainer.querySelector("input#bookISBN").value='';
        }
    }

    function alertShow(className, text){
        alertContainer.textContent = text;
        alertContainer.classList.add(className);
        setTimeout(()=>{alertContainer.classList.remove(className)}, 1000);
    }

    function getNewBookData(event){
        event.preventDefault();
        const bookTitle = this.querySelector("input#bookTitle").value;
        const bookAuthor = this.querySelector("input#bookAuthor").value;
        const bookISBN = this.querySelector("input#bookISBN").value;

        if(bookTitle === '' || bookAuthor === '' || bookISBN === ''){
            alertShow('warning',"Please fill all the fields");
        }

        else {
            const newBookData = new BookData(bookTitle, bookAuthor, bookISBN); 
            UI.addBookToULList(newBookData);
            UI.addBookToLocalStorage(newBookData);
            UI.clearFields();
            alertShow('success',"The list is updated.");
        }
    }

    function main(){
        document.addEventListener('DOMContentLoaded', UI.displayBooks());
        formContainer.addEventListener('submit', getNewBookData);
    }

    main();
})();