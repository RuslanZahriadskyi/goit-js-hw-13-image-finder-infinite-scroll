import cardTemplates from '../templates/card.hbs';

function cardMarkup(cards) {
  return cardTemplates(cards);
}

export default cardMarkup;
