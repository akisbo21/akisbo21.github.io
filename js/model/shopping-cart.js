var ShoppingCart = function()
{
    var self = this;

    /** CK = cookie key */
    self.CK_BOOKS_IN_CART = "books-in-cart";

    /**
     * @returns Book[]
     */
    self.getBooks = function()
    {
        var objs = Cookies.get(self.CK_BOOKS_IN_CART) != undefined ? JSON.parse(Cookies.get(self.CK_BOOKS_IN_CART)) : [];
        var books = [];
        for (var i = 0; i < objs.length; i++) {
            books.push(new Book(objs[i]));
        }

        return books;
    };

    self.setBooks = function(books)
    {
        //Cookies.remove(self.CK_BOOKS_IN_CART);
        // @todo check special characters maybe they kill stringyfi.
        Cookies.set(self.CK_BOOKS_IN_CART, JSON.stringify(books));
    };

    self.getPosInCart = function(book)
    {
        var booksInCart = self.getBooks();
        var pos = booksInCart.map(function(e){return e.isbn; }).indexOf(book.getIsbn());
        return pos;
    };

    self.isInCart = function(book)
    {
        return self.getPosInCart(book) !== -1;
    };

    self.removeFromCart = function(book)
    {
        var pos = self.getPosInCart(book);
        if (pos !== -1) {
            var booksInCart = self.getBooks();
            booksInCart.splice(pos, 1);
            self.setBooks(booksInCart);
        }
    };

    self.addToCart = function(book)
    {
        if (!self.isInCart(book)) {
            var booksInCart = self.getBooks();
            booksInCart.push(book);
            self.setBooks(booksInCart);
        }
    };
};

var shoppingCart = new ShoppingCart();