import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './js/refs';
import getQuery from './js/apiService';
import onImgClick from './js/getFullSizeImg';

refs.formRef.addEventListener('submit', render);
refs.galleryRef.addEventListener('click', onImgClick);

async function render(e) {
  e.preventDefault();

  let searchQuery = e.target.elements.query.value;
  refs.formContainerRef.classList.toggle('active');

  refs.inputRef.value = '';
  // console.log(searchQuery);
  getQuery(searchQuery, true);
  refs.buttonViewMoreRef.style.display = 'block';
}

refs.btnClickRef.addEventListener('click', function () {
  refs.formContainerRef.classList.toggle('active');
});

refs.inputRef.addEventListener('focus', function () {
  refs.formContainerRef.classList.add('focus');
});

refs.inputRef.addEventListener('blur', function () {
  refs.inputRef.value.length !== 0
    ? refs.formContainerRef.classList.add('focus')
    : refs.formContainerRef.classList.remove('focus');
});
