var BooksApi = function()
{
    var self = this;

    self.API_URL  = "https://www.googleapis.com/books/v1/volumes?q=";
    self.IN_TITLE = "intitle:";

    self.text = "";

    self.hasText = function(){return self.text != ""};
    self.getText = function() {return self.text;};
    self.setText = function(text) {self.text = helperTool.convertToSlug(text);};

    self.getTextParam = function()
    {
        return self.IN_TITLE + self.getText();
    };

    self.request = function(callback)
    {
        // @todo paging

        if (self.hasText()) {
            var url = self.API_URL + self.getTextParam();
            console.log("Request url: " + url);

            $.ajax({
                url: url,
                dataType: "jsonp",
                async: true
            }).done(function (data, status) {
                if (status == "success") {
                    callback(data);
                }

                console.log(data);
            });
        }
    };
};

var booksApi = new BooksApi();