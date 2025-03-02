import PageContainer from "@/app/components/container/PageContainer";
import AppCard from "@/app/components/shared/AppCard";
import NotesApp from "@/app/components/apps/notes";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Notes",
  },
];

export default function Notes() {
  return (
    <PageContainer title="Note App" description="this is Note App">
      <AppCard>
        <NotesApp />
      </AppCard>
    </PageContainer>
  );
}
