import type { NextPage } from 'next';
import { PageWrapper } from '@app/dekits/layout';
import Banner from './components/banner';
import CategoryTab from './components/category-tab';
import ListTournaments from './components/list-tournaments';
import PremiumTournaments from './components/premium-tournaments';

export const Index: NextPage = () => {
  const metadata = {
    title: 'Home page',
    description: 'Description - This is page blank',
    url: '/',
    canonical: '/',
    image: '/favicon.ico',
  };

  return (
    <PageWrapper metadata={metadata}>
      <Banner />
      <CategoryTab />
      <PremiumTournaments />
      <ListTournaments title='Upcoming Tournaments' id='Upcoming' />
      <ListTournaments title='Suggestion for you' id='Suggestion' />
      <ListTournaments title='Your favorites' id='Favorites' />
    </PageWrapper>
  );
};
