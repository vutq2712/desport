import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkUserLogin, clearUserCredential } from '@app/services/auth';
import { myProfile, MyProfile } from '@app/api/user/my-profile';
import { userSessionSubject } from './session-subject';

/** DO NOT export this variable! */
let isFetchingUserData = false;

function getUserInfo() {
  const userData = userSessionSubject.getValue();
  const shouldNotCallApi = userData || isFetchingUserData;
  if (shouldNotCallApi) return;

  isFetchingUserData = true;

  myProfile().subscribe(res => {
    userSessionSubject.next(res.data);
  });
}

export interface UserSession {
  isLoggedIn: boolean;
  userInfo?: MyProfile;
}

export function useSession() {
  const router = useRouter();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<MyProfile>();

  useEffect(() => {
    const isLoggedIn = checkUserLogin();

    userSessionSubject.subscribe(data => {
      setUserInfo(data);
    });

    setIsloggedIn(isLoggedIn);
    isLoggedIn && getUserInfo();
  }, []);

  /**
   * This function allow you to sync new data from server and notify to
   * all components that use `useSession` hook about new data.
   */
  const syncDataWithServer = useCallback(() => {
    const isLoggedIn = checkUserLogin();
    isLoggedIn && getUserInfo();
  }, [])

  const logout = useCallback(() => {
    clearUserCredential();
    userSessionSubject.next(undefined);
    isFetchingUserData = false;
    router.push('/auth/login');
  }, [router]);

  return { isLoggedIn, userInfo, syncDataWithServer, logout };
}
