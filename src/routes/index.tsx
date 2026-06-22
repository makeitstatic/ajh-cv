import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Linkedin, Github, Instagram, Facebook } from "lucide-react";
import profilePhoto from "@/assets/AJH-photo-1-cropped.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anthony James Hiscock — DevOps Engineer" },
      {
        name: "description",
        content:
          "CV of Anthony James Hiscock — DevOps Engineer based in Utrecht. Cloud, CI/CD, Agile coaching and systems integration across banking, government and enterprise.",
      },
      { property: "og:title", content: "Anthony James Hiscock — DevOps Engineer" },
      {
        property: "og:description",
        content:
          "CV of Anthony James Hiscock — DevOps Engineer based in Utrecht. Cloud, CI/CD, Agile coaching and systems integration across banking, government and enterprise.",
      },
    ],
  }),
  component: ResumePage,
});

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "assignments", label: "Assignments" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
] as const;

const SOCIALS = [
  { href: "https://www.linkedin.com/in/aj-hiscock/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/makeitstatic", label: "GitHub", Icon: Github },
  { href: "https://www.instagram.com/mister.hiscock/", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/Mr.Hiscock", label: "Facebook", Icon: Facebook },
];

function useActiveSection() {
  const [active, setActive] = useState<string>("about");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function Sidebar() {
  const active = useActiveSection();
  return (
    <aside className="md:fixed md:inset-y-0 md:left-0 md:w-[17rem] bg-sidebar text-sidebar-foreground flex md:flex-col items-center md:items-stretch md:py-12 py-4 px-4 md:px-0 z-20 shadow-lg">
      <a
        href="#about"
        className="block md:mx-auto shrink-0 md:mb-6 mr-4 md:mr-0 rounded-full border-[0.4rem] border-sidebar-border overflow-hidden bg-sidebar-border"
        style={{ width: "10rem", height: "10rem" }}
      >
        <img
          src={profilePhoto.url}
          alt="Anthony James Hiscock"
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </a>
      <nav className="flex-1 md:flex-none flex md:flex-col items-center gap-1 md:gap-0 overflow-x-auto">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`uppercase tracking-wider text-sm font-semibold px-4 md:py-3 py-2 transition-colors hover:text-accent-foreground ${
              active === s.id ? "text-accent-foreground" : "text-sidebar-foreground/70"
            }`}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function Section({
  id,
  children,
  first,
}: {
  id: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <>
      {!first && <hr className="m-0 border-border" />}
      <section
        id={id}
        className="px-6 lg:px-20 py-12 lg:py-24 min-h-screen flex items-center"
      >
        <div className="w-full max-w-5xl">{children}</div>
      </section>
    </>
  );
}

type Job = { start: string; end: string; workplace: string; role: string };
const JOBS: Job[] = [
  { start: "September 2024", end: "September 2026", workplace: "Rabobank, Utrecht, NL", role: "DevOps Engineer" },
  { start: "September 2023", end: "August 2024", workplace: "Smith Solutions, Amsterdam, NL", role: "DevOps Engineer" },
  { start: "February 2022", end: "August 2023", workplace: "CIM Solutions, Vianen, NL", role: "DevOps Engineer" },
  { start: "September 2020", end: "January 2022", workplace: "Nedbank, Sandton, RSA", role: "DevOps Engineer" },
  { start: "January 2020", end: "September 2020", workplace: "Freelance, Pretoria, RSA", role: "Software Engineer" },
  { start: "January 2019", end: "December 2019", workplace: "EOH Digital, Midrand, RSA", role: "Software Engineer" },
];

type Assignment = {
  project: string;
  industry: string;
  client: string;
  role: string;
  start: string;
  end: string;
  description: React.ReactNode;
  responsibilities: string[];
  outcome?: React.ReactNode;
  stack: string;
};

const ASSIGNMENTS: Assignment[] = [
  {
    project: "DevOps Transformation",
    industry: "Banking",
    client: "Rabobank",
    role: "DevOps Engineer / Coach",
    start: "September 2024",
    end: "September 2026",
    description: (
      <>
        <p>
          Rabobank embarked on a large-scale digital transformation, modernising legacy ways of
          working into a Scaled Agile DevOps environment while navigating the strict compliance
          and security requirements of a regulated financial institution.
        </p>
        <p>
          As part of this programme, squads were migrated from tools such as Jira to Azure
          DevOps, and technical teams transitioned from Jenkins and hybrid-cloud setups to fully
          cloud-native solutions on Azure and AWS.
        </p>
        <p>
          Engaged as part of the IT4IT squad, Anthony was brought in to enable and accelerate
          this transition — designing tooling solutions and providing hands-on coaching and
          technical support to development teams.
        </p>
      </>
    ),
    responsibilities: [
      "Azure cloud engineering.",
      "Requirement analysis of project team demands.",
      "Agile / Scrum.",
      "International banking regulations and standards.",
    ],
    outcome:
      "Together, the team successfully embedded the DevOps way of working across the tribe, supporting over 56 teams and delivering cross-tribe assistance at both technical and management levels.",
    stack:
      "Agile/Scrum, Git, Bash, SonarQube, Nexus Repository Manager, Linux, project management, reporting, systems integration, Docker, VS Code, C#, .NET Framework, Angular, Python, Postman, Oracle VirtualBox, MS Teams, macOS, Azure DevOps, Azure Cloud.",
  },
  {
    project: "DevOps Infrastructure",
    industry: "Government",
    client: "Rijksvastgoedbedrijf",
    role: "DevOps Engineer",
    start: "March 2022",
    end: "September 2023",
    description: (
      <>
        <p>
          The Rijksvastgoedbedrijf (RVB) is a large government organisation with multiple
          development teams. A new DevOps team was set up to support the development teams with
          deployments, infrastructure and monitoring.
        </p>
        <p>
          Anthony was responsible for configuring and maintaining various DevOps tools, including
          setting up servers for Jenkins, Nexus, GitLab and SonarQube, as well as deployment
          environments for the various teams' applications. Management of these services was
          handled through an on-premise private cloud solution powered by Ansible.
        </p>
      </>
    ),
    responsibilities: [
      "Private cloud engineering.",
      "Requirement analysis of project team demands.",
      "Creating and maintaining Jenkins pipelines.",
      "Containerisation.",
      "Agile / Scrum.",
      "Testing.",
    ],
    outcome:
      "The result was the successful implementation of CI/CD for teams within the RVB, from source code management through to production deployments.",
    stack:
      "Agile/Scrum, Podman, Git, Jira, Jenkins, Ansible, Bash, SonarQube, Nexus Repository (dependency manager), Linux, project management, reporting, systems integration, Docker, VS Code, C#, .NET Framework, Angular, Python, Postman, Oracle VirtualBox, MobaXterm, Webex, MS Teams.",
  },
  {
    project: "BizDevOps",
    industry: "Banking",
    client: "Nedbank, Sandton",
    role: "DevOps Coach",
    start: "April 2021",
    end: "January 2022",
    description: (
      <>
        <p>
          Nedbank is a large organisation with many new and ongoing projects. A DevOps team was
          created to support company infrastructure and projects, and existing teams needed to be
          upskilled to use the improved infrastructure. The DevOps team took the lead on these
          changes, and Anthony was appointed as DevOps Coach and Support.
        </p>
        <p>
          This position formed part of a team effort to support business activities relating to
          internal systems maintenance and to guide project teams in the use of the Azure DevOps
          stack.
        </p>
      </>
    ),
    responsibilities: [
      "Hybrid cloud engineering.",
      "Support on the internal business DevOps service desk.",
      "Requirement analysis of project team demands.",
      "Project solution design.",
      "CI/CD coaching.",
      "Handling and delivering user stories.",
      "Reporting.",
      "Supporting the Agile Scrum process within teams.",
    ],
    outcome:
      "The result was the successful migration of teams from on-premise resources (builds, deployments, SCM) to cloud-based toolchains (Git, Azure Pipelines), along with the continuous maintenance and improvement of internal VPNs and tooling. All activities were reported on regularly to senior management.",
    stack:
      "Git SCM, Azure Pipelines (CI/CD), SonarCloud, Nexus Repository (dependency manager), Agile, Scrum, Azure DevOps, project management, reporting, process integration, Docker, Kubernetes, Jira, Rancher, Visual Studio, VS Code, Bash, C#, .NET Core, Java, Angular, Terraform, Maven.",
  },
  {
    project: "TinyERP",
    industry: "Corporate ERP / CRM",
    client: "Sucaba Global",
    role: "Software Engineer",
    start: "February 2020",
    end: "February 2021",
    description: (
      <p>
        Sucaba Global started out as a payroll management service platform and was expanding to
        include full CRM and ERP support for other business activities. This had to be
        accomplished while continuing to service existing customers on the current payroll
        system, in parallel with developing the new ERP/CRM platform. Anthony was appointed as
        Full-Stack Python Web Engineer.
      </p>
    ),
    responsibilities: [
      "Requirements analysis with the Product Owner.",
      "Defining user stories.",
      "Delivery of monthly progress reports.",
      "UI design.",
      "Back-end programming.",
      "Proactive monitoring and testing of system performance.",
      "Mobile web app development.",
      "E-commerce website development.",
    ],
    outcome:
      "The result was a deployable and scalable solution for small to medium-sized businesses. Successful implementation allowed clients to reduce costs by replacing several stand-alone payroll, HR and other ERP/CRM software solutions with a single integrated service.",
    stack: "Python, Flask, Bootstrap, WordPress, cPanel, HTML, CSS, JavaScript, NativeScript.",
  },
  {
    project: "Reserve Bank Forms Processing",
    industry: "Banking — Web App",
    client: "South African Reserve Bank",
    role: "Software Engineer",
    start: "February 2019",
    end: "January 2020",
    description: (
      <p>
        The South African Reserve Bank processes a large volume of tax forms each season using
        outdated methods. A web-based solution for rendering and processing forms was required to
        enable higher and more accurate throughput of annual tax form submissions. The project
        started in 2018, and Anthony joined in 2019 as one of the Java software engineers on the
        team. The teams were cross-functional and highly Agile.
      </p>
    ),
    responsibilities: [
      "UI/UX development.",
      "Experimental implementation of new features.",
      "Bug fixes on existing features.",
      "Systems integration.",
      "Proactively monitoring overall progress.",
      "Managing and resolving risk associated with new features.",
      "Drafting UI/UX documentation.",
      "System optimisation.",
      "Drafting use cases.",
    ],
    outcome:
      "The result was a rapid expansion of overall system capabilities, efficiency improvements in the back-end system and surrounding business processes, and UI/UX enhancements throughout.",
    stack:
      "Git SCM, Agile and Rapid Application Development, Java, Spring Boot, Adobe Experience Manager, Apache Sling, RabbitMQ, SendGrid, JUnit, Cucumber, Selenium, Scrum, JavaScript, Maven, IntelliJ.",
  },
];

const TECH_EXPERTISE: { label: string; items: string }[] = [
  { label: "Databases", items: "MySQL, PostgreSQL, Azure SQL, Azure Cosmos DB, MS SQL." },
  {
    label: "(Development) Tools",
    items:
      "Jenkins, UrbanCode Deploy, Git, Visual Studio, VS Code, Azure DevOps, SonarQube, Terraform, Rancher, MS Power Platform, Docker, Maven, Podman.",
  },
  { label: "Development Methods", items: "DevOps, Agile." },
  { label: "Project Management", items: "Jira, Azure DevOps, Kanban, Scrum." },
  { label: "Operating Systems", items: "Linux, Windows, Mac." },
  { label: "Protocols", items: "TCP/IP, UDP, SSL." },
  { label: "Programming Languages", items: "Java, Python, C#." },
  { label: "File Formats", items: "YAML, XML, JSON, JavaScript, HTML, CSS." },
];

const SPECIALISMS = [
  "Cloud DevOps Solutions Engineering",
  "Software Engineering",
  "DevOps Team Coaching",
  "Scaled Agile Framework (SAFe)",
  "Systems Integration",
  "Linux Systems Development",
  "Project Management",
];

const TRAINING = [
  { start: "July 2021", end: "October 2021", course: "MS Azure Kubernetes" },
  { start: "February 2020", end: "December 2020", course: "Azure DevOps and Agile Team Training" },
  { start: "January 2020", end: "June 2020", course: "Spring Boot General Project Use" },
  { start: "January 2019", end: "January 2020", course: "Agile Software Development" },
  {
    start: "November 2022",
    end: "December 2022",
    course: "Red Hat OpenShift: Containers with Podman (DO188R)",
  },
];

const CERTIFICATIONS = [
  { date: "2021", name: "Microsoft Certified: Azure Fundamentals (AZ-900)" },
  { date: "2022", name: "EXIN DevOps Foundation" },
  { date: "2023", name: "Linux Foundation Certified IT Associate (LFCA)" },
];

function PersonaliaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-2 border-b border-border/60">
      <div className="uppercase tracking-wider text-xs font-semibold text-muted-foreground sm:w-48 shrink-0">
        {label}
      </div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}

function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="md:ml-[17rem]">
        {/* ABOUT */}
        <Section id="about" first>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-2">
            Anthony James <span className="text-accent-foreground">Hiscock</span>
          </h1>
          <div className="text-lg text-muted-foreground mb-8 uppercase tracking-wider">
            Utrecht, NL · DevOps Engineer ·{" "}
            <a
              href="mailto:anthonyjhiscock@gmail.com"
              className="text-accent-foreground hover:underline"
            >
              anthonyjhiscock@gmail.com
            </a>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent-foreground font-bold mb-4">
                Personalia
              </h3>
              <div>
                <PersonaliaRow label="Name" value="Anthony James Hiscock" />
                <PersonaliaRow label="Place of Residence" value="Utrecht" />
                <PersonaliaRow label="Function" value="DevOps Engineer" />
                <PersonaliaRow label="Languages" value="Afrikaans, English, Dutch" />
                <PersonaliaRow label="Experience Since" value="2019" />
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent-foreground font-bold mb-4">
                Specialism
              </h3>
              <ul className="space-y-2">
                {SPECIALISMS.map((s) => (
                  <li key={s} className="flex gap-3 text-foreground/90">
                    <span className="text-accent-foreground">▸</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="text-xs uppercase tracking-[0.2em] text-accent-foreground font-bold mb-4">
            Summary
          </h3>
          <div className="space-y-4 text-foreground/90 leading-relaxed max-w-4xl">
            <p>
              Anthony is a DevOps professional with proven experience in numerous Agile and
              Microsoft DevOps teams.
            </p>
            <p>
              He has 7 years of experience in DevOps, software project management, CI/CD,
              testing, automation, integration and Agile coaching, including 2 years of
              full-stack Agile software project development using Jira, Azure DevOps, Git,
              Java, Python, MySQL and PostgreSQL.
            </p>
            <p>
              As a computer enthusiast, he keeps up with developments in the Linux, Windows and
              Mac worlds as a matter of both personal interest and professional pursuit.
            </p>
            <p>
              His experience in large and diverse teams, strong expertise in design and
              development, and passion for technology shine through when integrating new systems
              and processes into existing environments and teams. His communication and
              analytical skills have been honed through collaboration in large teams and complex
              project configurations.
            </p>
          </div>

          <div className="flex gap-3 mt-10">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground grid place-items-center hover:bg-accent-foreground hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience">
          <h2 className="text-4xl font-bold mb-10">Work Experience</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-accent-foreground/40">
                  <th className="py-3 pr-6 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Start
                  </th>
                  <th className="py-3 pr-6 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    End
                  </th>
                  <th className="py-3 pr-6 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Workplace
                  </th>
                  <th className="py-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {JOBS.map((j) => (
                  <tr key={j.workplace + j.start} className="border-b border-border/60">
                    <td className="py-4 pr-6 whitespace-nowrap text-foreground/80">{j.start}</td>
                    <td className="py-4 pr-6 whitespace-nowrap text-foreground/80">{j.end}</td>
                    <td className="py-4 pr-6 font-semibold">{j.workplace}</td>
                    <td className="py-4 text-accent-foreground">{j.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ASSIGNMENTS */}
        <Section id="assignments">
          <h2 className="text-4xl font-bold mb-10">Assignments</h2>
          <div className="space-y-16">
            {ASSIGNMENTS.map((a) => (
              <article key={a.project} className="border-l-4 border-accent-foreground/60 pl-6">
                <header className="mb-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{a.project}</h3>
                    <span className="text-sm text-accent-foreground font-semibold whitespace-nowrap">
                      {a.start} — {a.end}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2 text-sm text-foreground/80">
                    <div>
                      <span className="text-muted-foreground uppercase tracking-wider text-xs mr-2">
                        Client:
                      </span>
                      {a.client}
                    </div>
                    <div>
                      <span className="text-muted-foreground uppercase tracking-wider text-xs mr-2">
                        Industry:
                      </span>
                      {a.industry}
                    </div>
                    <div>
                      <span className="text-muted-foreground uppercase tracking-wider text-xs mr-2">
                        Role:
                      </span>
                      {a.role}
                    </div>
                  </div>
                </header>

                <div className="space-y-3 text-foreground/90 leading-relaxed mb-5">
                  {a.description}
                </div>

                <div className="mb-5">
                  <div className="text-xs uppercase tracking-wider font-semibold text-accent-foreground mb-2">
                    Responsibilities
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-foreground/90">
                    {a.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="text-accent-foreground">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {a.outcome && (
                  <p className="text-foreground/90 leading-relaxed mb-5 italic">{a.outcome}</p>
                )}

                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-accent-foreground mb-2">
                    Methods &amp; Techniques
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{a.stack}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills">
          <h2 className="text-4xl font-bold mb-10">Technical Expertise</h2>
          <div className="space-y-5">
            {TECH_EXPERTISE.map((row) => (
              <div
                key={row.label}
                className="grid sm:grid-cols-[14rem_1fr] gap-2 sm:gap-6 py-3 border-b border-border/60"
              >
                <div className="uppercase tracking-wider text-xs font-bold text-accent-foreground">
                  {row.label}
                </div>
                <div className="text-foreground/90">{row.items}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education">
          <h2 className="text-4xl font-bold mb-10">Education &amp; Certifications</h2>

          <h3 className="text-xs uppercase tracking-[0.2em] text-accent-foreground font-bold mb-4">
            Formal Education
          </h3>
          <div className="mb-12 space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between gap-2 pb-4 border-b border-border/60">
              <div>
                <div className="font-semibold text-lg">Belgium Campus, Pretoria</div>
                <div className="text-foreground/80">Bachelor of Computing — Software Engineering</div>
              </div>
              <div className="text-accent-foreground font-semibold whitespace-nowrap">
                2016 – 2019
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-2 pb-4 border-b border-border/60">
              <div>
                <div className="font-semibold text-lg">Hoërskool Montana, Pretoria</div>
                <div className="text-foreground/80">National Senior Certificate — Technical</div>
              </div>
              <div className="text-accent-foreground font-semibold whitespace-nowrap">
                2011 – 2015
              </div>
            </div>
          </div>

          <h3 className="text-xs uppercase tracking-[0.2em] text-accent-foreground font-bold mb-4">
            Professional Training
          </h3>
          <div className="mb-12 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-accent-foreground/40">
                  <th className="py-3 pr-6 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Start
                  </th>
                  <th className="py-3 pr-6 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Finish
                  </th>
                  <th className="py-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Course
                  </th>
                </tr>
              </thead>
              <tbody>
                {TRAINING.map((t) => (
                  <tr key={t.course} className="border-b border-border/60">
                    <td className="py-3 pr-6 whitespace-nowrap text-foreground/80">{t.start}</td>
                    <td className="py-3 pr-6 whitespace-nowrap text-foreground/80">{t.end}</td>
                    <td className="py-3">{t.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xs uppercase tracking-[0.2em] text-accent-foreground font-bold mb-4">
            Additional Certifications
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-accent-foreground/40">
                  <th className="py-3 pr-6 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Date
                  </th>
                  <th className="py-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Certification
                  </th>
                </tr>
              </thead>
              <tbody>
                {CERTIFICATIONS.map((c) => (
                  <tr key={c.name} className="border-b border-border/60">
                    <td className="py-3 pr-6 whitespace-nowrap text-accent-foreground font-semibold">
                      {c.date}
                    </td>
                    <td className="py-3">{c.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </main>
    </div>
  );
}
