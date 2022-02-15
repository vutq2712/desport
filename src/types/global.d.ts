import type { messages } from '@app/const/lang/en'; // use "en" as a standard configuration.
import type { Codes, LangArgs } from '@app/services/i18n';

declare global {
  /**
   * Translate text base on given code.
   * 
   * Because of the way `t` function and "its supporter" work, `t` is NOT "reactive".
   * That mean user will need to refresh page to get new translation.
   * Language switching is not a regular action, so this behaviour is acceptable.
   * 
   * IMPORTANT: DO NOT call this function from outside React component(nested is ok)!
   * 
   * _Real `t` implementation is placed at `src\services\i18n\index.ts`_
   */
  function t(code: Codes, args?: LangArgs): string;
}
