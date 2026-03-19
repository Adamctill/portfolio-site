import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const experiences = [
  {
    role: "Athletics Communications Student Worker",
    company: "Tufts University Athletics",
    period: "2025 – Present",
    description:
      "Provide live game support by tracking and relaying in-game statistics, assisting with athletics software workflows, archiving media-day photography, and preparing materials for NCAA tournament events.",
    tags: ["Live Stats", "Athletics Media", "Game Operations", "Event Support"],
  },
  {
    role: "Creative Builder",
    company: "Independent Projects",
    period: "2024 – Present",
    description:
      "Build digital brands, content systems, visual identities, and interactive web concepts across animation, AI media, design, and personal portfolio work.",
    tags: ["Branding", "UI/UX", "React", "Creative Strategy"],
  },
];

const projects = [
  {
    title: "MotionLab Animations",
    type: "Brand + Media",
    description:
      "A cinematic animation-focused brand concept centered on premium visuals, storytelling, and strong digital identity.",
    stack: ["Brand Design", "Creative Direction", "Visual Storytelling"],
  },
  {
    title: "Interactive Productivity App",
    type: "Web App",
    description:
      "A gamified productivity tracker with animated progress systems, habit flows, and polished interface design.",
    stack: ["React", "Tailwind", "Framer Motion"],
  },
  {
    title: "AI Creative Workflows",
    type: "Creative Systems",
    description:
      "Prompt, design, and content workflows for generating visuals, concepts, and branded short-form media.",
    stack: ["AI Workflows", "Prompt Design", "Creative Strategy"],
  },
  {
    title: "Portfolio Website",
    type: "Personal Site",
    description:
      "A responsive personal website built to present projects, experience, skills, and contact information in a clean visual format.",
    stack: ["Vite", "React", "shadcn/ui"],
  },
];

const strengths = [
  "Communication",
  "Design",
  "Analytics",
  "Organization",
  "Execution",
  "Content Strategy",
  "Creative Direction",
  "Digital Media",
];

const tools = [
  "Final Cut Pro X",
  "Microsoft Excel",
  "Microsoft Office",
  "PowerPoint",
  "Adobe Photoshop",
  "Adobe Lightroom Classic",
  "Canva",
  "Schwab",
  "Quicken",
  "YouTube Analytics",
  "Python",
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "JavaScript",
];

const webTools = ["React", "JavaScript", "Tailwind CSS", "Framer Motion"];

const interests = [
  "Quantitative Economics",
  "Psychology",
  "Digital Design",
  "Brand Building",
  "Animation",
  "AI Media",
  "Sports Media",
  "Creative Technology",
];

function SectionHeader({ icon: Icon, eyebrow, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-violet-300">
        <Icon className="h-4 w-4" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">{description}</p>
    </motion.div>
  );
}

