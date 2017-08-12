var Book = function(data)
{
    var self = this;

    /* @link https://developers.google.com/books/docs/v1/reference/volumes */
    self.MAX_RATING = 5;

    /** CK = cookie key */
    self.CK_BOOKS_IN_CART = "books-in-cart";

    self.id            = data.id;
    self.isbn          = data.isbn;
    self.title         = data.title;
    self.authors       = data.authors;
    self.description   = data.description;
    self.images        = data.images;
    self.averageRating = data.averageRating;
    self.ratingsCount  = data.ratingsCount;
    self.priceAmount   = data.priceAmount;
    self.priceCurrency = data.priceCurrency;
    self.categories    = data.categories;

    self.getId = function() {return self.id;};
    self.getIsbn = function() {return self.isbn;};
    self.getTitle = function() {return self.title;};

    self.getDottedTitle  = function()
    {
        return self.title.length <= 60 ? self.title : self.title.substr(0, 60) + "...";
    };

    self.hasAuthors = function() {return self.authors != null;};

    self.getAuthors = function()
    {
        return self.hasAuthors() ? self.authors : ["-"];
    };

    self.hasDescription = function() {return self.description != null;};
    self.getDescription = function() {return self.description;};

    self.hasAverageRating = function() {return self.averageRating != null;};
    self.getAverageRating = function() {return self.averageRating;};

    self.getRating = function()
    {
        return self.hasAverageRating() ? self.getAverageRating() + " / " + self.MAX_RATING : "";
    };

    self.hasRatingsCount = function() {return self.ratingsCount != null;};
    self.getRatingsCount = function() {return self.ratingsCount;};

    self.hasPriceAmount = function() {return self.priceAmount != null;};
    self.getPriceAmount = function() {return self.priceAmount;};

    self.hasPriceCurrency = function() {return self.priceCurrency != null;};
    self.getPriceCurrency = function() {return self.priceCurrency;};

    self.getPrice = function()
    {
        return (self.hasPriceAmount() && self.hasPriceCurrency()) ? self.getPriceAmount() + " " + self.getPriceCurrency() : "Not for sale";
    };

    self.hasImages = function() {return self.images != null;};
    self.getImages = function() {return self.images;};

    self.hasCategories = function() {return self.categories != null;};

    self.getCategories = function()
    {
        return self.hasCategories() ? self.categories : ["-"];
    };

    self.getThumbnailImage = function()
    {
        return self.hasImages() ? self.getImages().thumbnail : "img/book-thumbnail-placeholder.png";
    };

    self.getBooksInCart = function()
    {
        return Cookies.get(self.CK_BOOKS_IN_CART) != undefined ? JSON.parse(Cookies.get(self.CK_BOOKS_IN_CART)) : [];
    };

    self.setBooksInCart = function(books)
    {
        //Cookies.remove(self.CK_BOOKS_IN_CART);
        return Cookies.set(self.CK_BOOKS_IN_CART, JSON.stringify(books));
    };

    self.getPosInCart = function()
    {
        var booksInCart = self.getBooksInCart();
        var pos = booksInCart.map(function(e){return e.isbn; }).indexOf(self.getIsbn());
        return pos;
    };

    self.isInCart = function()
    {
        return self.getPosInCart() !== -1;
    };

    self.addToCart = function()
    {
        if (!self.isInCart()) {
            var booksInCart = self.getBooksInCart();
            booksInCart.push(self);
            self.setBooksInCart(booksInCart);
        }
    };

    self.removeFromCart = function()
    {
        var pos = self.getPosInCart();
        if (pos !== -1) {
            var booksInCart = self.getBooksInCart();
            booksInCart.splice(pos, 1);
            self.setBooksInCart(booksInCart);
        }
    };

    self.getListPageHtml = function()
    {
        return '<div class="one-book-wrapper">' +
                    '<a class="one-book" href="book.html?isbn=' + self.getIsbn() + '">' +
                        '<div class="image-wrapper">' +
                            '<img src="' + self.getThumbnailImage() + '" />' +
                        '</div>' +
                        '<div class="details">' +
                            '<div class="categories-wrapper">' +
                                '<div class="categories">' + self.getCategories().join(', ') + '</div>' +
                            '</div>' +
                            '<div class="title-wrapper">' +
                                '<div class="title">' + self.getDottedTitle() + '</div>' +
                            '</div>' +
                            '<div class="divider-horizontal"><hr /></div>' +
                            '<div class="authors-wrapper">' +
                                '<div class="authors">' + self.getAuthors().join(', ') + '</div>' +
                            '</div>' +
                            '<div class="price-and-ratings">' +
                                '<div class="price-wrapper">' +
                                    '<div class="price">' + self.getPrice() + '</div>' +
                                '</div>' +
                                '<div class="ratings-wrapper">' +
                                    '<div class="ratings">' + self.getRating() + '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
               '</div>'
    };

    self.getFullPageHtml = function()
    {
        var isInCartClass = self.isInCart() ? "in-cart" : "";

        return '<div class="one-book-wrapper full ' + isInCartClass + '">' +
                '<div class="one-book clearfix">' +
                        '<div class="image-wrapper">' +
                            '<img src="' + self.getThumbnailImage() + '" />' +
                        '</div>' +
                        '<div class="details">' +
                            '<div class="categories-wrapper">' +
                            '<div class="categories">' + self.getCategories().join(', ') + '</div>' +
                        '</div>' +
                        '<div class="title-wrapper">' +
                            '<div class="title">' + self.getTitle() + '</div>' +
                        '</div>' +
                        '<div class="divider-horizontal"><hr /></div>' +
                            '<div class="authors-wrapper">' +
                        '<div class="authors">Author(s): ' + self.getAuthors().join(', ') + '</div>' +
                        '</div>' +
                        '<div class="price-wrapper">' +
                            '<div class="price">' + self.getPrice() + '</div>' +
                        '</div>' +
                        '<div class="ratings-wrapper">' +
                            '<div class="ratings">' + self.getRating() + '</div>' +
                        '</div>' +
                        '<div class="actions-wrapper">' +
                            '<div class="actions">' +
                                '<div class="btn btn-blue add-to-cart-btn">' +
                                    '<a>Add to cart</a>' +
                                '</div>' +
                                '<div class="btn btn-blue remove-from-cart-btn">' +
                                    '<a>Remove from cart</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
    };
};

