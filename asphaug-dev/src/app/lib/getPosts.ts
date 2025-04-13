// lib/getPosts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  summary: string
  tags?: string[]
}

export function getLatestPosts(limit = 5): BlogPostMeta[] {
  const postsDir = path.join(process.cwd(), 'src/app/blog/posts')
  const files = fs.readdirSync(postsDir)

  const posts = files
    .map((file) => {
      const slug = file.replace('.md', '')
      const fileContent = fs.readFileSync(path.join(postsDir, file), 'utf-8')
      const { data } = matter(fileContent)

      // Determine if this post is a draft.
      const isDraft = data.draft || (data.tags && data.tags.some((tag: string) => tag.toLowerCase() === 'draft'))


      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        summary: data.summary || '',
        tags: data.tags || [],
        isDraft,
      }
    })
    // Filter out posts that are drafts.
    .filter((post) => !post.isDraft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Remove the temporary isDraft property before returning.
  return posts.slice(0, limit).map(({ isDraft, ...rest }) => rest) as BlogPostMeta[]
}
