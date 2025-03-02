import PageContainer from "@/app/components/container/PageContainer";
import AppCard from "@/app/components/shared/AppCard";
import EmailsApp from "@/app/components/apps/email";

const Email = () => {
  return (
    <PageContainer title="Email" description="this is Email">

      <AppCard>
        <EmailsApp />
      </AppCard>
    </PageContainer>
  );
};

export default Email;
