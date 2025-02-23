"use client";

// Imports
import "@/utils/i18n";
import "@/app/api/index";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeSettings } from "@/utils/theme/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';


const MyApp = ({ children }: { children: React.ReactNode }) => {
    const theme = ThemeSettings();

    return (
        <>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </>
    );
};

export default MyApp;
