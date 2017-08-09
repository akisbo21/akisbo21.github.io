var Book = function(data)
{
    var self = this;

    self.title         = data.title;
    self.authors       = data.authors;
    self.description   = data.description;
    self.images        = data.images;
    self.averageRating = data.averageRating;
    self.ratingsCount  = data.ratingsCount;
    self.priceAmount   = data.priceAmount;
    self.priceCurrency = data.priceCurrency;

    self.getTitle = function() {return self.title;};
    self.getAuthors = function() {return self.authors;};

    self.hasDescription = function() {return self.description != null;};
    self.getDescription = function() {return self.description;};

    self.hasAverageRating = function() {return self.averageRating != null;};
    self.getAverageRating = function() {return self.averageRating;};

    self.hasRatingsCount = function() {return self.ratingsCount != null;};
    self.getRatingsCount = function() {return self.ratingsCount;};

    self.hasPriceAmount = function() {return self.priceAmount != null;};
    self.getPriceAmount = function() {return self.priceAmount;};

    self.hasPriceCurrency = function() {return self.priceCurrency != null;};
    self.getPriceCurrency = function() {return self.priceCurrency;};

    self.hasImages = function() {return self.images != null;};
    self.getImages = function() {return self.images;};

    self.getThumbnailImage = function()
    {
        return self.hasImages() ? self.getImages().thumbnail : "img/book-thumbnail-placeholder.png";
    };

    self.getHtml = function()
    {
        return '<div class="one-book-wrapper">' +
                    '<div class="one-book">' +
                        '<div class="image-wrapper">' +
                         '<img src="' + self.getThumbnailImage() + '" />' +
                        '</div>' +
                    '</div>' +
               '</div>'
    };
};