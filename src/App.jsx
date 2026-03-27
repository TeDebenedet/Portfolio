import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import profileImg from "./assets/profile.jpg";
import maestroThumb from "./assets/thumbnails/maestro.jpg";

const SpotlightHeading = ({ children, className = "" }) => {
  return (
    <span
      className={`relative inline-block bg-gradient-to-r from-white via-violet-200/80 to-white bg-clip-text text-transparent ${className}`}
      style={{ textShadow: "0 0 20px rgba(255,255,255,0.08)" }}
    >
      {children}
    </span>
  );
};

const SpotlightCard = ({ children, className = "", variant = "default" }) => {
  const [active, setActive] = useState(false);

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);

  const x = useSpring(rawX, { stiffness: 420, damping: 34, mass: 0.22 });
  const y = useSpring(rawY, { stiffness: 420, damping: 34, mass: 0.22 });

  const gloss = useMotionTemplate`
    radial-gradient(
      260px circle at ${x}% ${y}%,
      rgba(255,255,255,0.18) 0%,
      rgba(255,255,255,0.13) 18%,
      rgba(196,181,253,0.11) 34%,
      rgba(168,85,247,0.07) 48%,
      rgba(255,255,255,0.03) 68%,
      rgba(255,255,255,0) 100%
    )
  `;

  const sheen = useMotionTemplate`
    linear-gradient(
      135deg,
      rgba(255,255,255,0.18) 0%,
      rgba(255,255,255,0.06) 18%,
      rgba(255,255,255,0.01) 42%,
      rgba(255,255,255,0.05) 100%
    )
  `;

  const statTint = useMotionTemplate`
    radial-gradient(
      220px circle at ${x}% ${y}%,
      rgba(196,181,253,0.24) 0%,
      rgba(244,114,182,0.18) 28%,
      rgba(168,85,247,0.13) 52%,
      rgba(255,255,255,0.04) 72%,
      rgba(255,255,255,0) 100%
    )
  `;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    rawX.set(px);
    rawY.set(py);
    if (!active) setActive(true);
  };

  return (
    <motion.div
      onPointerEnter={() => setActive(true)}
      onPointerMove={handleMove}
      onPointerLeave={() => setActive(false)}
      whileHover={{ y: -10, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.09, ease: "easeOut" }}
      className={`group relative overflow-hidden border border-white/10 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-1px_0_rgba(255,255,255,0.02),0_16px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl ${className}`}
    >
      {variant !== "stat" && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: gloss,
            mixBlendMode: "screen",
            maskImage: "radial-gradient(circle at center, transparent 25%, black 70%)",
            opacity: active ? 0.85 : 0,
            transition: "opacity 85ms ease-out",
          }}
        />
      )}

      {variant === "stat" && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: statTint,
            opacity: active ? 1 : 0,
            transition: "opacity 75ms ease-out",
          }}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: sheen }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/[0.04]"
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const AboutPanel = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.02),0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl md:p-10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_48%)] opacity-0 transition duration-200 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/[0.035]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const MagneticPill = ({ children }) => {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.025 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.07, ease: "easeOut" }}
      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-75 group-hover:border-white/14 group-hover:bg-white/[0.06] group-hover:text-white/84 hover:border-violet-300/28 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(196,181,253,0.16),rgba(244,114,182,0.10))] hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_22px_rgba(124,58,237,0.12)]"
    >
      {children}
    </motion.span>
  );
};

