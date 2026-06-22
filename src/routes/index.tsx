import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Linkedin, Github, Instagram, Facebook } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anthony James Hiscock — Resume" },
      {
        name: "description",
        content:
          "Resume of Anthony James Hiscock — DevOps engineer and software developer based in Pretoria, Gauteng.",
      },
      { property: "og:title", content: "Anthony James Hiscock — Resume" },
      {
        property: "og:description",
        content:
          "Resume of Anthony James Hiscock — DevOps engineer and software developer based in Pretoria, Gauteng.",
      },
    ],
  }),
  component: ResumePage,
});

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "interests", label: "Interests" },
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
        <div className="w-full h-full grid place-items-center bg-muted text-muted-foreground text-3xl font-semibold">
          AH
        </div>
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

function ResumeItem({
  title,
  org,
  description,
  contact,
  date,
}: {
  title: string;
  org: string;
  description: React.ReactNode;
  contact?: string;
  date: string;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <div className="text-foreground/80 italic mb-3">{org}</div>
        <div className="text-foreground/80 leading-relaxed">{description}</div>
        {contact && (
          <div className="text-sm text-muted-foreground mt-3">{contact}</div>
        )}
      </div>
      <div className="md:text-right shrink-0 md:w-56">
        <span className="text-accent-foreground font-semibold">{date}</span>
      </div>
    </div>
  );
}

function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="md:ml-[17rem]">
        <Section id="about" first>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-2">
            Anthony James <span className="text-accent-foreground">Hiscock</span>
          </h1>
          <div className="text-lg text-muted-foreground mb-8 uppercase tracking-wider">
            Pretoria, Gauteng · (081) 330-1837 ·{" "}
            <a
              href="mailto:anthonyjhiscock@gmail.com"
              className="text-accent-foreground hover:underline"
            >
              anthonyjhiscock@gmail.com
            </a>
          </div>
          <p className="text-xl leading-relaxed mb-10 max-w-3xl">
            A critical thinker with a positive attitude, pursuing the dynamic
            balance between engineering and art.
          </p>
          <div className="flex gap-3">
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

        <Section id="experience">
          <h2 className="text-4xl font-bold mb-10">Experience</h2>
          <ResumeItem
            title="DevOps Engineer"
            org="Nedbank"
            description={
              <>
                Cloud DevOps Engineer setting up and maintaining CI/CD
                environments for various project teams using various software
                stacks. Specialised in infrastructure setup and maintenance
                including Azure Cloud, Kubernetes, Terraform, Rancher, Grafana.
              </>
            }
            contact="+27 84 441 8443 — Aditya Pradhan"
            date="February 2019 - January 2020"
          />
          <ResumeItem
            title="Software Engineering Intern"
            org="iOCO Open Digital Integrator"
            description={
              <>
                Formal experience and training in fulfilment of my Bachelor's
                degree. Agile Software Development using mostly Java and Web
                technologies.
              </>
            }
            contact="+27 82 783 3204 — Gregory Fullard"
            date="February 2019 - January 2020"
          />
          <ResumeItem
            title="Commercial Model"
            org="Select Models"
            description="Commercial modelling."
            contact="+27 11 442 1864 — Riaan Pretorius"
            date="January 2018 - Present"
          />
          <ResumeItem
            title="Brand Representative"
            org="Firewalk Marketing"
            description="Promotional marketing for national and international brands."
            contact="+27 71 680 0329 — Jessica Spyder"
            date="January 2017 - December 2018"
          />
        </Section>

        <Section id="education">
          <h2 className="text-4xl font-bold mb-10">Education</h2>
          <ResumeItem
            title="Belgium Campus IT-University"
            org="Bachelor of Computing"
            description={
              <>
                Specialised in Software Engineering and learned the fundamentals
                of being a full stack developer and Agile Software Project
                Manager. 3-year member of the Student Representative Council.
              </>
            }
            date="January 2016 - December 2019"
          />
          <ResumeItem
            title="Hoërskool Montana"
            org="National Senior Certificate"
            description="Survived High School"
            date="January 2011 - December 2015"
          />
        </Section>

        <Section id="skills">
          <h2 className="text-4xl font-bold mb-10">Skills</h2>
          <div className="mb-8 uppercase tracking-wider font-semibold">
            Programming Languages &amp; Tools
          </div>
          <ul className="flex flex-wrap gap-3 mb-10">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "XML",
              "PHP",
              "SQL",
              "JAVA",
              "C#",
              "UML",
              "Spring Boot",
              "Hardware Control",
              "Database Development",
            ].map((s) => (
              <li
                key={s}
                className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground font-medium"
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="mb-4 uppercase tracking-wider font-semibold">
            Workflow
          </div>
          <ul className="space-y-2 list-disc pl-5 text-foreground/90">
            <li>Agile Development &amp; Scrum</li>
            <li>Mobile-First, Responsive Design</li>
            <li>Cross Functional Teams</li>
          </ul>
        </Section>

        <Section id="interests">
          <h2 className="text-4xl font-bold mb-10">Interests</h2>
          <p className="text-lg leading-relaxed mb-4 max-w-3xl">
            Apart from being a full stack developer, I enjoy most of my time
            being outdoors. I am a frequent park runner, power lifter, yoga
            enthusiast, cycler and charity volunteer.
          </p>
          <p className="text-lg leading-relaxed max-w-3xl">
            Photography is something I enjoy while travelling and I am always
            keen on connecting with strangers along the way.
          </p>
        </Section>
      </main>
    </div>
  );
}
