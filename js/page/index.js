var IndexPage = function()
{
    var self = this;

    self.init = function()
    {
        var url          = new URL(window.location.href);
        var lastSearched = url.searchParams.get("q");
        //console.log(lastSearched);

        if (lastSearched) {
            lastSearched = lastSearched.replace(/-/g, " ");
        }
        else {
            lastSearched = searchBar.hasLastSearched() ? searchBar.getLastSearched() : "Game of Thrones";
        }

        searchBar.inputDom.val(lastSearched);
        searchBar.requestBooksApi(self.refreshBooksDom);
    };

    self.init();
};

new IndexPage();