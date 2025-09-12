'use client';

import { useEffect, useState } from 'react';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Find the current parent section (H2) based on active heading
  const getCurrentParentId = () => {
    const activeIndex = headings.findIndex(h => h.id === activeId);
    if (activeIndex === -1) return null;

    const activeHeading = headings[activeIndex];
    
    // If current is H2, return its id
    if (activeHeading.level === 2) return activeHeading.id;
    
    // If current is H3 or H4, find the parent H2
    for (let i = activeIndex - 1; i >= 0; i--) {
      if (headings[i].level === 2) {
        return headings[i].id;
      }
    }
    
    return null;
  };

  const currentParentId = getCurrentParentId();

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  // Helper function to check if a subsection should be visible
  const shouldShowSubsection = (heading: Heading, index: number) => {
    if (heading.level === 2) return true; // Always show H2s
    
    // For H3 and H4, find their parent H2
    for (let i = index - 1; i >= 0; i--) {
      if (headings[i].level === 2) {
        return headings[i].id === currentParentId;
      }
    }
    
    return false;
  };

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-8">
        <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
        <nav className="space-y-1">
          {headings.map((heading, index) => {
            const isVisible = shouldShowSubsection(heading, index);
            
            if (!isVisible) return null;
            
            return (
              <button
                key={index}
                onClick={() => handleClick(heading.id)}
                className={`block text-sm text-left w-full transition-all duration-300 ease-in-out ${
                  activeId === heading.id
                    ? 'text-sky-400 font-medium transform translate-x-2'
                    : 'text-slate-400 hover:text-sky-400'
                } ${
                  heading.level === 2 ? 'pl-0' : 
                  heading.level === 3 ? 'pl-4' : 'pl-6'
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(-10px)'
                }}
              >
                <span className={`inline-block w-2 h-2 rounded-full mr-2 transition-all duration-200 ${
                  activeId === heading.id 
                    ? 'bg-sky-400' 
                    : 'bg-slate-600'
                }`} />
                {heading.text}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}