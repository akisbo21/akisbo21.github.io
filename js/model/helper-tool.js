var HelperTool = function()
{
    var self = this;

    /** @link https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery */
    self.convertToSlug = function(text)
    {
        return text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
    };
};

var helperTool = new HelperTool();