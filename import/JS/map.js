let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.754502, 37.593900],
    zoom: 14,
    controls: []
  });

  const coords = [
    [55.762420, 37.563187],
    [55.752493, 37.602612],
    [55.760406, 37.613371],
    [55.745147, 37.580575]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "./img/marker.png",
    iconImageSize: [50, 62],
    iconImageOffset: [-3, -42]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);
  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);