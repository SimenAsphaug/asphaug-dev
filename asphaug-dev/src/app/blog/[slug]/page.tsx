import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import TableOfContents from './TableOfContents'

// Function to extract headings from markdown content
function extractHeadings(content: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    
    headings.push({
      level,
      text,
      id
    });
  }
  
  return headings;
}

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

  // Extract headings for table of contents
  const headings = extractHeadings(content);

  const processedContent = await remark().use(html).process(content);
  let contentHtml = processedContent.toString();
  
  // Add IDs to headings for table of contents navigation
  headings.forEach(heading => {
    const headingRegex = new RegExp(`<h${heading.level}>(${heading.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})</h${heading.level}>`, 'g');
    contentHtml = contentHtml.replace(headingRegex, `<h${heading.level} id="${heading.id}">$1</h${heading.level}>`);
  });

  return (
    <main className="bg-[#0e1117] text-[#d1d5db] w-full px-6 py-30 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-3">
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
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* Table of Contents Sidebar */}
        <TableOfContents headings={headings} />
      </div>
    </main>
  )
}
