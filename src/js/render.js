import refs from './refs';
import getQuery from './apiService';

refs.formRef.addEventListener('submit', render);

function render(e) {
  e.preventDefault();

  const form = refs.formRef;
  const searchQuery = form.elements.query.value;

  // console.log(searchQuery);

  getQuery(searchQuery);
}
