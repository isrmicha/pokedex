import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { theme } from '~/signals';
// Create a theme instance.
const getAppTheme = () => createTheme({
    palette: {
        ...(theme.value === 'dark' ? {
            mode: 'dark',
        } : {
            primary: {
                main: '#556cd6',
            },
            secondary: {
                main: '#19857b',
            },
            error: {
                main: red.A400,
            },
        })
    },
});
export default getAppTheme;