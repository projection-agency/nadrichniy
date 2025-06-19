type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BlogPostPage({ params }: Props) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
    </div>
  );
} 