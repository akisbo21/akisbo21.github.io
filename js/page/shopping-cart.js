var ShoppingCartPage = function()
{
    var self = this;

    self.booksDom = $("body#shopping-cart-page #main-content .book-container");

    self.init = function()
    {
        var booksInCart = shoppingCart.getBooks();
        var booksDom    = "";

        for (var i = 0; i < booksInCart.length; i++) {
            booksDom += booksInCart[i].getFullPageHtml();
        }

        self.booksDom.html(booksDom);
    };

    self.init();
};

new ShoppingCartPage();