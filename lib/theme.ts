import config from '@/tailwind.config';
import { createTheme } from '@mui/material/styles';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(config);

const theme = createTheme({
    palette: {
        primary: {
            main: fullConfig.theme.colors.background,
        },
        secondary: {
            main: fullConfig.theme.colors.secondary,
        },
        info: {
            main: fullConfig.theme.colors.accent1,
        },
        warning: {
            main: fullConfig.theme.colors.accent2,
        }
    },
});

export default theme;
