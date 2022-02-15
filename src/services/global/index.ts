import { t } from '@app/services/i18n';

if (typeof window !== "undefined") {
  window['t'] = t;
} else {
  global['t'] = t;
}
