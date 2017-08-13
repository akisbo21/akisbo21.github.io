var BookPage = function()
{
    var self = this;

    self.book = null;

    self.bookContainerDom = $("body#book-page .book-container");
    self.bookDom          = null;

    self.init = function()
    {
        var url  = new URL(window.location.href);
        var isbn = url.searchParams.get("isbn");
        //console.log(isbn);

        booksApi.addIsbn(isbn);
        booksApi.getBooks(self.refreshBookDom);
    };

    self.refreshBookDom = function(books)
    {
        self.book = books[0];
        self.bookContainerDom.html(self.book.getFullPageHtml());
        self.book.addEventHandlers();
    };

    self.init();
};

new BookPage();