var BooksApi = function()
{
    var self = this;

    self.API_URL  = "https://www.googleapis.com/books/v1/volumes?q=";
    self.IN_TITLE = "intitle:";

    self.request = function(callback)
    {
        // @todo paging

        var url = self.API_URL + self.IN_TITLE + "harry+potter";
        console.log("Request url: " + url);

        $.ajax({
            url : url,
            dataType : "jsonp",
            async : true
        }).done(function(data, status){
            if (status == "success") {
                callback(data);
            }

            console.log(data);
        });

        //var ajax = {
        //    parseJSONP : function(result) {
        //        //iterate each returned item
        //        $.each(result, function(i, row) {
        //            $('#listview_test').append('<li><h3>' + row.volumeInfo.title + '</h3></a></li>');
        //        }); //end iteration of data returned from server and append to the list
        //        $('#listview_test').listview('refresh'); // refresh the list-view so new elements are added to the DOM
        //    }
        //}
    };
};