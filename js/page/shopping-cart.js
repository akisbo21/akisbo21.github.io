var ShoppingCartPage = function()
{
    var self = this;

    self.booksContainerDom = $("body#shopping-cart-page #main-content .book-container");
    self.books             = null;

    self.init = function()
    {
        self.refreshBookDom();
    };

    self.refreshBookDom = function(books)
    {
        self.books = shoppingCart.getBooks();

        var booksDom = "";
        for (var i = 0; i < self.books.length; i++) {
            booksDom += self.books[i].getFullPageHtml();
        }

        self.booksContainerDom.html(booksDom);

        for (var j = 0; j < self.books.length; j++) {
            self.books[j].addEventHandlers();
        }
    };

    self.init();
};

new ShoppingCartPage();