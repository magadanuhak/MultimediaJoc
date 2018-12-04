var ids = "M14635 M18374 M23852 M13728 M6827 M14635 M7578";
ids = ids.split(' ');
var jsoncontinente = "{\n\t\"continente\": [{\n\t\t\t\"id\": \"M14635\",\n\t\t\t\"data\": {\n\t\t\t\t\"nume\": \"Europa\",\n\t\t\t\t\"fructe\": [1, 2, 3, 4, 5, 8, 9]\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"id\": \"M18374\",\n\t\t\t\"data\": {\n\t\t\t\t\"nume\": \"Asia\",\n\t\t\t\t\"fructe\": [3, 1, 4,6]\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"id\" : \"M23852\",\n\t\t\t\"data\": {\n\t\t\t\"nume\": \"Australia\",\n\t\t\t\"fructe\": [4, 3, 9]\n\t\t}\n\t},\n\t{\n\t\t\"id\": \"M13728\",\n\t\t\"data\": {\n\t\t\t\"nume\": \"Africa\",\n\t\t\t\"fructe\": [0, 4, 7, 8]\n\t\t}\n\t},\n\t{\n\t\t\"id\": \"M6827\",\n\t\t\"data\": {\n\t\t\t\"nume\": \"America de Nord\",\n\t\t\t\"fructe\": [9, 4, 2, 3, 1]\n\t\t}\n\t},\n\t{\n\t\t\"id\": \"M7578\",\n\t\t\"data\": {\n\t\t\t\"nume\": \"America de Sud\",\n\t\t\t\"fructe\": [8, 4, 5, 0]\n\t\t}\n\t}\n]\n}";
jsoncontinente = JSON.parse(jsoncontinente);
document.addEventListener('DOMContentLoaded', function () {
    $('#modalFer .inchide').on('click', function () {
        $('#modalFer').toggle();
    });
    document.querySelector('svg').addEventListener('click', function (e) {
        var el = e.target;
        console.log(jsoncontinente);
        if (ids.includes(el.id)) {
            jsoncontinente.continente.forEach(function (element) {
                if (element.id == el.id) {
                    var imagini = "";
                    $('#modalFer').toggle();
                    $('#modalFer #modalTitle').html(element.data.nume);
                    element.data.fructe.forEach(function (fruct, indexFruct) {
                        imagini += '<img src="assets/img/' + fruct + '.png" class="fructul"> ';
                    });
                    $('#modalFer #modalText').html(imagini);
                }
            });
        }
    });
});
