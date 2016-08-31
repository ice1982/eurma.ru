<?php
$scale = 17;
$addr_def = 'Чебоксары, пр. Машиностроителей, 1';
?>
<div style="left: -9999px;">yandexm</div>
<input type="hidden" id="tv<?=$field_id?>" name="tv<?=$field_id?>" value="<?=$field_value?>"/>
<input type="text" id="tvshow<?=$field_id?>" name="tvshow<?=$field_id?>" value="<?=$field_value?>"/>
<input type="text" id="tvAddr<?=$field_id?>" onkeyup="changeAddress(this.value);" value="<?=$addr_def?>"/>
<input id="tvSubmit<?=$field_id?>" type="button" value="&rarr;" onclick="showAddress(document.getElementById('tvAddr<?=$field_id?>').value);"/>
<div id="tvYmap<?=$field_id?>" style="width:500px;height:360px; border: 1px solid #ccc;"></div>
<script type="text/javascript" src="http://api-maps.yandex.ru/2.0/?load=package.full&mode=debug&lang=ru-RU" type="text/javascript"></script>
<script type="text/javascript">
    var tvid = <?=$field_id?>;
	var tvfield = document.getElementById("tv"+tvid);
	var tvcs = tvfield.value.split("||");
	var tvshow = document.getElementById("tvshow"+tvid);
	var tvaddr = document.getElementById("tvAddr"+tvid);
    var tvcoords = tvcs[0].split(",",2);
	var addrzoom = tvcs[1] ? tvcs[1].split('==') : ["<?=$addr_def?>","<?=$scale?>"];
	tvshow.value = tvcs[0];
	tvaddr.value = addrzoom[0] || "<?=$addr_def?>";
	
    ymaps.ready(function() {
        map = new ymaps.Map("tvYmap"+tvid, {center: [ tvcoords[1],tvcoords[0] ], zoom: addrzoom[1] || <?=$scale?>, type: "yandex#map", behaviors: ["default", "scrollZoom"]});
        map.controls
        .add("zoomControl")
        .add("mapTools")
        .add(new ymaps.control.TypeSelector(["yandex#map", "yandex#satellite", "yandex#hybrid", "yandex#publicMap"]));
		mark = new ymaps.Placemark(
			[ tvcoords[1],tvcoords[0] ],
			{balloonContent: addrzoom[0]},
			{preset: "twirl#lightblueDotIcon", draggable: true}
		);
		map.geoObjects.add(mark);
        map.events.add("click", function(e){
			var newGeoPoint = e.get("coordPosition");
			mark.geometry.setCoordinates(newGeoPoint);
            var text = mark.properties.get("balloonContent");
			setBalloonInfo(mark, newGeoPoint, text);
		}).add("boundschange", function(e){
			setBalloonInfo(mark, mark.geometry.getCoordinates(), mark.properties.get("balloonContent"));
		});
		mark.events.add("drag", function(e){
			var pos = mark.geometry.getCoordinates();
            var text = mark.properties.get("balloonContent");
			setBalloonInfo(mark, pos, text);
		});	
	});
	
	function showAddress (value) {		
		var myGeocoder = ymaps.geocode(value);
		myGeocoder.then(
			function (res) {
				if (res.geoObjects.getLength()) {
					var center = res.geoObjects.get(0).geometry.getCoordinates();
					mark.geometry.setCoordinates(center);
					map.panTo(center);
					setBalloonInfo(mark, center, res.metaData.geocoder.request);
				} else { console.log("Ничего не найдено"); }
			},
			function (err) {
				console.log("Ничего не найдено");
			}
		);
	}
	
	function changeAddress(val){
		var old = tvfield.value.split('||');
		tvfield.value = old[0]+'||'+val+'=='+old[1].split('==')[1];
	}

	function setBalloonInfo (placemark, geoPoint, text) {
		var text = text || "Объект";
		var pos = geoPoint[1]+","+geoPoint[0];
		var zoom = map.getZoom();
		placemark.properties.set("balloonContent", text);
		tvfield.value = pos+'||'+text+'=='+zoom;
		tvshow.value = pos;
	}
</script>