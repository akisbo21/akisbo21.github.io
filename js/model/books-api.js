var BooksApi = function()
{
    var self = this;

    self.API_URL  = "https://www.googleapis.com/books/v1/volumes?q=";
    self.IN_TITLE = "intitle:";
    self.ISBN     = "isbn:";

    self.title = "";
    self.isbns = [];

    self.totalItems = 0;

    self.hasTitle = function(){return self.title != ""};
    self.getTitle = function() {return self.title;};
    self.getTitleSlug = function(){return helperTool.convertToSlug(self.title);};
    self.setTitle = function(title) {self.title = title;};

    self.hasIsbns = function(){return self.isbns.length};
    self.getIsbns = function() {return self.isbns;};
    self.setIsbns = function(isbns) {self.isbns = isbns;};
    self.addIsbn  = function(isbn) {self.isbns.push(isbn);};

    self.hasUrlParam = function()
    {
        return self.hasTitle() || self.hasIsbns();
    };

    self.getUrlParam = function()
    {
        var urlParam = "";
        if (self.hasTitle()) {
            urlParam += self.IN_TITLE + self.getTitleSlug();
        }

        // e.g. https://www.googleapis.com/books/v1/volumes?q=isbn:9780007482931+OR+isbn:9781456610807
        if (self.hasIsbns()) {
            urlParam += self.ISBN + self.getIsbns().join("+OR+" + self.ISBN);
        }

        return urlParam;
    };

    /**
     * @return Book[]
     */
    self.getBooks = function(callback)
    {
        // @todo paging

        if (self.hasUrlParam()) {
            var url = self.API_URL + self.getUrlParam();
            console.log("Request url: " + url);

            $.ajax({
                url: url,
                dataType: "jsonp",
                async: true
            }).done(function (data, status) {
                if (status == "success") {
                    self.parseBooks(data, callback);
                }

                //console.log(data);
            });
        }
    };

    /**
     * @param rawData   Example https://www.googleapis.com/books/v1/volumes?q=intitle:harry+potter
     */
    self.parseBooks = function(rawData, callback)
    {
        var books = [];
        self.totalItems = rawData.totalItems;

        if (self.totalItems) {
            for (var i = 0; i < rawData.items.length; i++) {
                var hasIsbn = rawData.items[i].volumeInfo.industryIdentifiers ? true : false;
                if (hasIsbn) {
                    var priceAmount = null;
                    var priceCurrency = null;
                    if (typeof rawData.items[i].saleInfo.listPrice !== 'undefined') {
                        priceAmount = typeof rawData.items[i].saleInfo.listPrice.amount !== 'undefined' ? rawData.items[i].saleInfo.listPrice.amount : null;
                        priceCurrency = typeof rawData.items[i].saleInfo.listPrice.currencyCode !== 'undefined' ? rawData.items[i].saleInfo.listPrice.currencyCode : null;
                    }

                    var book = new Book({
                        id: rawData.items[i].id,
                        isbn: rawData.items[i].volumeInfo.industryIdentifiers[0].identifier,
                        title: rawData.items[i].volumeInfo.title,
                        authors: rawData.items[i].volumeInfo.authors,
                        description: rawData.items[i].volumeInfo.description,
                        publishedDate: rawData.items[i].volumeInfo.publishedDate,
                        images: rawData.items[i].volumeInfo.imageLinks,
                        categories: rawData.items[i].volumeInfo.categories,
                        averageRating: rawData.items[i].volumeInfo.averageRating,
                        ratingsCount: rawData.items[i].ratingsCount,
                        priceAmount: priceAmount,
                        priceCurrency: priceCurrency
                    });

                    books.push(book);
                }
            }
        }

        console.log(books);
        callback(books)
    };
};

var booksApi = new BooksApi();
