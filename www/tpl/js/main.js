// $.stellar();

$( document ).ready( function() {

    /* ------------------------------------------------------------ */
    $('.fancybox-image-link').fancybox();
    /* ------------------------------------------------------------ */

    /* ------------------------------------------------------------ */
    $( '.toggle-link' ).click(function( e ) {
        $( this ).closest( '.toggle' ).find( '.toggle-block' ).slideToggle( 'fast', function() {});
        e.preventDefault();
    });
    /* ------------------------------------------------------------ */

    /* ------------------------------------------------------------ */
    $('[data-toggle="tooltip"]').tooltip();
    /* ------------------------------------------------------------ */

    /* ------------------------------------------------------------ */
    $('.carousel').carousel({
        interval: 8000
    });
    /* ------------------------------------------------------------ */

    /* ------------------------------------------------------------ */
    $( '.demo-link' ).click(function( e ) {
        e.preventDefault();
    } );
    /* ------------------------------------------------------------ */

    /* ------------------------------------------------------------ */
    if ( document.getElementById( 'vmap' ) !== null ) {

        // Массив всех объектов
        var data_obj = {
            'ar' : ['Дистрибуция'],
            'bs' : ['Дистрибуция'],
            'bl' : ['Дистрибуция'],
            'vm' : ['Дистрибуция'],
            'vl' : ['Дистрибуция'],
            'vo' : ['Дистрибуция'],
            'iv' : ['Дистрибуция'],
            'ir' : ['Дистрибуция'],
            'kn' : ['Дистрибуция'],
            'ki' : ['Дистрибуция'],
            'ks' : ['Дистрибуция'],
            'ml' : ['Дистрибуция'],
            'mc' : ['Дистрибуция'],
            'nn' : ['Дистрибуция'],
            'ob' : ['Дистрибуция'],
            'pz' : ['Дистрибуция'],
            'pe' : ['Дистрибуция'],
            'rz' : ['Дистрибуция'],
            'ss' : ['Дистрибуция'],
            'sr' : ['Дистрибуция'],
            'sv' : ['Дистрибуция'],
            'ta' : ['Дистрибуция'],
            'tr' : ['Дистрибуция'],
            'tm' : ['Дистрибуция'],
            'ud' : ['Дистрибуция'],
            'ul' : ['Дистрибуция'],
            'ha' : ['Дистрибуция'],
            'cl' : ['Дистрибуция'],
            'cu' : ['Дистрибуция']
        };

        colorRegion = '#D3D3D3'; // Цвет всех регионов
        focusRegion = '#FF9900'; // Цвет подсветки регионов при наведении на объекты из списка
        selectRegion = '#5AA6C7'; // Цвет изначально подсвеченных регионов

        highlighted_states = {};

        // Массив подсвечиваемых регионов, указанных в массиве data_obj
        for ( iso in data_obj ) {
            highlighted_states[iso] = selectRegion;
        }

        $( '#vmap' ).vectorMap( {
            map: 'russia',
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            borderWidth: 2,
            color: colorRegion,
            colors: highlighted_states,
            hoverOpacity: 0.7,
            enableZoom: false,
            showTooltip: true,

            // Отображаем объекты если они есть
            onLabelShow: function( event, label, code ) {
                name = '<strong>' + label.text() + '</strong><br>';
                if ( data_obj[code] ) {
                    list_obj = '<ul>';
                    for ( ob in data_obj[code] ) {
                        list_obj += '<li>' + data_obj[code][ob] + '</li>';
                    }
                    list_obj += '</ul>';
                } else {
                    list_obj = '';
                }
                label.html( name + list_obj );
                list_obj = '';
            },
            // Клик по региону
            onRegionClick: function( element, code, region ) {

            }
        });

        // Выводим список объектов из массива
        for ( region in data_obj ) {
            for ( obj in data_obj[region] ) {
                $( '.list-object' ).append( '<li><a href="' + selectRegion + '" id="' + region + '" class="focus-region">' + data_obj[region][obj] + ' (' + region + ')</a></li>' );
            }
        }

        // Подсветка регионов при наведении на объекты
        $( '.focus-region' ).mouseover( function() {
            iso = $( this ).prop( 'id' );
            fregion = {};
            fregion[iso] = focusRegion;
            $( '#vmap' ).vectorMap( 'set', 'colors', fregion );
        } );

        $( '.focus-region' ).mouseout( function() {
            c = $( this ).attr( 'href' );
            cl = ( c === '#' ) ? colorRegion : c;
            iso = $( this ).prop( 'id' );
            fregion = {};
            fregion[iso] = cl;
            $( '#vmap' ).vectorMap( 'set', 'colors', fregion );
        });

    }
} );
/* ------------------------------------------------------------ */

