import * as React from 'react';
import Footer from './Footer';
import Header from './Header';
import MainContentRouting from './MainContentRouting';
import { SharedDialog } from './SharedDialog';

export const Dashboard = (props: any) => {
  return (
    <>
      <div className="dashboard">
        <Header />

        <MainContentRouting />

        <Footer />

        <SharedDialog />
      </div>
    </>
  );
};
