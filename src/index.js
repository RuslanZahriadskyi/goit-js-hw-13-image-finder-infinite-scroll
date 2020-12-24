import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './js/refs';
import getQuery from './js/apiService';
import onImgClick from './js/getFullSizeImg';

refs.formRef.addEventListener('submit', render);
refs.galleryRef.addEventListener('click', onImgClick);
// refs.buttonViewMoreRef.addEventListener('click', activeScroll);

function render(e) {
  e.preventDefault();

  let searchQuery = e.target.elements.query.value;

  getQuery(searchQuery, true);
}
