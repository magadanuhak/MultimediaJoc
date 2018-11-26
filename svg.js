var ids = "M14635 M18374 M23852 M13728 M6827 M14635";
ids = ids.split(' ');
var jsoncontinente = {
    "continente": [
        1,
        { "id": "M14635", "nume": "Europa", "fructe": [0, 3, 2] },
        { "id": "M18374", "nume": "Asia", "fructe": [0, 3, 2] },
        { "id": "M23852", "nume": "Australia", "fructe": [0, 3, 2] },
        { "id": "M13728", "nume": "Africa", "fructe": [0, 3, 2] },
        { "id": "M6827", "nume": "America de Nord", "fructe": [0, 3, 2] },
        { "id": "M14635", "nume": "America de Sud", "fructe": [0, 3, 2] }
    ]
};
document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('svg').addEventListener('click', function (e) {
        var el = e.target;
        el;

        if(jsoncontinente.continente.includes(1)){
            console.log('este');
        }else{
            console.log('nu Este');
        }
    });
});