/* ------------------------------------------------------------ */
//$( document ).on( 'submit', '#callback-form', function( e ) {
//    e.preventDefault();
//
//    var m_method = $( this ).attr( 'method' );
//    var m_action = $( this ).attr( 'action' );
//    var m_data = $( this ).serialize();
//
//    $.ajax( {
//        type: m_method,
//        url: m_action,
//        data: m_data,
//        resetForm: 'true',
//        success: function( result ) {
//            var data = $( result ).find( '#callbackModal_form' ).html();
//            $( '#callbackModal_form' ).html( data );
//        }
//    } );
//} );
/* ------------------------------------------------------------ */
/* ------------------------------------------------------------ */
$( document ).on( 'submit', 'form', function( e ) {
    e.preventDefault();

    var m_method = $( this ).attr( 'method' );
    var m_action = $( this ).attr( 'action' );
    var m_data = $( this ).serialize();

    $.ajax( {
        type: m_method,
        url: m_action,
        data: m_data,
        resetForm: 'true',
        success: function( result ) {
            var data = $( result ).find( '#optPrice' ).html();
            $( '#optPrice' ).html( data );
            var data2 = $( result ).find( '#callbackModal_form' ).html();
            $( '#callbackModal_form' ).html( data2 );
        }
    } );
} );
/* ------------------------------------------------------------ */
/* ------------------------------------------------------------ */
var off = $('.fix-after-scroll').offset().top;
var fixLeft = $( '.fix-after-scroll' ).offset().left;
$(window).on('scroll', function(){
    var scroll = $(window).scrollTop();
    if(scroll >= off-20){
        $('.fix-after-scroll').css({position: 'fixed', 'left': fixLeft + 50, 'z-index': '1000', top: '20px'});
    }else{
        $('.fix-after-scroll').css({position: 'static', 'top': off});
    }
});
/* ------------------------------------------------------------ */

/* ------------------------------------------------------------ */
// $( window ).scroll( function() {
//     var fixmeTop = $( '#ymaps-map-id_1337936117562610726452' ).offset().top;
//     var currentScroll = $( window ).scrollTop();

//     console.log('fixmeTop: ' + fixmeTop);
//     console.log('currentScroll: ' + currentScroll);

//     if ( currentScroll >= fixmeTop ) {
//         $( '#ymaps-map-id_1337936117562610726452' ).css( {
//             position: 'fixed',
//             top: '20px'
//         } );
//     } else {
//         $( '#ymaps-map-id_1337936117562610726452' ).css( {
//             position: 'static'
//         } );
//     }
// } );

var ymap_off = $('#ymaps-map-id_1337936117562610726452').offset().top;
var ymap_fixLeft = $( '#ymaps-map-id_1337936117562610726452' ).offset().left;
$(window).on('scroll', function(){
    var ymap_scroll = $(window).scrollTop();
    if(ymap_scroll >= ymap_off-20){
        $('#ymaps-map-id_1337936117562610726452').css({position: 'fixed', 'left': ymap_fixLeft, 'z-index': '900', top: '20px'});
    }else{
        $('#ymaps-map-id_1337936117562610726452').css({position: 'static', 'top': ymap_off});
    }
});


/* ------------------------------------------------------------ */
