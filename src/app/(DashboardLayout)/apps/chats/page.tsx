"use client";

// Imports
import { AppState } from "@/store/store";
import React, { useEffect, useState } from "react";
import ChatsApp from "@/app/components/apps/chats";
import AppCard from "@/app/components/shared/AppCard";
import { useDispatch, useSelector } from "@/store/hooks";
import { isWAConnected } from "@/services/chat/connectWa";
import { setAccConnected } from "@/store/apps/chat/ChatReducer";
import PageContainer from "@/app/components/container/PageContainer";
import ConnectAccount from "@/app/components/apps/chats/connect-account/ConnectAccount";

const Chats = () => {
  const dispatch = useDispatch();
  const chatState = useSelector((state: AppState) => state.reducerChat);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    checkWAConnection();
  }, []);

  async function checkWAConnection() {
    const isConnected = await isWAConnected()
    if (isConnected) {
      dispatch(setAccConnected(true))
    }
    setLoading(false);
  }

  // Connect account
  if (!chatState.isAccConnected && !isLoading) {
    return <ConnectAccount />;
  } else if (isLoading) return <></>

  return (
    <PageContainer title="Chat" description="this is Chat">
      <AppCard maxHeight="88vh">
        <ChatsApp />
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
