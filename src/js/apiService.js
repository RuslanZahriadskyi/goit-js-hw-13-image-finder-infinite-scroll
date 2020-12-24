import refs from './refs';
import cardsMarkup from './markup';

const Masonry = require('masonry-layout');
const InfiniteScroll = require('infinite-scroll');
const imagesLoaded = require('imagesloaded');
// make imagesLoaded available for InfiniteScroll
InfiniteScroll.imagesLoaded = imagesLoaded;

function getQuery(searchQuery) {
  // init Masonry
  const msnry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    columnWidth: '.grid__col-sizer',
    gutter: '.grid__gutter-sizer',
    percentPosition: true,
    stagger: 30,
    // nicer reveal transition
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
  });

  const url = 'https://pixabay.com/api/';
  const apiKey = '19598883-8e8293d515495519269109cc8';

  const search = `https://obscure-citadel-20244.herokuapp.com/${url}?image_type=photo&q=${searchQuery}&per_page=12&key=${apiKey}`;

  // now you can use outlayer option
  const infScroll = new InfiniteScroll('.grid', {
    // options...
    path: function () {
      return search + '&page=' + this.pageIndex;
    },
    // load response as flat text
    responseType: 'text',
    outlayer: msnry,
    status: '.page-load-status',
    history: false,
  });

  infScroll.on('load', function (response) {
    const proxyElem = refs.galleryRef;
    // parse response into JSON data
    const data = JSON.parse(response);
    // console.log(data.hits);
    // compile data into HTML
    const markup = cardsMarkup(data.hits);
    // convert HTML string into elements
    proxyElem.insertAdjacentHTML('beforeend', markup);
    // console.log((proxyElem.insertAdjacentHTML = cardsMarkup(data.hits)));
    // append item elements
    const items = proxyElem.querySelectorAll('.grid-item');
    // console.log(items);
    // append item elements
    imagesLoaded(items, function () {
      infScroll.appendItems(items);
      msnry.appended(items);
    });
    // console.log(imagesLoaded(items, function () {
    //   infScroll.appendItems(items);
    //   msnry.appended(items);
    // }))
  });

  // load initial page
  infScroll.loadNextPage();
}

export default getQuery;
