var Search = function(searchDom)
{
    var self = this;

    self.books        = [];

    self.searchDom = searchDom;
    self.inputDom  = self.searchDom.find('input');
    self.goBtnDom  = self.searchDom.find('.btn');

    self.booksDom = $("body#index-page #main-content .books-wrapper .books");

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

    self.requestBooksApi = function()
    {
        Search.setLastSearched(self.inputDom.val());

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

/* CK = cookie key */
Search.CK_LAST_SEARCHED = "last-searched";
Search.hasLastSearched = function() {return Search.getLastSearched() != null;};
Search.getLastSearched = function() {return Cookies.get(Search.CK_LAST_SEARCHED);};
Search.setLastSearched = function(lastSearched) {Cookies.set(Search.CK_LAST_SEARCHED, lastSearched);};

var searchBar       = new Search($("#main-menu .search-bar-container"));
var mobileSearchBar = new Search($("#main-content .search-bar-container"));