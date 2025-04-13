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

  // Use reduce to build an array of published posts (skip drafts).
  const posts = files.reduce((acc, file) => {
    const slug = file.replace('.md', '')
    const filePath = path.join(postsDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)

    // Determine if this post is a draft (case-insensitive check).
    const isDraft =
      data.draft ||
      (data.tags && data.tags.some((tag: string) => tag.toLowerCase() === 'draft'))
    
    // Skip this post if it's marked as a draft.
    if (isDraft) return acc

    acc.push({
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      tags: data.tags || [],
    })
    return acc
  }, [] as BlogPostMeta[])

  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}
