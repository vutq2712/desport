import { AuthLayout } from './auth-layout';
import { NormalLayout } from './normal-layout';
import { BlankLayout } from './blank-layout';

export { PageWrapper } from './page-wrapper';

export enum DELayout {
  NORMAL,
  AUTH,
  BLANK,
}

const availableLayout = {
  [DELayout.AUTH]: AuthLayout,
  [DELayout.NORMAL]: NormalLayout,
  [DELayout.BLANK]: BlankLayout,
}

export function getLayout(layout?: DELayout) {
  return availableLayout[layout || DELayout.NORMAL];
}
