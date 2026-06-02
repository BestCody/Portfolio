/* ============================================================
   Hanze Lou — Portfolio content.
   Swap in your real details here. Structure stays the same.
   ============================================================ */
window.PF = {
  name: "Hanze Lou",
  title: "Research Intern @ Multicore Labs | Interested in ML systems",
  tagline: "Builder of worlds.",
  kicker: "Aspiring Software Engineer",

  realms: [],

  quests: [
    {
      role: "Research Intern",
      org: "Multicore Labs",
      dates: "May 2026 — Present",
      desc: "Researching GPU optimizations using concurrency.",
    },
    {
      role: "Researcher",
      org: "Raouf Boutaba Research Group",
      dates: "April 2026 - Present ",
      desc: "Researching ways to improve networks through neural receivers and network splicing.",
    },
    {
      role: "Coding Club President",
      org: "Oakville Trafalgar High School",
      dates: "2025 — Present",
      desc: "Teaching over 40 club members to build projects ranging from software to game dev, building over 10+ projects every year. Also prepares club members for Computing Olympiad competitions like USACO through lessons.",
    },
  ],

  artifacts: [
    { name: "DrawScape AR",  blurb: "An Android AR drawing app (Eureka Hacks '26) enabling 3D space drawing via real-time hand gesture tracking (Google MediaPipe). Built using Kotlin, Jetpack Compose, and ARCore (SceneView), utilizing Hilt for dependency injection and Firebase for cloud persistence.", href: "https://github.com/BestCody/drawscapeAR"},
    { name: "Cambridge Battlecode Bot",     blurb: "Peaked in the top 50 out of 480 teams. Optimized robot pathfinding using BFS and a 9-force heuristic. Implemented a custom bugnav system for stuck bots and a hashing mechanism for efficient inter-bot communication.", href: "https://battlecode.cam/"},
    { name: "Connect4 AI", blurb: "Built a state space search API using Minimax and Alpha-Beta pruning to reduce time complexity to O(b^(d/2)) from O(b^d). Designed a custom heuristic matrix that evaluates over 800,000 future board states and returns optimal moves in under 100ms.", href: "https://connectfourai.vercel.app/"},
  ],

  honors: [
    { year: "2026", title: "USACO Gold",       issuer: "Top 10% on USACO" },
    { year: "2026", title: "Codeforces Expert",      issuer: "Top 10% on Codeforces" },
    { year: "2024", title: "Beaver Computing Competition Honor Roll",    issuer: "Top 1% on Beaver Computing Competition" },
    { year: "2023", title: "Score of 45 on Canadian Senior Mathematics Competition",  issuer: "Top 3% on Canadian Senior Mathematics Competition" },
  ],

  lore: {
    school: "Evergreen University",
    degree: "B.S. in Computer Science",
    dates: "2022 — 2026",
    honors: "Magna Cum Laude · GPA 3.9 / 4.0",
    coursework: ["Distributed Systems", "Machine Learning", "Compilers", "Algorithms", "Databases", "Human–Computer Interaction"],
  },

  skills: [
    { group: "Tongues",   items: ["TypeScript", "Python", "Go", "Swift", "Rust", "SQL"] },
    { group: "Grimoires", items: ["React", "Next.js", "Node", "FastAPI", "gRPC"] },
    { group: "Tools",     items: ["Postgres", "Docker", "AWS", "Figma", "Git"] },
  ],

contact: [
    { label: "Email",     icon: "mail",      href: "mailto:louhansen811@gmail.com", target: "_blank"},
    { label: "GitHub",    icon: "github",    href: "https://github.com/BestCody", target: "_blank"},
    { label: "LinkedIn",  icon: "linkedin",  href: "https://www.linkedin.com/in/hansen-lou-301b2b338/", target: "_blank"},
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/hansenlouu/", target: "_blank"},
  ],
};
