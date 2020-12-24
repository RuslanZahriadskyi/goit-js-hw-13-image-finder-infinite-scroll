import refs from './refs';
import cardsMarkup from './markup';
import InfiniteScroll from 'infinite-scroll';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import errorsNotifications from './notification';

// console.log();

// console.dir();

// make imagesLoaded available for InfiniteScroll
InfiniteScroll.imagesLoaded = imagesLoaded;

function clear() {
  msnry.destroy();
  infScroll.destroy();
  refs.galleryRef.innerHTML = `
        <div class="grid__col-sizer"></div>
        <div class="grid__gutter-sizer"></div>`;
  refs.galleryRef.style = '';
  refs.pageLoadStatusRef.style.display = 'none';
  refs.infiniteScrollLastRef.style.display = 'none';
}

let msnry = null;
let infScroll = null;

function getQuery(searchQuery, update = false) {
  if (update & !(msnry === null) & !(infScroll === null)) {
    clear();
  }

  // console.log(update);

  const url = 'https://pixabay.com/api/';
  const apiKey = '19598883-8e8293d515495519269109cc8';

  const search = `https://obscure-citadel-20244.herokuapp.com/${url}?image_type=photo&q=${searchQuery}&per_page=12&key=${apiKey}`;
  // console.log(search);

  // init Masonry
  msnry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    columnWidth: '.grid__col-sizer',
    gutter: '.grid__gutter-sizer',
    percentPosition: true,
    stagger: 30,
    // nicer reveal transition
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
  });

  // now you can use outlayer option
  infScroll = new InfiniteScroll('.grid', {
    // options...
    path: function () {
      return search + '&page=' + this.pageIndex;
    },
    // load response as flat text
    responseType: 'text',
    outlayer: msnry,
    loadOnScroll: false,
    status: '.page-load-status',
    history: false,
  });

  infScroll.on('load', function (response) {
    const proxyElem = document.createElement('div');

    // parse response into JSON data
    const data = JSON.parse(response);
    // console.log(data.hits);

    if (data.hits.length === 0) {
      return errorsNotifications(
        'Nothing was found for your request.',
        'Please enter another request!',
      );
    }

    // compile data into HTML
    const markup = cardsMarkup(data.hits);

    // convert HTML string into elements
    proxyElem.insertAdjacentHTML('beforeend', markup);
    // console.log((proxyElem.insertAdjacentHTML = cardsMarkup(data.hits)));

    // append item elements
    const items = proxyElem.querySelectorAll('.grid-item');
    // console.log(markup.length);
    if (markup.length === 0) {
      clear();
    }

    // refs.buttonViewMoreRef.style.display = 'block';
    // append item elements
    imagesLoaded(items, function () {
      // console.log(this.pageIndex);
      infScroll.appendItems(items);
      msnry.appended(items);
    });
  });

  refs.buttonViewMoreRef.addEventListener('click', activaredInfScroll);

  function activaredInfScroll() {
    // enable loading on scroll
    infScroll.options.loadOnScroll = true;
    // hide page

    refs.buttonViewMoreRef.style.display = 'none';
    // console.dir(refs.buttonViewMoreRef);
  }

  // load initial page
  infScroll.loadNextPage();
}

export default getQuery;
