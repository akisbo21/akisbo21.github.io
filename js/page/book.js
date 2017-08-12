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

        booksApi.setIsbn(isbn);
        booksApi.getBooks(self.refreshBookDom);

        self.onAddToCartClick();
        self.onRemoveFromCartClick();
    };

    self.refreshBookDom = function(books)
    {
        self.book = books[0];
        self.bookContainerDom.html(self.book.getFullPageHtml());
        self.bookDom = self.bookContainerDom.find(".one-book-wrapper");
    };

    self.onAddToCartClick = function()
    {
        self.bookContainerDom.on('click', '.add-to-cart-btn', self.addToCartClicked);
    };

    self.onRemoveFromCartClick = function()
    {
        self.bookContainerDom.on('click', '.remove-from-cart-btn', self.removeFromCartClicked);
    };

    self.addToCartClicked = function()
    {
        self.book.addToCart();
    };

    self.removeFromCartClicked = function()
    {
        self.book.removeFromCart();
    };

    self.init();
};

new BookPage();