import React from 'react';

export const DeAppContext = React.createContext<{ locale: string }>({ locale: 'en' });
