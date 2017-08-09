var Search = function()
{
    var self = this;

    self.booksApi   = new BooksApi();
    self.totalItems = 0;

    self.books = [];

    self.inputDom = $(".search .search-bar input");
    self.booksDom = $("#main-content .books-wrapper .books");


    self.init = function()
    {
        self.booksApi.request(self.parseBooks);

    };

    /**
     * @param rawData   Example https://www.googleapis.com/books/v1/volumes?q=intitle:harry+potter
     */
    self.parseBooks = function(rawData)
    {
        self.totalItems = rawData.totalItems;

        for (var i = 0; i < rawData.items.length; i++) {
            var priceAmount   = null;
            var priceCurrency = null;
            if (typeof rawData.items[i].saleInfo.listPrice !== 'undefined') {
                priceAmount   = typeof rawData.items[i].saleInfo.listPrice.amount       !== 'undefined' ? rawData.items[i].saleInfo.listPrice.amount : null;
                priceCurrency = typeof rawData.items[i].saleInfo.listPrice.currencyCode !== 'undefined' ? rawData.items[i].saleInfo.listPrice.currencyCode : null;
            }

            var book = new Book({
                title: rawData.items[i].volumeInfo.title,
                authors: rawData.items[i].volumeInfo.authors,
                description: rawData.items[i].volumeInfo.description,
                publishedDate: rawData.items[i].volumeInfo.publishedDate,
                images: rawData.items[i].volumeInfo.imageLinks,
                averageRating: rawData.items[i].averageRating,
                ratingsCount: rawData.items[i].ratingsCount,
                priceAmount: priceAmount,
                priceCurrency: priceCurrency
            });

            self.books.push(book);
        }

        //console.log(books);
        self.refreshBooksDom();
    };

    self.refreshBooksDom = function()
    {
        var booksHtml = "";
        for (var i = 0; i < self.books.length; i++) {
            booksHtml += self.books[i].getHtml();
        }

        self.booksDom.html(booksHtml);
    };

    self.init();
};

new Search();