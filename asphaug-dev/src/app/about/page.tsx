export default function AboutPage() {
  return (
    // Remove min-h-screen here to avoid forcing an extra 100vh height.
    <div className="bg-[#0e1117] text-[#d1d5db] font-sans">
      <main className="max-w-4xl mx-auto px-6 py-30 space-y-10">
        <section>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            About Me
          </h1>
          <p className="text-lg text-slate-400">
            I&apos;m a Senior Cloud Engineer based in Sørumsand, passionate
            about secure systems, cloud architecture, and building tech that
            just works.
          </p>
        </section>

        <section className="space-y-6">
          <p className="text-slate-400 leading-relaxed">
            With over 8 years of experience, I&apos;ve worked across public
            sector, defense, and tech startups - currently solving cloud and
            infrastructure challenges at Sopra Steria. My career began in the
            Norwegian Armed Forces, where I focused on operational IT and secure
            communications.
          </p>
          <p className="text-slate-400 leading-relaxed">
            I specialize in scalable system design, AWS, DevOps practices,
            backend and (some) frontend development. Whether it&apos;s
            greenfield projects or modernizing legacy platforms, I focus on
            building reliable, secure, and maintainable systems.
          </p>
          <p className="text-slate-400 leading-relaxed">
            My background also includes work with radio communication systems,
            secure networking, and mission-critical deployments, from on-prem in
            a desert to the cloud.
          </p>
          <p className="text-slate-400 leading-relaxed">
            When I&apos;m not working, I&apos;m busy tinkering on quirky side
            projects, leveling up in games, and tearing down the highway on my
            motorcycle. All powered by Red Bull, snus, and a dash of delightful
            chaos.
          </p>
        </section>
      </main>
    </div>
  );
}
