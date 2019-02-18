var request = require('request');
var cheerio = require('cheerio');
var jQuery = require('jquery');
var URL = 'https://steamcommunity.com/market/listings/730/StatTrak%E2%84%A2%20MP7%20%7C%20Akoben%20(Factory%20New)';

request(URL, function (err, res, body) {
    if (err) throw err;
    var $ = cheerio.load(res.body);
    var data = $("div").find("script").contents('ListingInfo')[3].data;
    var index = data.indexOf('var g_plotPriceHistory = null;');
    eval (data.substr (0,index));

    var itemArr = [];
    var itemids = Object.keys(g_rgListingInfo);
    for (var l = 0; l<itemids.length; l++) {
        let m_id = itemids[l];
        let a_id = g_rgListingInfo[itemids[l]].asset.id;
        let d_id = g_rgListingInfo[itemids[l]].asset.market_actions[0].link
        .replace("steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20M%listingid%A%assetid%D", "");
        var itemObj = {m_id: m_id, a_id: a_id, d_id: d_id};
        itemArr.push(itemObj);
        //console.log(itemArr);
        };
    function CallCSGOFloat(m_id,a_id,d_id, callback) {
        request('https://api.csgofloat.com/?m='+m_id+'&a='+a_id+'&d='+d_id, function (error, response, body) {
            var obj =JSON.parse(response.body);
            var itemV = {
                id: m_id,
                float: obj.iteminfo.floatvalue
            };
            callback(itemV);
        });
    };
    var myArray = [];
    for (var n = 0; n < 10; n++) {
        CallCSGOFloat(itemArr[n].m_id,itemArr[n].a_id,itemArr[n].d_id, function(item) {
            myArray.push(item);
        });    
    };
    function hz(someurl,callback){
        someurl 
    }
$.ajax({
    type:    "GET",
    url:     "C:\Users\kirill.slobodyanyuk\Documents\GitHub\steamscraper\itemurls.txt", // путь к файлу
    success: function(text) {
    // `text` is the file text
    },
    error:   function() {
        // An error occurred
    }
});


 });
//request('https://api.csgofloat.com/?m=2738655763868965887&a=15509394941&d=3353011975288701571', function (error, response, body) {
//var $ = cheerio.load(response.body);
//console.log('error:', error); // Print the error if one occurred
//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//console.log('body:', body); // Print the HTML for the Google homepage.
//var obj = JSON.parse(response.body);
//console.log(obj.iteminfo.floatvalue);