jQuery(function($){
	$(document).on('touchstart', function (e){ // событие клика по веб-документу
		var div = $("#menuToggle"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $("#opclose").prop("checked", false); // скрываем его
		}
	});
});