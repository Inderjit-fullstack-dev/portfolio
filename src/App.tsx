import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Cloud,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "./components/ui/button";
import { useTheme } from "./context/theme-context";
import heroVideo from "./assets/videos/me.mp4";

const container = "mx-auto w-full max-w-6xl px-6";

const SectionTitle = memo(function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center">
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
});

const skills = [
  {
    title: "Programming Languages",
    icon: Code2,
    items: ["JavaScript", "TypeScript", "C#", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Sparkles,
    items: ["React.js", "Angular", "React Native", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend & Cloud",
    icon: Cloud,
    items: [
      ".NET Core",
      "Microservices",
      "Kafka",
      "Azure (App Service, Functions, Containers)",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["SQL", "MongoDB", "Redis"],
  },
];

const experiences = [
  {
    role: "Jet2 Travel Technologies – Senior Software Engineer",
    period: "Dec 2024 – Present",
    bullets: [
      "Modernized legacy WCF services into JSON APIs",
      "Built reusable Angular components",
      "Implemented Kafka producer/consumer modules",
      "Enhanced dynamic hotel pricing system",
    ],
  },
  {
    role: "Baygrape Technology – Senior Software Engineer",
    period: "Sep 2021 – Dec 2024",
    bullets: [
      "Led development of DocsNow project",
      "Improved user engagement by 17%",
      "Fixed production issues and improved reliability",
    ],
  },
  {
    role: "Boffin Coders – Senior Software Engineer",
    period: "Nov 2020 – Sep 2021",
    bullets: [
      "Deployed apps on Azure",
      "Migrated big data jobs from Qubole to AWS EMR",
    ],
  },
  {
    role: "Nimbus Software – Software Developer",
    period: "May 2015 – Oct 2020",
    bullets: [
      "Built scalable REST APIs in .NET Core",
      "Developed real-time dashboards in Angular",
    ],
  },
];

const achievements = [
  "100K+ downloads for Kwikpic",
  "17% increase in user engagement",
  "Azure cloud deployments",
  "Kafka real-time systems",
];

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [isScrolled, setIsScrolled] = useState(false);

  const statusMessage = useMemo(() => {
    if (formError) return formError;
    if (formStatus === "success") return "Thanks! Your message has been sent.";
    if (formStatus === "error")
      return "Sorry, something went wrong. Please try again.";
    return "";
  }, [formError, formStatus]);

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (formError) {
      setFormError("");
      setFormStatus("idle");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    if (formState.name.length > 100) {
      setFormError("Name must be 100 characters or fewer.");
      setFormStatus("error");
      return;
    }
    if (formState.email.length > 50) {
      setFormError("Email must be 50 characters or fewer.");
      setFormStatus("error");
      return;
    }
    if (formState.message.length > 500) {
      setFormError("Message must be 500 characters or fewer.");
      setFormStatus("error");
      return;
    }

    try {
      setIsSending(true);
      setFormError("");
      setFormStatus("idle");
      await emailjs.send(
        "service_b15dn4e",
        "template_xu6jj0m",
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
        },
        {
          publicKey: "iUATXpW4GiFwV8QEz",
        },
      );
      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="text-slate-900 dark:text-white">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/20 bg-white/80 shadow-card backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/70"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className={`${container} flex items-center justify-between py-4`}>
          <a
            href="#top"
            className="flex items-center gap-3 text-base font-semibold tracking-tight"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-600 text-white shadow-glow">
              IS
            </span>
            Inderjit Singh
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <a href="#about" className="hover:text-ink-600">
              About
            </a>
            <a href="#skills" className="hover:text-ink-600">
              Skills
            </a>
            <a href="#experience" className="hover:text-ink-600">
              Experience
            </a>
            <a href="#projects" className="hover:text-ink-600">
              Projects
            </a>
            <a href="#contact" className="hover:text-ink-600">
              Contact
            </a>
          </nav>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <span className="inline-flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Dark Mode
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Light Mode
              </span>
            )}
          </Button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pb-16 pt-24 md:pt-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-8 h-72 w-72 animate-floaty rounded-full bg-ink-400/30 blur-3xl" />
            <div className="absolute right-0 top-20 h-72 w-72 animate-floaty rounded-full bg-sand-300/40 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-slateblue-300/40 blur-3xl" />
          </div>
          <div
            className={`${container} relative grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-ink-200/60 bg-white/80 px-4 py-1 text-sm font-medium text-ink-600 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-ink-200">
                <Sparkles className="h-4 w-4" />
                Open to impactful full-stack roles
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-ink-950 dark:text-white md:text-5xl lg:text-6xl">
                Hi, I’m Inderjit Singh
              </h1>
              <p className="text-lg text-slate-700 dark:text-slate-300 md:text-xl">
                Senior Software Engineer | Full Stack Developer
              </p>
              <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
                I build scalable, high-performance web applications using React,
                Angular, and .NET.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <a href="#projects">
                    View My Work
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="glass rounded-[2.5rem] p-3 shadow-card border-white/10 dark:border-white/10">
                  <video
                    src={heroVideo}
                    className="h-[320px] w-full rounded-[2rem] object-cover object-top md:h-[360px] lg:h-[400px]"
                    autoPlay
                    muted
                    playsInline
                  />
              </div>
              <div className="absolute -bottom-6 right-6 rounded-2xl bg-white/90 p-4 text-sm font-medium text-ink-900 shadow-card dark:bg-slate-900/90 dark:text-white">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-ink-600" />
                  10+ years building products
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section">
          <div
            className={`${container} grid gap-12 md:grid-cols-[0.9fr_1.1fr]`}
          >
            <div className="space-y-6">
              <SectionTitle
                title="About Me"
                subtitle="Senior software engineer with a product-first mindset and deep full-stack expertise."
              />
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
                I am a Senior Software Engineer with 10+ years of experience
                building scalable web applications, modern UI systems, and
                cloud-based solutions. I specialize in React, Angular, .NET, and
                cloud platforms like Azure.
              </p>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                {[
                  "10+ years experience",
                  "Full-stack expertise",
                  "Experience with cloud, microservices, Kafka",
                  "Strong problem-solving skills",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-ink-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass flex items-center justify-center rounded-[2rem] p-8 shadow-card">
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-ink-600/10 text-ink-700 dark:text-ink-200">
                  <Briefcase className="h-9 w-9" />
                </div>
                <p className="text-lg font-semibold text-ink-950 dark:text-white">
                  Professional Snapshot
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Full-stack delivery across product engineering, cloud
                  platforms, and mission-critical integrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className={container}>
            <SectionTitle
              title="Skills"
              subtitle="The stack I use to ship fast, scalable, and resilient software."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill.title}
                  className="glass rounded-3xl p-6 shadow-card"
                >
                  <div className="flex items-center gap-3 text-lg font-semibold text-ink-950 dark:text-white">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-600/10 text-ink-600 dark:text-ink-200">
                      <skill.icon className="h-5 w-5" />
                    </span>
                    {skill.title}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-ink-200/60 bg-white/80 px-3 py-1 text-sm text-slate-700 transition-colors duration-300 hover:bg-ink-100 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className={container}>
            <SectionTitle
              title="Experience"
              subtitle="A timeline of delivering impact across product and platform teams."
            />
            <div className="mt-10 space-y-8 border-l border-ink-200/60 pl-6 dark:border-white/10">
              {experiences.map((exp, index) => (
                <div key={exp.role} className="relative">
                  <span className="pointer-events-none absolute -left-11 top-2 flex h-10 w-10 items-center justify-center">
                    {index === 0 && (
                      <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-ink-400/35 shadow-[0_0_28px_rgba(79,70,229,0.75)] [animation-duration:2.2s]" />
                    )}
                    <span
                      className={`relative rounded-full ${
                        index === 0
                          ? "h-4 w-4 bg-ink-500 shadow-[0_0_24px_rgba(79,70,229,1)]"
                          : "h-3.5 w-3.5 bg-ink-600 shadow-[0_0_12px_rgba(79,70,229,0.8)]"
                      }`}
                    />
                  </span>
                  <div
                    className={`glass rounded-3xl p-6 shadow-card ${
                      exp.period.includes("Present")
                        ? "bg-ink-50/80 ring-1 ring-ink-200/70 dark:bg-ink-900/20 dark:ring-ink-400/30"
                        : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-ink-950 dark:text-white">
                        {exp.role}
                      </h3>
                      <span className="text-sm text-slate-500 dark:text-slate-300">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {exp.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ink-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className={container}>
            <SectionTitle
              title="Projects"
              subtitle="Selected work focused on performance, scalability, and product impact."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="group relative overflow-hidden rounded-3xl border border-transparent bg-gradient-to-br from-white to-white/40 p-[1px] shadow-card transition hover:border-ink-400/60 dark:from-white/5 dark:to-white/10">
                <div className="glass h-full rounded-3xl p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-ink-950 dark:text-white">
                      Kwikpic
                    </h3>
                    <span className="rounded-full bg-ink-600/10 px-3 py-1 text-xs font-semibold text-ink-600 dark:text-ink-200">
                      100K+ Downloads
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    Built the entire web app from scratch with high performance
                    and scalability.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-300">
                    {"React · Redux · Redux-Saga · Tailwind · Node.js"
                      .split(" · ")
                      .map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-ink-600/10 px-2 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild size="sm">
                      <a
                        href="https://www.kwikpic.in"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="glass flex flex-col justify-between rounded-3xl p-6 shadow-card">
                <div>
                  <h3 className="text-xl font-semibold text-ink-950 dark:text-white">
                    More Projects
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    Have other impactful projects? I can add more cards or
                    showcase case studies here.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-6">
                  <a href="#contact">
                    Let’s collaborate
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="achievements" className="section">
          <div className={container}>
            <SectionTitle
              title="Achievements"
              subtitle="Highlights that speak to impact, scale, and reliability."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((item) => (
                <div
                  key={item}
                  className="glass rounded-2xl p-4 text-center text-sm font-semibold text-ink-900 shadow-card dark:text-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div
            className={`${container} grid gap-10 md:grid-cols-[0.8fr_1.2fr]`}
          >
            <div className="space-y-6">
              <SectionTitle
                title="Contact"
                subtitle="Let’s connect for roles, collaborations, or technical deep dives."
              />
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-ink-600" />
                  inderjit.fullstack.dev@gmail.com
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://www.linkedin.com/in/inderjit-fullstack-dev/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://github.com/inderjit-fullstack-dev"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
            <form
              className="glass space-y-4 rounded-3xl p-6 shadow-card"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-ink-950 dark:text-white"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full rounded-2xl border border-ink-200/60 bg-white/90 px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-ink-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-white"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleFormChange}
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-ink-950 dark:text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-2xl border border-ink-200/60 bg-white/90 px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-ink-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-white"
                    placeholder="you@email.com"
                    value={formState.email}
                    onChange={handleFormChange}
                    maxLength={50}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-ink-950 dark:text-white"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-ink-200/60 bg-white/90 px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-ink-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-white"
                  placeholder="Tell me about your project or role"
                  value={formState.message}
                  onChange={handleFormChange}
                  maxLength={500}
                  required
                />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Message"}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                {statusMessage ? (
                  <span
                    className={
                      formStatus === "success"
                        ? "text-sm font-medium text-emerald-600 dark:text-emerald-400"
                        : "text-sm font-medium text-rose-600 dark:text-rose-400"
                    }
                    aria-live="polite"
                  >
                    {statusMessage}
                  </span>
                ) : null}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/20 py-10 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
        <div className={container}>
          Developed by Inderjit Singh with{" "}
          <span className="heartbeat inline-block" aria-hidden="true">
            ❤️
          </span>
          <span className="sr-only">love</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
