// Imports
import React from "react";
import ChatsApp from "@/app/components/apps/chats";
import AppCard from "@/app/components/shared/AppCard";
import PageContainer from "@/app/components/container/PageContainer";

const Chats = () => {
  return (
    <PageContainer title="Chat" description="this is Chat">
      <AppCard>
        <ChatsApp />
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
