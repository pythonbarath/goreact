const projects = [
  {
    name: "Pulse Commerce",
    summary:
      "A clean analytics dashboard for real-time product and revenue tracking.",
    stack: "React, Go, PostgreSQL",
  },
  {
    name: "Studio Grid",
    summary:
      "Booking platform for creative professionals with instant schedule sync.",
    stack: "TypeScript, Go, Redis",
  },
  {
    name: "Field Ops",
    summary:
      "Mobile-first tool for managing inspections, reports, and on-site tasks.",
    stack: "React, Go, SQLite",
  },
];

const skills = [
  "Go",
  "React",
  "REST APIs",
  "SQL",
  "UI Systems",
  "Performance Tuning",
];

function App() {
  return (
    <div className="shell">
      <header className="topbar">
        <p className="brand">Barath Kumar</p>
        <nav>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="page">
        <section className="hero">
          <p className="kicker">FULL-STACK PORTFOLIO</p>
          <h1>Building sharp web products with Go and React.</h1>
          <p className="subtitle">
            I design and build fast, practical applications with scalable
            backends and polished user interfaces.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#projects">
              View Projects
            </a>
            <a className="btn ghost" href="#contact">
              Hire Me
            </a>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-head">
            <p>Selected Work</p>
            <h2>Projects</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <span>{project.stack}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-head">
            <p>Core Capabilities</p>
            <h2>Skills</h2>
          </div>
          <div className="skills-wrap">
            {skills.map((skill) => (
              <span key={skill} className="pill">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>Let&apos;s build something useful.</h2>
          <p>
            Available for freelance and full-time product engineering roles.
          </p>
          <a
            className="btn primary"
            href="mailto:Barathkumar@gmail.comexample.com"
          >
            Barathkumar@gmail.comexample.com
          </a>
        </section>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
