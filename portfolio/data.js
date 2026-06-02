/* ============================================================
   Hanze Lou — Portfolio content.
   Swap in your real details here. Structure stays the same.
   ============================================================ */
window.PF = {
  name: "Hanze Lou",
  title: "Research Intern @ Multicore Labs | Interested in ML systems",
  tagline: "Builder of small worlds.",
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
      tags: ["Research", "Systems", "Go"],
    },
  ],

  artifacts: [
    { name: "DrawScape AR",  blurb: "An augmented reality drawing app for Android built with a team of four for Eureka Hacks '26. Users draw in 3D space using real-time hand gesture tracking via Google MediaPipe Vision Tasks, with drawings persisted to the cloud and tied to user profiles. Built with Kotlin and Jetpack Compose, ARCore via SceneView for spatial tracking, Firebase Auth and Firestore for backend, and Hilt for dependency injection. Deployed and tested on physical Android hardware.", tags: ["React", "WebSockets", "CRDT"] },
    { name: "Cambridge Battlecode Bot",     blurb: "Peaked at a rank in the top 50s out of 480 teams. Utilized BFS and a heuristic approach based on 9 forces of influence to optimize robot pathfinding. Coded a custom bugnav navigation system for bots to follow in case it is stuck and hashing system to allow for optimal communication between bots.", tags: ["Next.js", "D3", "Postgres"] },
    { name: "Connect4 AI", blurb: "Built a state space search API using a recursive Minimax algorithm to evaluate deep decision trees. Used Alpha-Beta pruning to eliminate sub-optimal branches, reducing search time complexity from O(b^d) to O(b^(d/2)). Designed a custom heuristic evaluation matrix, enabling the backend to process over 800,000 future board states and return optimal moves in under 100ms", tags: ["Python", "LLMs", "Embeddings"] },
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
    { label: "Email",     icon: "mail",      href: "mailto:louhansen811@gmail.com"},
    { label: "GitHub",    icon: "github",    href: "https://github.com/BestCody"},
    { label: "LinkedIn",  icon: "linkedin",  href: "https://www.linkedin.com/in/hansen-lou-301b2b338/"},
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/hansenlouu/"},
  ],
};
