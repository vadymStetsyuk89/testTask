import * as React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Footer from './Footer';
import Header from './Header';
import MainContent from './MainContent';
import { SharedDialog } from './SharedDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const Dashboard = (props: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <div>
        <Header />

        <MainContent />

        <Footer />

        <SharedDialog />
      </div>
    </>
  );
};
