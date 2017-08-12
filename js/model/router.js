var Router = function()
{
    var self = this;

    self.isIndexPage= function()
    {
        return $('body#index-page').length;
    };

    self.redirectToIndexPage = function()
    {
        window.location.href = '/index.html';
    };
};

var router = new Router();