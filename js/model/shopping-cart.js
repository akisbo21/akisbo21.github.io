var ShoppingCart = function()
{
    var self = this;

    self.books = [];

    /** CK = cookie key @note contains only the isbn number of the books */
    self.CK_BOOKS_IN_CART = "books-in-cart";

    self.getIsbns = function()
    {
        return Cookies.get(self.CK_BOOKS_IN_CART) != undefined ? JSON.parse(Cookies.get(self.CK_BOOKS_IN_CART)) : [];
    };

    self.setIsbns = function(isbns)
    {
        //Cookies.remove("books-in-cart");
        Cookies.set(self.CK_BOOKS_IN_CART, JSON.stringify(isbns));
    };

    /**
     * @returns Book[]
     */
    self.getBooks = function(callback)
    {
        //var objs = Cookies.get(self.CK_BOOKS_IN_CART) != undefined ? JSON.parse(Cookies.get(self.CK_BOOKS_IN_CART)) : [];
        //var books = [];
        //for (var i = 0; i < objs.length; i++) {
        //    books.push(new Book(objs[i]));
        //}

        //var isbns =

        booksApi.setIsbns(self.getIsbns());
        booksApi.getBooks(callback);
        callback(books);
    };

    /**
     * @param {Book} book
     */
    self.getPosInCart = function(book)
    {
        return self.getIsbns().indexOf(book.getIsbn());
    };

    /**
     * @param {Book} book
     */
    self.isInCart = function(book)
    {
        return self.getPosInCart(book) !== -1;
    };

    /**
     * @param {Book} book
     */
    self.removeFromCart = function(book)
    {
        var pos = self.getPosInCart(book);
        if (pos !== -1) {
            var isbns = self.getIsbns();
            isbns.splice(pos, 1);
            self.setIsbns(isbns);
        }
    };

    /**
     * @param {Book} book
     */
    self.addToCart = function(book)
    {
        if (!self.isInCart(book)) {
            var isbns = self.getIsbns();
            isbns.push(book.getIsbn());
            self.setIsbns(isbns);
        }
    };
};

var shoppingCart = new ShoppingCart();