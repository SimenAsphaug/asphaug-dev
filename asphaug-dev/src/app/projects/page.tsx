import projects from './projects.json'
import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <main className="bg-[#0e1117] text-[#d1d5db] px-6 py-30 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10">Projects</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#161b22] p-6 rounded-xl shadow-sm border border-[#1f2937] transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-[#1a1f27]"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-slate-400 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#1e293b] text-sky-400 px-2 py-1 rounded-md font-medium transition-colors duration-300 hover:bg-sky-500 hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sky-400 hover:underline transition-colors duration-300 hover:text-sky-500"
              >
                View project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
