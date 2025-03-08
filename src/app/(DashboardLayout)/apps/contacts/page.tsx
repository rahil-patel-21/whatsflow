// Imports
import AppCard from "@/app/components/shared/AppCard";
import ContactApp from "@/app/components/apps/contacts/index";
import PageContainer from "@/app/components/container/PageContainer";

const Contacts = () => {
  return (
    <PageContainer title="Contact" description="this is Contact">
      <AppCard>
        <ContactApp />
      </AppCard>
    </PageContainer>
  );
};

export default Contacts;
