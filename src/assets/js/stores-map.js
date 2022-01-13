var DEFAULT_COORDS = [55.76, 37.64];
var DEFAULT_ZOOM = 10;
var storesMap;

ymaps.ready(initMap);

function initMap() {
    storesMap = new ymaps.Map('shops-map', {
        center: DEFAULT_COORDS,
        zoom: DEFAULT_ZOOM,
        controls: ['zoomControl']
    });

    addShopsToMap(storesMap);
    initShopView(storesMap);

    return storesMap;
}

function initShopView(storesMap) {
    $('.s-btn__map').click(function(e) {
        var coords = [$(this).closest('.s-item__address').data('map-coords-y'), $(this).closest('.s-item__address').data('map-coords-x')];

        var balloonData = generateYmapsBallonMarkupShop($(this).closest('.s-item__address'));

        setTimeout(function() {
            storesMap.balloon.close(true);
            storesMap.balloon.open(storesMap.getCenter(), {
                contentBody: balloonData
            });
        }, 300);

        storesMap.setCenter([$(this).closest('.s-item__address').data('map-coords-y'), $(this).closest('.s-item__address').data('map-coords-x')], defaultMapZoomFactor = 15);

        $('.s-label').removeAttr('data-active');
        $('.s-label[data-tab="map"]').attr('data-active', true);

        $('.s-list').removeAttr('data-active');
        $('.s-list[data-tab="map"]').attr('data-active', true);

        $(window).scrollTop(0);
    });
}

function addShopsToMap(storesMap) {
    var shops = document.querySelectorAll('.s-item__list > ul > li');
    [].forEach.call(shops, function(shop) {
        var shopPlaceMark = new ymaps.Placemark([shop.dataset.mapCoordsY, shop.dataset.mapCoordsX], {
            balloonContentBody: generateYmapsBallonMarkupShop($(shop))
        }, {
            iconLayout: 'default#image',
            iconImageHref: "assets/images/map-marker.svg",
            iconImageSize: [30, 44],
            iconImageOffset: [-15, -44],
            hideIconOnBalloonOpen: false
        });

        storesMap.geoObjects.add(shopPlaceMark);
    });
}

function generateYmapsBallonMarkupShop(shop) {
    var shopData = {
        title: shop.find('.s-store__name').text(),
        address: shop.find('.s-address').text(),
        phone: shop.find('.s-phone').text(),
        workTime: shop.find('.s-time').text()
    };

    return `
    \n <p style="font-weight:bold;font-size:16px">${shopData.title}</p>
    \n  <p style="font-size:11px"> ${shopData.address} </p>
    \n  <p style="font-size:11px"> ${shopData.phone} </p>
    \n  <p style="font-size:11px"> ${shopData.workTime} </p>`
}