const LanguageMeter = ({ name, level, bars }) => {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.988 }}
      transition={{ duration: 0.07, ease: "easeOut" }}
      className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-75 hover:border-violet-300/25 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(196,181,253,0.14),rgba(244,114,182,0.08))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_22px_rgba(124,58,237,0.1)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/88">{name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/42">{level}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((bar) => (
            <span
              key={bar}
              className={`h-2.5 w-8 rounded-full ${
                bar <= bars
                  ? "bg-[linear-gradient(90deg,rgba(196,181,253,0.95),rgba(244,114,182,0.8))] shadow-[0_0_12px_rgba(168,85,247,0.18)]"
                  : "bg-white/[0.08]"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const OrganizationTile = ({ organization, index }) => {
  // Per-logo sizing tweaks for optical balance
  const sizeMap = {
    // Tuned for visual balance (not intrinsic size)
    "Funktasy": "max-h-16 scale-125",
    "International Baccalaureate": "max-h-18 scale-115",
    "UC Berkeley": "max-h-16 scale-135",
    "Utrecht University": "max-h-18 scale-120",
    "University of Amsterdam": "max-h-16 scale-135",
  };

  const sizeClass = sizeMap[organization.name] || "max-h-14";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.045, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="group flex min-h-[96px] items-center justify-center px-4"
    >
      {organization.logo ? (
        <img
          src={organization.logo}
          alt={`${organization.name} logo`}
          className={`w-auto max-w-[220px] object-contain opacity-55 grayscale transition duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0 ${sizeClass}`}
        />
      ) : (
        <p className="text-center text-[12px] uppercase tracking-[0.28em] text-white/36 transition duration-300 group-hover:text-white/60 sm:text-[13px]">
          {organization.name}
        </p>
      )}
    </motion.div>
  );
};

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tobias-debenedet" },
  { label: "Email", href: "mailto:tobias.debenedet@gmail.com" },
];

const highlights = [
  { value: "80+", label: "posts / week overseen" },
  { value: "10", label: "social platforms managed" },
  { value: "700M+", label: "views generated" },
  { value: "2", label: "music profiles built" },
];

const expertise = [
  "Social Media Strategy",
  "Workflow Management",
  "ClickUp Operations",
  "Content Systems",
  "Analytics & Optimization",
  "Creative Direction",
];

const languageLevels = [
  { name: "English", level: "Native", bars: 5 },
  { name: "Spanish", level: "Native", bars: 5 },
  { name: "Dutch", level: "Professional", bars: 3 },
  { name: "German", level: "Conversational", bars: 2 },
];

import funktasyLogo from "./assets/logos/ff.png";
import ibLogo from "./assets/logos/ib.svg";
import berkeleyLogo from "./assets/logos/ucberkley.png";
import uuLogo from "./assets/logos/uu.png";
import uvaLogo from "./assets/logos/uva.png";

const organizations = [
  { name: "Funktasy", logo: funktasyLogo },
  { name: "International Baccalaureate", logo: ibLogo },
  { name: "UC Berkeley", logo: berkeleyLogo },
  { name: "Utrecht University", logo: uuLogo },
  { name: "University of Amsterdam", logo: uvaLogo },
];

const experienceCards = [
  {
    eyebrow: "Current Role",
    title: "Social Media Manager @ Funktasy",
    text: "Leading multi-platform content operations across YouTube, Instagram, Facebook, and TikTok with a focus on consistent growth, workflow efficiency, and high-quality output, while contributing to over 500M short-form views generated across platforms.",
  },
  {
    eyebrow: "Creative Work",
    title: "Content Creator & Profile Builder",
    text: "Built and managed multiple online profiles through short-form content strategy. My most successful sports-related profile reached 120K followers and over 200M views across platforms.",
  },
  {
    eyebrow: "Startup Project",
    title: "Business Startup – Goodwash",
    text: "Collaborated with a team to develop Goodwash, an app designed to simplify laundry tasks. Worked through the full startup process including ideation, market research, business planning, app design, and presenting the concept to potential investors.",
  },
];

const musicTracks = [
  {
    title: "Composition Showreel",
    type: "Showreel",
    description: "A curated selection of compositions demonstrating range across styles and moods.",
    platform: "YouTube",
    duration: "Showreel",
    embedUrl: "https://www.youtube.com/embed/VHswSzC3DkY",
    thumbnail: "https://img.youtube.com/vi/VHswSzC3DkY/maxresdefault.jpg",
    featured: true,
    morphPreview: true,
  },
  {
    title: "The Maestro",
    type: "Original composition",
    description: "A cinematic composition showcasing orchestration and musical storytelling.",
    platform: "SoundCloud",
    duration: "Track",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/trampozey/the-maestro",
    thumbnail: maestroThumb,
  },
  {
    title: "Sunset Serenade",
    type: "Film / ambient / piano",
    description: "A warm and emotional piano-driven piece capturing a sunset atmosphere.",
    platform: "YouTube",
    duration: "Track",
    embedUrl: "https://www.youtube.com/embed/DSCNJ6GRng4",
    thumbnail: "https://img.youtube.com/vi/DSCNJ6GRng4/maxresdefault.jpg",
  },
  {
    title: "Curated Playlist",
    type: "Spotify playlist",
    description: "A handpicked collection of tracks I curate, reflecting the musical worlds and moods that inspire my work.",
    platform: "Spotify",
    duration: "Playlist",
    embedUrl: "https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID?utm_source=generator",
    thumbnail:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  },
];

const MusicPreview = ({ isOpen = false, track, featured = false }) => {
  const frameHeight = track?.platform === "Spotify" ? 352 : featured ? 420 : 190;

  return (
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? frameHeight + 96 : 0,
        opacity: isOpen ? 1 : 0,
        marginTop: isOpen ? 20 : 0,
      }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/88">{track.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/42">{track.platform}</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/64">
            {track.duration || track.platform}
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
          <iframe
            src={track.embedUrl}
            title={track.title}
            className="w-full"
            style={{ height: `${frameHeight}px` }}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [openTrack, setOpenTrack] = useState(null);

  useEffect(() => {
    const handleMove = (e) => {
      document.documentElement.style.setProperty("--ambient-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--ambient-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const navItems = useMemo(
    () => [
      { label: "About", target: "#about", id: "about" },
      { label: "Experience", target: "#experience", id: "experience" },
      { label: "Music", target: "#music", id: "music" },
      { label: "Contact", target: "#contact", id: "contact" },
    ],
    []
  );

  const handleNavClick = (e, target) => {
    e.preventDefault();
    const targetEl = document.querySelector(target);
    if (!targetEl) return;
    const headerOffset = 96;
    const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll();

  const glowY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.4], [0, -35]);
  const streakY = useTransform(scrollYProgress, [0, 1], [0, 42]);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 140, damping: 16, mass: 0.4 });
  const rotateY = useSpring(rawRotateY, { stiffness: 140, damping: 16, mass: 0.4 });

  const heroRefractX = useTransform(rotateY, [-12, 12], [-3, 3]);
  const heroRefractY = useTransform(rotateX, [-12, 12], [-2, 2]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rawRotateY.set(((x - centerX) / centerX) * 12);
    rawRotateX.set(((y - centerY) / centerY) * 12);
  };

  const handleSectionInView = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#04010a] text-white selection:bg-fuchsia-400/30">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: `radial-gradient(700px circle at var(--ambient-x, 50%) var(--ambient-y, 50%), rgba(255,255,255,0.045), rgba(255,255,255,0.02) 45%, transparent 75%)`,
          filter: "blur(70px)",
        }}
      />
      <div className="relative z-[2]">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <motion.div
            style={{ y: glowY, scale: glowScale }}
            className="absolute left-[-6rem] top-[-4rem] h-[28rem] w-[28rem] rounded-full bg-violet-500/22 blur-3xl"
          />
          <motion.div
            style={{ y: glowY }}
            className="absolute right-[-8rem] top-[12%] h-[36rem] w-[36rem] rounded-full bg-fuchsia-500/14 blur-3xl"
          />
          <motion.div
            style={{ y: streakY }}
            className="absolute bottom-[6%] left-[28%] h-[24rem] w-[24rem] rounded-full bg-purple-400/10 blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.15),transparent_25%),radial-gradient(circle_at_70%_20%,rgba(236,72,153,0.09),transparent_24%),radial-gradient(circle_at_bottom,rgba(91,33,182,0.1),transparent_30%)]" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.08) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
            }}
          />
        </div>

        <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#04010a]/42 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(255,255,255,0.06),0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-violet-200/70">Tobias Debenedet</p>
              <p className="text-sm text-white/80">Social Media Manager • Music & Media</p>
            </div>

            <nav className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.035] px-2 py-2 text-sm text-white/68 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:flex">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.target}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className={`rounded-full px-3 py-1.5 transition duration-100 ${
                    activeSection === item.id
                      ? "bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      : "hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 pb-14 pt-28 md:grid-cols-[0.92fr_1.08fr] lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative flex justify-center pb-10 md:justify-start"
          >
            <div className="pointer-events-none absolute bottom-[-1.2rem] left-1/2 h-14 w-[72%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,181,253,0.2),rgba(168,85,247,0.08)_45%,transparent_72%)] blur-2xl" />
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                rawRotateX.set(0);
                rawRotateY.set(0);
              }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              whileTap={{ scale: 0.995 }}
              className="group relative h-[580px] w-[380px] rounded-[2rem] border border-white/10 bg-white/[0.05] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.02),0_35px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/[0.04]" />
              <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-black">
                <motion.img
                  src={profileImg}
                  alt="Tobias Debenedet portrait"
                  style={{ y: imageY, scale: imageScale }}
                  className="h-full w-full object-cover grayscale"
                />

                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[1.55rem]"
                  style={{ x: heroRefractX, y: heroRefractY, opacity: 0.35, scale: 1.01 }}
                >
                  <div className="absolute inset-0 rounded-[1.55rem] border border-white/[0.05]" />
                  <div className="absolute inset-[2px] rounded-[1.45rem] border-t border-l border-white/[0.14] opacity-90" />
                  <div className="absolute inset-[2px] rounded-[1.45rem] border-r border-b border-white/[0.06] opacity-80" />
                  <div className="absolute left-0 top-0 h-28 w-28 rounded-tl-[1.45rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_40%,transparent_70%)]" />
                  <div className="absolute bottom-0 right-0 h-28 w-28 rounded-br-[1.45rem] bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),rgba(255,255,255,0.04)_40%,transparent_70%)]" />
                </motion.div>

                <motion.div
                  animate={{ x: [0, 24, 0], opacity: [0.18, 0.34, 0.18] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  style={{ y: streakY }}
                  className="absolute inset-0 bg-[linear-gradient(115deg,transparent_16%,rgba(255,255,255,0.16)_26%,transparent_36%,transparent_50%,rgba(196,181,253,0.14)_64%,transparent_76%)] mix-blend-screen"
                />

                <motion.div
                  animate={{ x: [0, -18, 0], opacity: [0.08, 0.18, 0.08] }}
                  transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                  className="absolute inset-0 bg-[linear-gradient(110deg,transparent_22%,rgba(255,255,255,0.08)_31%,transparent_41%,transparent_60%,rgba(168,85,247,0.14)_72%,transparent_82%)] mix-blend-screen"
                />

                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[1.55rem]"
                  style={{ x: heroRefractX, y: heroRefractY, opacity: 0.28 }}
                >
                  <div className="absolute inset-0 rounded-[1.55rem] border border-white/[0.04]" />
                  <div className="absolute inset-[2px] rounded-[1.45rem] border-t border-l border-white/[0.10] opacity-80" />
                  <div className="absolute inset-[2px] rounded-[1.45rem] border-r border-b border-white/[0.05] opacity-70" />
                  <div className="absolute left-0 top-0 h-24 w-24 rounded-tl-[1.45rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),rgba(255,255,255,0.04)_34%,transparent_62%)]" />
                  <div className="absolute bottom-0 right-0 h-24 w-24 rounded-br-[1.45rem] bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),rgba(255,255,255,0.03)_34%,transparent_62%)]" />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#04010a] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#04010a]/95 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#04010a]/70" />
                <div className="absolute inset-0 bg-violet-500/[0.08] mix-blend-overlay" />

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-violet-200/70">Based in The Hague</p>
                  <p className="mt-1 text-sm text-white/72">Musicology Graduate • Funktasy</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.08 }}
          >
            <p className="mb-5 text-xs uppercase tracking-[0.42em] text-violet-200/72">
              Social Media Manager • Musician • Business Master Student
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-6xl xl:text-7xl">
              <SpotlightHeading>Tobias Debenedet</SpotlightHeading>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              Social Media Manager at Funktasy Record Label &amp; Magazine, Musicology graduate specialized in Music &amp; Media, and Business Master student focused on strategy, systems, audience growth, and original music.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <motion.a
                href="#experience"
                onClick={(e) => handleNavClick(e, "#experience")}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
                className="inline-flex items-center rounded-2xl border border-white/10 bg-gradient-to-r from-violet-400 to-fuchsia-400 px-6 py-3 text-sm font-medium text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_16px_40px_rgba(139,92,246,0.32)]"
              >
                Explore Work
              </motion.a>
              <motion.a
                href="#music"
                onClick={(e) => handleNavClick(e, "#music")}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.045] px-6 py-3 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm"
              >
                Listen to Music
              </motion.a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item, index) => (
                <SpotlightCard key={item.label} variant="stat" className="rounded-2xl p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2 + index * 0.08 }}
                    whileHover={{ y: -6 }}
                  >
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-sm text-white/55">{item.label}</p>
                  </motion.div>
                </SpotlightCard>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.18 }}
          className="mx-auto max-w-7xl px-6 pb-8 lg:px-8"
        >
          <div className="rounded-[2rem] border border-white/8 bg-white/[0.02] px-6 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:px-8 sm:py-8">
            <p className="mb-7 text-center text-[11px] uppercase tracking-[0.42em] text-violet-200/60 sm:mb-8">
              Experiences across
            </p>

            <div className="grid items-center gap-y-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4">
              {organizations.map((organization, index) => (
                <OrganizationTile
                  key={organization.name}
                  organization={organization}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="about"
          onViewportEnter={() => handleSectionInView("about")}
          initial={{ opacity: 0, y: 30, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.22 }}
          className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
        >
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <AboutPanel>
              <p className="text-xs uppercase tracking-[0.36em] text-violet-200/70">About</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] sm:text-4xl">
                <SpotlightHeading>Creative systems with taste and structure.</SpotlightHeading>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
                I work where content, music, and business strategy come together.
              </p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/68">
                I’m a Social Media Manager at Funktasy Record Label &amp; Magazine, where I oversee high-volume, multi-platform content operations across YouTube, Instagram, Facebook, and TikTok. I manage scheduling, coordinate a remote team, and ensure consistent output and quality across ~80 posts per week — turning content into a structured, repeatable system that drives growth.
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">
                My work sits at the intersection of music, media, and strategy. With a background in Musicology (specialized in Music &amp; Media) and ongoing studies in Business Administration, I approach content not just creatively, but operationally, focusing on strategy, workflows, and scalability.
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">
                Alongside this, I create music, including composing for film, and have built my own content platforms from the ground up. These experiences shape how I think about content: not just as output, but as part of a larger ecosystem that connects audience, platform, and brand.
              </p>
            </AboutPanel>

            <AboutPanel>
              <p className="text-xs uppercase tracking-[0.36em] text-violet-200/70">Strengths</p>
              <div className="group mt-5 flex flex-wrap gap-3">
                {expertise.map((item) => (
                  <MagneticPill key={item}>{item}</MagneticPill>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-[0.36em] text-violet-200/70">Languages</p>
                <div className="mt-4 grid gap-3">
                  {languageLevels.map((item) => (
                    <LanguageMeter key={item.name} name={item.name} level={item.level} bars={item.bars} />
                  ))}
                </div>
              </div>
            </AboutPanel>
          </div>
        </motion.section>

        <motion.section
          id="experience"
          onViewportEnter={() => handleSectionInView("experience")}
          initial={{ opacity: 0, y: 30, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.22 }}
          className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10"
          >
            <p className="text-xs uppercase tracking-[0.36em] text-violet-200/70">Experience</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl">
              <SpotlightHeading>Work shaped by music, media, and scale.</SpotlightHeading>
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {experienceCards.map((item, index) => (
              <SpotlightCard key={item.title} className="rounded-[2rem] p-7">
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-violet-200/68">{item.eyebrow}</p>
                  <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-4 leading-8 text-white/60">{item.text}</p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="music"
          onViewportEnter={() => handleSectionInView("music")}
          initial={{ opacity: 0, y: 30, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.22 }}
          className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10"
          >
            <p className="text-xs uppercase tracking-[0.36em] text-violet-200/70">Music</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl">
              <SpotlightHeading>Music Portfolio</SpotlightHeading>
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-white/66">
              This section showcases my musical work through a selection of original compositions and curated playlists.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {musicTracks.map((track, index) => {
              const isOpen = openTrack === track.title;
              const isFeatured = Boolean(track.featured);
              const useMorph = Boolean(track.morphPreview);

              return (
                <div key={track.title} className={isFeatured ? "lg:col-span-3" : "lg:col-span-1"}>
                  <SpotlightCard className={`rounded-[2rem] ${isFeatured ? "p-7" : "p-6"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: index * 0.1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className={isFeatured ? "grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start" : "block"}
                    >
                      <div>
                        <div className="mb-5 flex items-center justify-between">
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.26em] text-violet-200/70">
                            {track.type}
                          </span>
                          <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/62">
                            {track.duration || track.platform}
                          </div>
                        </div>

                        {!useMorph && (
                          <div
                            onClick={() => setOpenTrack(isOpen ? null : track.title)}
                            className={`group mb-5 relative cursor-pointer overflow-hidden rounded-[1.4rem] border border-white/10 ${isFeatured ? "h-[18rem]" : "h-40"}`}
                          >
                            <img
                              src={track.thumbnail}
                              alt={track.title}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-black/28" />
                            <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                              Preview
                            </div>
                          </div>
                        )}

                        {useMorph && !isOpen && (
                          <div
                            onClick={() => setOpenTrack(track.title)}
                            className={`group mb-5 relative cursor-pointer overflow-hidden rounded-[1.4rem] border border-white/10 ${isFeatured ? "h-[18rem]" : "h-40"}`}
                          >
                            <img
                              src={track.thumbnail}
                              alt={track.title}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-black/28" />
                            <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                              Open preview
                            </div>
                          </div>
                        )}

                        {useMorph && isOpen && (
                          <div className="mb-5">
                            <MusicPreview isOpen={isOpen} track={track} featured={isFeatured} />
                          </div>
                        )}
                      </div>

                      <div>
                        {isFeatured && (
                          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-violet-200/70">
                            Featured composition
                          </p>
                        )}
                        <h3 className="text-[22px] font-semibold tracking-[-0.01em]">{track.title}</h3>
                        <p className="mt-4 leading-8 text-white/60">{track.description}</p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <motion.button
                            type="button"
                            onClick={() => setOpenTrack(isOpen ? null : track.title)}
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.08, ease: "easeOut" }}
                            className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl"
                          >
                            {isOpen ? "Hide preview" : "Open preview"}
                          </motion.button>
                          <span className="text-sm text-violet-200/78">{track.platform}</span>
                        </div>

                        {!useMorph && <MusicPreview isOpen={isOpen} track={track} featured={isFeatured} />}
                      </div>
                    </motion.div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          onViewportEnter={() => handleSectionInView("contact")}
          initial={{ opacity: 0, y: 30, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.22 }}
          className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-violet-500/12 via-white/[0.06] to-fuchsia-500/12 p-10 text-center backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_40px_rgba(0,0,0,0.14)] sm:p-14"
          >
            <p className="text-xs uppercase tracking-[0.36em] text-violet-200/70">Contact</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl">
              <SpotlightHeading>Let’s build something distinctive.</SpotlightHeading>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/68">
              Open to creative collaborations, social media strategy work, digital brand building, and music-related projects.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-3 text-sm text-white/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
