import PageContainer from '@/app/components/container/PageContainer';
import BlogListing from '@/app/components/apps/blog/BlogListing';

const Blog = () => {
  return (
    <PageContainer title="Blog" description="this is Blog">
      <BlogListing />
    </PageContainer>
  );
};

export default Blog;
