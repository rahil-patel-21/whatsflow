"use client";

// Imports
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import Header from "./layout/vertical/header/Header";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import HorizontalHeader from "./layout/horizontal/header/Header";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { APP_NAME } from "@/constants/strings";
import { handleAuth } from "../services/auth";
import Customizer from "./layout/shared/customizer/Customizer";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();

  // Redirect to /auth/login if the user visits the root path
  useEffect(() => {
    handleAuth();
  }, []);

  // Handle scrolling behavior based on the current URL
  useEffect(() => {
    const htmlElement = document.documentElement;

    // Function to update scrolling behavior
    const updateScrollBehavior = () => {
      const currentPath = window.location.pathname;
      if (currentPath === "/apps/chats") {
        htmlElement.classList.add("no-scroll");
      } else {
        htmlElement.classList.remove("no-scroll");
      }
    };

    // Check the initial URL
    updateScrollBehavior();

    // Listen for URL changes using the popstate event (back/forward navigation)
    window.addEventListener("popstate", updateScrollBehavior);

    // Use MutationObserver to detect route changes (e.g., when using client-side routing)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          updateScrollBehavior();
        }
      });
    });

    // Observe changes in the <body> element
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup function
    return () => {
      window.removeEventListener("popstate", updateScrollBehavior);
      observer.disconnect();
      htmlElement.classList.remove("no-scroll");
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <MainWrapper
      className={
        customizer.activeMode === "dark" ? "darkbg mainwrapper" : "mainwrapper"
      }
    >
      <title>{APP_NAME}</title>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {customizer.isHorizontal ? "" : <Sidebar />}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {!customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
        {/* PageContent */}
        <Container
          sx={{
            pt: "10px",
            maxWidth: customizer.isLayout !== "boxed" ? "lg" : "100%!important",
          }}
        >
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}

          <Box>
            {/* <Outlet /> */}
            {children}
            {/* <Index /> */}
          </Box>

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        <Customizer />
      </PageWrapper>
    </MainWrapper>
  );
}