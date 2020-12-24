import { error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
defaults.styling = 'material';
defaults.icons = 'material';

function errorsNotifications(title, text) {
  error({
    title: title,
    text: text,
  });
}

export default errorsNotifications;
