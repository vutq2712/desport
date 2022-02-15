import { BehaviorSubject } from 'rxjs';
import { MyProfile } from '@app/api/user/my-profile';

/**
 * @deprecated Actually, this variable is not deprecated.
 * It is only used inside hooks/session, so __DO NOT__ expose it to outside world.
 */
export const userSessionSubject = new BehaviorSubject<MyProfile | undefined>(undefined);
