var request = require('request');
var cheerio = require('cheerio');
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
        //var aid = g_rgListingInfo[itemids[l]].asset.id;
        //var did = g_rgListingInfo[itemids[l]].asset.market_actions[0].link.replace("steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20M%listingid%A%assetid%D", "");
        //var id = itemids[l];
        //var itemObj = {link: "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20M"+id+"A"+aid+"D"+did}
        let m_id = itemids[l];
        let a_id = g_rgListingInfo[itemids[l]].asset.id;
        let d_id = g_rgListingInfo[itemids[l]].asset.market_actions[0].link
        .replace("steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20M%listingid%A%assetid%D", "");
        var itemObj = {m_id: m_id, a_id: a_id, d_id: d_id};
        itemArr.push(itemObj);
        //console.log(itemArr);
        };
    itemVArr = [];
    for (var l = 0;l<itemArr.length; l++){
       request('https://api.csgofloat.com/?m='+itemArr[l].m_id+'&a='+itemArr[l].a_id+'&d='+itemArr[l].d_id, function (error, response, body) {
       var obj = JSON.parse(response.body);
       var itemV = {id: itemArr[l].m_id, float: obj.iteminfo.floatvalue};
       itemVArr.push(itemV);
       console.log(itemVArr);
       console.log(obj.iteminfo.floatvalue);
    });
    };
 });
//request('https://api.csgofloat.com/?m=2738655763868965887&a=15509394941&d=3353011975288701571', function (error, response, body) {
//var $ = cheerio.load(response.body);
//console.log('error:', error); // Print the error if one occurred
//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//console.log('body:', body); // Print the HTML for the Google homepage.
//var obj = JSON.parse(response.body);
//console.log(obj.iteminfo.floatvalue);