'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [pathname, setPathname] = useState('');
  const currentPathname = usePathname();

  useEffect(() => {
    setPathname(currentPathname);
  }, [currentPathname]);

  // Helper classes for active/inactive links.
  const activeClasses = "font-semibold text-sky-400";
  const inactiveClasses = "font-medium text-slate-300 hover:text-sky-400";

  return (
    <header className="absolute top-0 left-0 z-20 flex w-full justify-center mt-4 mb-[60px] bg-transparent">
      <div className="inline-flex items-center bg-transparent px-4 py-2 rounded-full border border-[#1f2937] space-x-4">
        <Link
          href="/"
          className={`relative text-sm px-2 py-1 transition-all duration-300 group ${
            pathname === "/" ? activeClasses : inactiveClasses
          }`}
        >
          Home
          <span
            className={`absolute left-0 bottom-0 h-0.5 transition-all duration-300 bg-sky-400 ${
              pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
        <Link
          href="/blog"
          className={`relative text-sm px-2 py-1 transition-all duration-300 group ${
            pathname === "/blog" ? activeClasses : inactiveClasses
          }`}
        >
          Blog
          <span
            className={`absolute left-0 bottom-0 h-0.5 transition-all duration-300 bg-sky-400 ${
              pathname === "/blog" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
        <Link
          href="/projects"
          className={`relative text-sm px-2 py-1 transition-all duration-300 group ${
            pathname === "/projects" ? activeClasses : inactiveClasses
          }`}
        >
          Projects
          <span
            className={`absolute left-0 bottom-0 h-0.5 transition-all duration-300 bg-sky-400 ${
              pathname === "/projects" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
        <Link
          href="/about"
          className={`relative text-sm px-2 py-1 transition-all duration-300 group ${
            pathname === "/about" ? activeClasses : inactiveClasses
          }`}
        >
          About
          <span
            className={`absolute left-0 bottom-0 h-0.5 transition-all duration-300 bg-sky-400 ${
              pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      </div>
    </header>
  );
}
