var ids = "M14635 M18374 M23852 M13728 M6827 M14635";
ids = ids.split(' ');
var jsoncontinente = "{\n    \"continente\":\n        \"M14635\" : { \"nume\":\"Europa\", \"fructe\":[0,3,2]},\n        \"M18374\" : { \"nume\":\"Asia\", \"fructe\":[0,3,2]},\n        \"M23852\" : { \"nume\":\"Australia\", \"fructe\":[0,3,2]},\n        \"M13728\" : { \"nume\":\"Africa\", \"fructe\":[0,3,2]},\n        \"M6827\"  : { \"nume\":\"America de Nord\", \"fructe\":[0,3,2]},\n        \"M14635\" : { \"nume\":\"America de Sud\", \"fructe\":[0,3,2]}\n\n    \n}";
jsoncontinente = JSON.parse(jsoncontinente);
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('svg').addEventListener('click', function (e) {
        var el = e.target;
        console.log(jsoncontinente);
        if (ids.includes(el.id)) {
            alert(jsoncontinente);
        }
    });
});
