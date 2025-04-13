import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'

// Adjust path to where your markdown files actually are
const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts')

// Used by Next.js to statically generate pages for each blog post
export function generateStaticParams() {
  const files = fs.readdirSync(postsDirectory)
  // Generate pages for every post – including drafts.
  const paths: Array<{ slug: string }> = files.map(file => ({
    slug: file.replace('.md', '')
  }))
  return paths
}

export const dynamicParams = false;

// Note the type below: params is a Promise that resolves to an object with a slug.
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Now we await before using its properties.
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) return notFound();

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    // Removed min-h-screen so that overall layout (in RootLayout) controls the page height.
    <main className="bg-[#0e1117] text-[#d1d5db] w-full px-6 py-30 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">{data.title}</h1>
        <p className="text-slate-400 mb-2">{data.date}</p>
        
        {/* Optionally display a draft notice */}
        {(data.draft ||
          (data.tags && data.tags.some((tag: string) => tag.toLowerCase() === 'draft'))) && (
          <div className="p-2 mb-4 text-sm text-yellow-800 bg-yellow-100 rounded">
            This is a draft post.
          </div>
        )}
        
        <article
          className="prose prose-invert max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </main>
  )
}
