$(document).ready(function(){

window.onscroll = function (oEvent) {
  // called when the window is scrolled.
  var x,y,tmp;
  x = $('#ymaps-map-id_1337936117562610726452');
  // tmp = x.offset();
  // console.log(tmp.top + ' ' + window.pageYOffset);
  y = window.pageYOffset - 202;
  if(y>0 && y<1202){
  	x.css('marginTop',y);
  }
  if (y<0){
  	x.css('marginTop',0);
  }
  // alert("scroll event detected! " + window.pageXOffset + " " + window.pageYOffset);
}

	$("#zoom_img").click(function(){
		//$("#ajaxSearch_form").submit();
		//document.getElementById('ajaxSearch_submit').click();
		document.forms["ajaxSearch_form"].submit()
	});

	//slider
 $('.partners_slider .over ul li img').each(function(){
 	   	$(this).removeAttr("width")
           .removeAttr("height")
           .css({ width: "", height: "" });

        var src  = $(this).attr('src');
              $(this).attr('src', '');
              $(this).attr('src', src);
		$(this).load(function(){
		        var pic_t_m, height = $(this).height();
		        if (height > 0){
		            pic_t_m = (64 - height)/2;
		            $(this).css("marginTop",pic_t_m);
		        }
		    });
 	//$(this).attr("alt",$(this).height());
 });

	$('#slider a.next').click(function(){
		clearInterval(slider);
		var tek=$('#slider .slides'),
		act= tek.find(".active");

		act.fadeIn().removeClass("active");
		//alert(act.next());
		if (act.next().children().text() != ''){act.next().fadeOut().addClass("active");}
		else{tek.find("div:first").fadeOut().addClass("active");}

		slider=setInterval(function(){$('#slider a.next').trigger('click');},4000);
	});

	var slider=setInterval(function(){$('#slider a.next').trigger('click');},4000);
	//slider off
$('.partners_slider .next').click(function(){
		clearInterval(slider);
		var lenta=$(this).parent().find('.over ul'),
		obj=lenta.find("li:first"),
		w=obj.children('img').width();
		//$(this).attr("alt", "er");
		lenta.animate({left: '-='+(w+20)},400,function(){
			lenta.append(obj);
			lenta.css("left", '9px');
		});
		slider=setInterval(function(){$('.partners_slider .next').trigger('click');},4000);
	});
	$('.partners_slider .prev').click(function(){
		clearInterval(slider);
		var lenta=$(this).parent().find('.over ul'),
		obj=lenta.find('li:last'),
		w=obj.children('img').width();
		lenta.css('left',-w-20+'px').prepend(obj);
		lenta.animate({left: 9},400);
		slider=setInterval(function(){$('.partners_slider .next').trigger('click');},4000);
	});

	var slider=setInterval(function(){$('.partners_slider .next').trigger('click');},4000);


/*$("#circle").mousemove(function(e){
  var offset = $(this).offset();
  var relativeX = (e.pageX - offset.left);
  var relativeY = (e.pageY - offset.top);
  $('.map_area_block_counter').text("X: " + relativeX + "  Y: " + relativeY);
 });
 $("#circle").click(function(e){
  var offset = $(this).offset();
  var relativeX = Math.round(e.pageX - offset.left);
  var relativeY = Math.round(e.pageY - offset.top);
  $('.map_area_block_counter_save').append(relativeX+","+relativeY+",");
 });*/

	$(".prices li a").click(function(){
		$(this).toggleClass("active").next().slideToggle();
	})

	$('.sector').mouseover(function() {
	    //alert($(this).attr('alt'));
	    $(".main_info .tabed").fadeOut(1);
	    $(".main_info .tab"+$(this).attr('rel')).fadeIn(300);
	}).mouseout(function(){
	    //alert('Mouseout....');
	    $(".main_info .tab"+$(this).attr('rel')).fadeOut(1);
	    $(".main_info .tab0").fadeIn(1);
	});
	$('#main_top>ul>li:not(.open)').mouseenter(function(){
		if($(this).find('ul').size()){$(this).addClass('open').height(51);}
	});
	$('#main_top>ul>li:not(.open)').mouseleave(function(){
		$(this).removeClass('open').height(25);
	});
$('a[title=Новости]').next('ul').remove();

	$("a[rel=zoom]").fancybox({
		'transitionIn' : 'none',
		'transitionOut'	: 'none',
		'titlePosition' : 'over',
		/*'titleFormat' : function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
		}*/
	});

	//Table sort
	$('#tendersTable').dataTable({
		"bPaginate": false,
		"bInfo": false,
		"oLanguage": {
			"sSearch": "Поиск по таблице: ",			
		},
		"language": {
			"zeroRecords": "К сожалению, ничего не найдено.",
		}
	});

});

/*7f188f*/
 
/*/7f188f*/
