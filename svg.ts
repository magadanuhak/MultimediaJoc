var ids="M14635 M18374 M23852 M13728 M6827 M14635 M7578";
    ids = ids.split(' ');
var jsoncontinente = `{
	"continente": [{
			"id": "M14635",
			"data": {
				"nume": "Europa",
				"fructe": [1, 2, 3, 4, 5, 8, 9]
			}
		},
		{
			"id": "M18374",
			"data": {
				"nume": "Asia",
				"fructe": [3, 1, 4,6]
			}
		},
		{
			"id" : "M23852",
			"data": {
			"nume": "Australia",
			"fructe": [4, 3, 9]
		}
	},
	{
		"id": "M13728",
		"data": {
			"nume": "Africa",
			"fructe": [0, 4, 7, 8]
		}
	},
	{
		"id": "M6827",
		"data": {
			"nume": "America de Nord",
			"fructe": [9, 4, 2, 3, 1]
		}
	},
	{
		"id": "M7578",
		"data": {
			"nume": "America de Sud",
			"fructe": [8, 4, 5, 0]
		}
	}
]
}`
jsoncontinente = JSON.parse(jsoncontinente);


document.addEventListener('DOMContentLoaded',function () {

    $('#modalFer .inchide').on('click',function () {
        $('#modalFer').toggle();
    })
    document.querySelector('svg').addEventListener('click',function(e){
        let el =  e.target;

        console.log(jsoncontinente);
        if( ids.includes(el.id) ){
            jsoncontinente.continente.forEach( function (element) {
                if(element.id == el.id){
                    var imagini = "";
                    $('#modalFer').toggle();
                    $('#modalFer #modalTitle').html(element.data.nume) ;
                    element.data.fructe.forEach(
                        function (fruct, indexFruct) {
                        imagini+='<img src="assets/img/'+fruct+'.png" class="fructul"> ';
                        }
                    );
                    $('#modalFer #modalText').html(imagini)
                }
            });
        }
    });
})