function InteractiveParticleWord({ text = "ADAM" }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const trailRef = useRef([]);

  const config = useMemo(
    () => ({
      gap: 5,
      ease: 0.024,
      friction: 0.945,
      force: 6.2,
      radius: 85,
      textColor: "#22d3ee",
      accentColor: "#facc15",
      glowColor: "rgba(34, 211, 238, 0.18)",
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return undefined;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildParticles = () => {
      const bounds = wrapper.getBoundingClientRect();
      width = Math.max(520, Math.floor(bounds.width));
      height = Math.max(360, Math.floor(bounds.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const fontSize = Math.max(40, Math.min(width * 0.10, height * 0.16));

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `900 ${fontSize}px Inter, ui-sans-serif, system-ui, sans-serif`;
      ctx.fillText(text, width * 0.28, height * 0.30);

      const imageData = ctx.getImageData(0, 0, width, height).data;
      const particles = [];

      for (let y = 0; y < height; y += config.gap) {
        for (let x = 0; x < width; x += config.gap) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha > 140) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 7;
            particles.push({
              x: x + Math.cos(angle) * distance,
              y: y + Math.sin(angle) * distance,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 1.45 + 1.05,
              color: Math.random() > 0.95 ? config.accentColor : config.textColor,
            });
          }
        }
      }

      particlesRef.current = particles;
      trailRef.current = [];
      ctx.clearRect(0, 0, width, height);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      const particles = particlesRef.current;
      const trail = trailRef.current;

      if (pointer.active) {
        trail.push({ x: pointer.x, y: pointer.y, life: 1 });
      }
      if (trail.length > 18) trail.shift();

      for (let i = 0; i < trail.length; i += 1) {
        const t = trail[i];
        t.life *= 0.93;
        ctx.beginPath();
        ctx.fillStyle = `rgba(34, 211, 238, ${0.14 * t.life})`;
        ctx.shadowBlur = 24;
        ctx.shadowColor = "rgba(34, 211, 238, 0.38)";
        ctx.arc(t.x, t.y, 24 * t.life + 6, 0, Math.PI * 2);
        ctx.fill();
      }
      trailRef.current = trail.filter((t) => t.life > 0.08);

      ctx.shadowBlur = 14;
      ctx.shadowColor = config.glowColor;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.0001;

        if (pointer.active && distance < config.radius) {
          const force = (config.radius - distance) / config.radius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * config.force;
          p.vy -= Math.sin(angle) * force * config.force;
        }

        p.vx += (p.baseX - p.x) * config.ease;
        p.vy += (p.baseY - p.y) * config.ease;
        p.vx *= config.friction;
        p.vy *= config.friction;
        if (Math.abs(p.baseX - p.x) < 0.3) p.vx *= 0.82;
        if (Math.abs(p.baseY - p.y) < 0.3) p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = window.requestAnimationFrame(render);
    };

    const updatePointer = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = clientX - rect.left;
      pointerRef.current.y = clientY - rect.top;
      pointerRef.current.active = true;
    };

    const handlePointerMove = (event) => updatePointer(event.clientX, event.clientY);
    const handleTouchMove = (event) => {
      if (!event.touches[0]) return;
      updatePointer(event.touches[0].clientX, event.touches[0].clientY);
    };
    const clearPointer = () => {
      pointerRef.current.active = false;
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
    };

    buildParticles();
    render();

    const resizeObserver = new ResizeObserver(() => buildParticles());
    resizeObserver.observe(wrapper);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", clearPointer);
    canvas.addEventListener("pointerup", clearPointer);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", clearPointer);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", clearPointer);
      canvas.removeEventListener("pointerup", clearPointer);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", clearPointer);
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, [config, text]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[460px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-black/90 shadow-2xl shadow-cyan-950/40 md:h-[520px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
      <canvas ref={canvasRef} className="relative z-10 h-full w-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}

export default function AdamPortfolioSite() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-0 top-64 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-0 top-[40rem] h-[260px] w-[260px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-lg font-semibold tracking-wide text-white">Adam Tillinghast</div>
            <div className="text-xs text-slate-400">Portfolio</div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#experience" className="transition hover:text-white">Experience</a>
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <Button className="rounded-2xl bg-violet-600 text-white hover:bg-violet-500">Resume</Button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              Adam Tillinghast
              <span className="block bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
                Student • Builder • Creator
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              I’m a Tufts University student interested in quantitative thinking, psychology,
              design, digital media, and building polished creative projects with strong visuals
              and clear structure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="rounded-2xl bg-white text-slate-950 hover:bg-slate-200">View Projects</Button>
              <Button variant="outline" className="rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/5">Contact</Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Tufts University</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>adamtillinghast@icloud.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-4"
          >
            <InteractiveParticleWord text="ADAM" />

            <Card className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-violet-950/50 backdrop-blur-xl">
              <CardContent className="p-0">
                <div className="border-b border-white/10 bg-gradient-to-br from-violet-500/20 via-slate-900 to-cyan-400/10 p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm uppercase tracking-[0.2em] text-violet-200/80">Profile</div>
                      <div className="mt-3 text-2xl font-bold text-white">Adam Tillinghast</div>
                      <div className="mt-2 text-sm text-slate-300">Quantitative Economics • Psychology • Digital Design</div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-6">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Education</div>
                    <div className="mt-2 text-lg font-semibold text-white">Tufts University</div>
                    <div className="mt-1 text-sm text-slate-300">Quantitative Economics with interests in psychology, media, and digital creation</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Core Strengths</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {strengths.slice(0, 5).map((item) => (
                        <Badge key={item} className="rounded-full bg-violet-500/15 text-violet-100 hover:bg-violet-500/15">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader icon={GraduationCap} eyebrow="About" title="About me" description="My background, interests, and areas of focus." />

          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
              <Card className="h-full rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white">Who I am</h3>
                  <p className="mt-4 leading-7 text-slate-300">
                    I’m Adam Tillinghast, a Tufts University student interested in quantitative thinking,
                    psychology, design, digital media, and building polished creative projects. I enjoy combining
                    strong visuals with clear structure, whether I’m working on a website, a brand, media support,
                    or a new digital idea.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }} className="grid gap-6">
              <Card className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-white">Interests</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {interests.map((item) => (
                      <Badge key={item} variant="secondary" className="rounded-full border border-white/10 bg-white/5 text-slate-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-white">Focus</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    <li className="flex gap-3"><ChevronRight className="mt-0.5 h-4 w-4 text-violet-300" />Design-forward digital projects</li>
                    <li className="flex gap-3"><ChevronRight className="mt-0.5 h-4 w-4 text-violet-300" />Interactive web experiences</li>
                    <li className="flex gap-3"><ChevronRight className="mt-0.5 h-4 w-4 text-violet-300" />Media, branding, and communication</li>
                    <li className="flex gap-3"><ChevronRight className="mt-0.5 h-4 w-4 text-violet-300" />Organized, high-quality execution</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader icon={Briefcase} eyebrow="Experience" title="Experience" description="Campus work, leadership, and creative project experience." />

          <div className="grid gap-6">
            {experiences.map((item, index) => (
              <motion.div
                key={`${item.role}-${item.company}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Card className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                        <p className="mt-1 text-base text-violet-200">{item.company}</p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">{item.period}</div>
                    </div>

                    <p className="mt-5 max-w-4xl leading-7 text-slate-300">{item.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} className="rounded-full bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/10">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader icon={FolderKanban} eyebrow="Projects" title="Projects" description="Selected projects and creative work." />

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Card className="group h-full rounded-[28px] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-violet-300/30 hover:bg-white/[0.07]">
                  <CardContent className="flex h-full flex-col p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge className="rounded-full bg-white/10 text-slate-200 hover:bg-white/10">{project.type}</Badge>
                    </div>

                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="mt-4 flex-1 leading-7 text-slate-300">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="rounded-full border border-white/10 bg-white/5 text-slate-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader icon={Sparkles} eyebrow="Skills" title="Skills & Tools" description="Creative strengths, software, and platforms I use." />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="grid gap-6 md:grid-cols-2"
          >
            <Card className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-white">Strengths</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {strengths.map((item) => (
                    <Badge key={item} className="rounded-full bg-violet-500/15 px-4 py-2 text-sm text-violet-100 hover:bg-violet-500/15">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-white">Software & Platforms</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {tools.map((item) => (
                    <Badge key={item} className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/10">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            
          </motion.div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-slate-900 to-cyan-400/10 backdrop-blur-xl">
              <CardContent className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-violet-200">Contact</div>
                  <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Get in touch</h2>
                  <p className="mt-4 max-w-2xl leading-7 text-slate-300">Please reach out to me through any of these!</p>
                </div>

                <div className="flex flex-wrap gap-3 md:justify-end">
                  <Button asChild className="rounded-2xl bg-white text-slate-950 hover:bg-slate-200">
                    <a href="mailto:adamtillinghast@icloud.com">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/5">
                    <a href="https://www.linkedin.com/in/adamtillinghast/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/5">
                    <a href="https://www.instagram.com/adamctill/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="mr-2 h-4 w-4" />
                      Instagram
                    </a>
                  </Button>
                  <Button variant="outline" className="rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/5">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
