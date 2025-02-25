"use client";

// Imports
import React from "react";
import { AppState } from "@/store/store";
import { useSelector } from "@/store/hooks";
import ChatsApp from "@/app/components/apps/chats";
import AppCard from "@/app/components/shared/AppCard";
import PageContainer from "@/app/components/container/PageContainer";
import ConnectAccount from "@/app/components/apps/chats/connect-account/ConnectAccount";

const Chats = () => {
  const chatState = useSelector((state: AppState) => state.reducerChat);

    if (!chatState.isAccConnected) {
      return <ConnectAccount/>
    }

  
  return (
    <PageContainer title="Chat" description="this is Chat">
      <AppCard  maxHeight= "88vh">
        <ChatsApp />
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
