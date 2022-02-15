import { useContext } from 'react';
import { messages } from '@app/const/lang/en';
import { DeAppContext } from '@app/context/de-app.ctx';

function getLangCnf() {
  if (typeof window !== "undefined") {
    return window.__NEXT_DATA__.props.langCnf;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const deAppCtx = useContext(DeAppContext);
  const { locale } = deAppCtx;
  return require(`@app/const/lang/${locale}`).messages;
}

export type Codes = keyof typeof messages;

export type LangArgs = { [k: string]: any }

/**
 * Translate text base on given code.
 * 
 * Because of the way `t` function and "its supporter" work, `t` is NOT "reactive".
 * That mean user will need to refresh page to get new translation.
 * Language switching is not a regular action, so this behaviour is acceptable.
 * 
 * IMPORTANT: DO NOT call this function from outside React component(nested is ok)!
 */
export function t(code: Codes, args: LangArgs = {}): string {
  const inUsedLangCnf = getLangCnf();
  const rawMsg = inUsedLangCnf[code] as string;

  if (!rawMsg) {
    return code;
  }

  return rawMsg.replace(/{{(\w+)}}/g, function (match, key) {
    return args[`${key}`] ? args[`${key}`] : match;
  });
}
