'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { BlogPostMeta } from '../lib/getPosts'

type PostsListProps = {
    posts: BlogPostMeta[]
}

export default function PostsList({ posts }: PostsListProps) {
    const [showTags, setShowTags] = useState(false)

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h3 className="uppercase text-sm tracking-widest text-slate-500 font-medium">
                    Latest Posts
                </h3>
                <button
                    onClick={() => setShowTags((prev) => !prev)}
                    className="bg-[#1e293b] text-sky-400 text-xs px-2 py-1 rounded-md font-medium transition-colors duration-300 hover:bg-sky-500 hover:text-white"
                >
                    {showTags ? 'Hide Tags' : 'Show Tags'}
                </button>
            </div>

            <div className="space-y-12">
                {posts.map((post) => (
                    <article
                        key={post.slug}
                        className="group border-l-4 border-sky-500 pl-4 hover:border-[#ffa94d] transition"
                    >
                        <p className="text-sm text-sky-400">
                            {new Date(post.date).toLocaleDateString('no-NO', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}
                        </p>
                        <Link href={`/blog/${post.slug}`}>
                            <h2 className="text-xl font-semibold text-white group-hover:underline">
                                {post.title}
                            </h2>
                        </Link>
                        <p className="text-slate-400">{post.summary}</p>
                        {post.tags && post.tags.length > 0 && showTags && (
                            <div className="flex flex-wrap mt-2 gap-2">
                                {post.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-[#1e293b] text-sky-400 text-xs px-2 py-1 rounded-md font-medium transition-opacity duration-300 hover:opacity-80"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </>
    )
}
