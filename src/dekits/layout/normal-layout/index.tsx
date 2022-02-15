/* eslint-disable no-return-await */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ModalPortal } from '@app/dekits/modal';
import { useSession } from '@app/hooks/session';

interface NormalLayoutProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNode;
}

const Nav = dynamic(async () => await (import('./block/b-nav')));
const Sidebar = dynamic(async () => await (import('./block/b-sidebar')));
const SettingSidebar = dynamic(async () => await (import('./block/b-setting')));

export function NormalLayout(props: NormalLayoutProps) {
  const { isLoggedIn } = useSession();
  const [showSetting, setShowSetting] = useState(false);

  useEffect(() => {
    window.addEventListener('click', handleCloseSetting, true);
    return () => {
      window.removeEventListener('click', handleCloseSetting, true);
    }
  }, [])

  const handleCloseSetting = (event) => {
    const DESidebarRight = document.getElementById('DESidebarRight') as HTMLElement;
    if (DESidebarRight && !DESidebarRight.contains(event.target as Node)) {
      setShowSetting(false);
    }
  }

  return (
    <div className='app__main -normal-layout'>
      <Sidebar />
      <Nav settingToggle={() => setShowSetting(!showSetting)} />
      {isLoggedIn ? <SettingSidebar showSetting={showSetting} /> : <></>}
      <main>{props.children}</main>
      <ModalPortal />
    </div>
  )
}
