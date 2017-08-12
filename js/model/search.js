var Search = function()
{
    var self = this;

    /* CK = cookie key */
    self.CK_LAST_SEARCHED = "last-searched";

    self.books        = [];

    self.searchDom = $("#main-menu #search");
    self.inputDom  = self.searchDom.find('input');
    self.goBtnDom  = self.searchDom.find('.btn');

    self.booksDom = $("body#index-page #main-content .books-wrapper .books");

    self.hasLastSearched = function() {return self.getLastSearched() != null;};
    self.getLastSearched = function() {return Cookies.get(self.CK_LAST_SEARCHED);};
    self.setLastSearched = function(lastSearched) {Cookies.set(self.CK_LAST_SEARCHED, lastSearched);};

    self.init = function()
    {
        self.onGoBtnClick();
        self.onEnterKeyPressOnInput();
    };

    self.onGoBtnClick = function()
    {
        self.goBtnDom.click(self.requestBooksApi);
    };

    self.onEnterKeyPressOnInput = function()
    {
        self.inputDom.on('keyup', function (e) {
            if (e.keyCode == 13) {
                self.requestBooksApi();
            }
        });
    };

    self.requestBooksApi = function(callback)
    {
        self.setLastSearched(self.inputDom.val());

        if (!router.isIndexPage()) {
            return router.redirectToIndexPage();
        }

        self.books = [];
        booksApi.setTitle(self.inputDom.val());
        booksApi.getBooks(self.refreshBooksDom);

        window.history.pushState({}, 'Index', '/index.html?q=' + booksApi.getTitle());
    };

    self.refreshBooksDom = function(books)
    {
        self.books = books;

        var booksHtml = "";
        if (self.books.length) {
            for (var i = 0; i < self.books.length; i++) {
                booksHtml += self.books[i].getListPageHtml();
            }
        }
        else {
            booksHtml += "<div>No books found :(</div>";
        }

        self.booksDom.html(booksHtml);
    };

    self.init();
};

var searchBar = new Search();