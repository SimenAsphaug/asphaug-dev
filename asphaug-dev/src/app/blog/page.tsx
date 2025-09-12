import { getLatestPosts, BlogPostMeta } from "../lib/getPosts";
import PostsList from "./PostsList"; // Client component

export default async function BlogPage() {
  // Retrieve all non-draft posts (using a high limit to ensure all posts are fetched)
  const posts: BlogPostMeta[] = getLatestPosts(1000);

  return (
    <main className="bg-[#0e1117] text-[#d1d5db] px-6 py-30 font-sans">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Blog</h1>
        <p className="text-slate-400 mb-12">
          Thoughts, experiments, and things I&apos;ve learned, written for the
          curious, the builders, and ehhh... future me.
        </p>

        {/* Render the posts list via the client component */}
        <PostsList posts={posts} />
      </section>
    </main>
  );
}
