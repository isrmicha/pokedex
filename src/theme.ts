'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme =  createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
  },
});
export const darkTheme =  createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
    palette: {
        mode: 'dark',
    }
});


