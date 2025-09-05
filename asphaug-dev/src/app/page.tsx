import { getLatestPosts } from "./lib/getPosts";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import ExperienceSection from "./experience/ExperienceSection";
import jobs from "./experience/jobs.json";
import socialLinks from "./jsons/links.json";
import certificates from "./jsons/certificates.json";

// Create a mapping from the string value (stored in JSON) to the actual icon component.
const iconMap: { [key: string]: React.ReactElement } = {
  FaGithub: <FaGithub />,
  FaLinkedin: <FaLinkedin />,
  FaInstagram: <FaInstagram />,
};

export default async function HomePage() {
  const posts = getLatestPosts(5);

  return (
    <main className="bg-[#0e1117] text-[#d1d5db] px-6 py-20 font-sans">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-center">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-4xl font-extrabold text-white transition-transform duration-300 ease-out">
            Simen Asphaug
          </h1>
          <h2 className="text-xl font-medium text-slate-400">
            Senior Partner Chief Cat Owner
          </h2>
          <p className="text-slate-400 max-w-lg">
            From military-grade systems to cloud-native apps — I build
            infrastructure that performs under pressure, scales with ease, and
            stays secure.
          </p>
          {/* Social Links */}
          <div className="flex space-x-4 text-xl text-slate-400">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                aria-label={link.ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-sky-400"
              >
                {iconMap[link.icon] || null}
              </a>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="flex flex-col items-center md:items-end pr-4 md:pr-12 space-y-4">
          <Image
            src="/me.jpg"
            alt="Simen Asphaug"
            width={250}
            height={250}
            className="rounded-full transition-transform duration-300 ease-out transform hover:scale-105"
            unoptimized
          />
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {certificates.map((badge, idx) => (
              <a
                key={idx}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={badge.alt}
                className="transition-opacity duration-300 hover:opacity-80"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={60}
                  height={60}
                  className="rounded-md"
                  unoptimized
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Experience Split Section */}
      <section className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-10">
        {/* Blog Posts */}
        <div className="md:col-span-2 space-y-8">
          <h3 className="uppercase text-sm tracking-widest text-slate-500 font-medium">
            Latest Posts
          </h3>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={index}
                className="border-l-4 border-sky-500 pl-4 transition-transform duration-300 ease-out transform hover:translate-x-2"
              >
                <p className="text-sm text-sky-400">
                  {new Date(post.date).toLocaleDateString("no-NO", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-lg font-semibold text-white hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-slate-400">{post.summary}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-400">No posts yet</p>
          )}
        </div>

        {/* Experience Section */}
        <ExperienceSection jobs={jobs} />
      </section>
    </main>
  );
}
