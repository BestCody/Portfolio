/* ============================================================
   Hanze Lou — Portfolio content.
   Swap in your real details here. Structure stays the same.
   ============================================================ */
window.PF = {
  name: "Hanze Lou",
  title: "Research Intern @ Multicore Labs | Interested in ML systems",
  tagline: "Looking for projects to collaborate on!",
  kicker: "Aspiring Software Engineer",

  realms: [],

  quests: [
    {
      role: "Research Intern",
      org: "Multicore Labs",
      dates: "",
      desc: "Researching GPU optimizations using concurrency.",
    },
    {
      role: "Researcher",
      org: "Raouf Boutaba Research Lab",
      dates: "",
      desc: "Researching ways to improve networks through neural receivers and network splicing.",
    },
    {
      role: "Coding Club President",
      org: "Oakville Trafalgar High School",
      dates: "",
      desc: "Teaching over 40 club members to build projects ranging from software to game dev, building over 10+ projects every year. Also prepares club members for Computing Olympiad competitions like USACO through lessons.",
    },
  ],

   /* media: path to a screenshot or clip for the photo that prints out of the camera.
      Drop files in assets/shots/ and point at them, e.g.
        media: "assets/shots/nomad.png"      (png / jpg / webp / gif)
        media: "assets/shots/nomad.mp4"      (mp4 / webm)
        media: "https://youtu.be/xxxxxxxxxxx" (plays big in a lightbox when clicked)
      Leave it "" and the photo prints as blank undeveloped film.
      site: optional live URL. If set, the printed photo becomes a link to it.

      The photo window is 16:9 and fills itself by cropping, which is what you want for a
      screenshot. A logo or a diagram is the opposite case — it has to be seen whole, and a
      wide wordmark would simply lose its ends. For those:
        fit: "contain"   show the whole image instead of cropping to fill
        bg:  "#fff"      the artwork's own background colour, so the letterbox around it
                         disappears and the photo reads as one solid card
      Only set `bg` alongside `fit: "contain"` — a cropped screenshot has no letterbox.

      pos: "top"         which part of a cropped screenshot to keep. A tall page shot gets
                         trimmed top and bottom by default, which can behead a header; "top"
                         spends the whole crop on the bottom instead. */
   artifacts: [
     { name: "Nomad", blurb: "• Fraud-prevention layer for AI agents on the Solana blockchain\n• Each agent carries a verifiable passport and cryptographically signs every action, so businesses can confirm it's who it claims to be\n• Passport lives on-chain, so an agent can only do exactly what it's authorized to and can never grant itself more power than it was given\n• Won Best Use of Solana @ Jamhacks 2026", media: "https://youtu.be/jD7tUWW5ldY", href: "https://github.com/michaelmazilu/nomad" },
     { name: "CRAP", blurb: "• Comprehensive Review and Analysis Platform — turns messy Phase II–III clinical trial drafts into structured, FDA-aligned protocols\n• Converts protocol PDFs into machine-readable CDISC USDM (endpoints, arms, eligibility, schedule of activities) and exports JSON/XML\n• Benchmarks a trial against 591K+ historical studies to score procedural burden, recruitment difficulty, and amendment risk\n• XGBoost with SHAP explainability predicts duration-overrun risk; FDA guidance docs are cross-referenced to surface compliance gaps\n• Regenerates an improved, citation-linked draft; ships an MCP server for natural-language search over the trial database", media: "https://youtu.be/5yr4u_F4f3k", href: "https://github.com/Arav-Bhandari/CRAP" },
     { name: "MonadLabs", blurb: "• Ingestion pipeline that converts documents, images, audio, and video into a Universal Intermediate Representation (UIR v1.0)\n• Docling for PDFs/DOCX/EPUB, Whisper on vLLM with pyannote diarization for audio, ffmpeg + Florence-2 frame fusion for video\n• Emits typed chunks, source metadata, and embeddings, with optional Weaviate storage\n• Browser console with file browser, global search, and a grounded document assistant that cites its sources via an agentic tool-calling loop", media: "https://youtu.be/KoBO9rmEnMI", href: "https://github.com/BestCody/MonadLabs" },
     { name: "DrawScape AR", blurb: "• Android AR drawing app (Eureka Hacks '26) enabling 3D space drawing via real-time hand gesture tracking (Google MediaPipe)\n• Built with Kotlin, Jetpack Compose, and ARCore (SceneView)\n• Hilt for dependency injection and Firebase for cloud persistence", media: "assets/shots/drawscape.png", fit: "contain", bg: "#000", href: "https://github.com/BestCody/drawscapeAR" },
     { name: "Channel Emulation for srsRAN", blurb: "• Runs a full software 5G network — srsRAN base station and handset over an Open5GS core — across physically realistic radio channels\n• Channels are ray-traced with NVIDIA Sionna RT, so walls, reflections, and distance actually shape the signal the receiver sees\n• Deployed on a GPU-enabled single-node Kubernetes cluster with automated testbed provisioning", media: "assets/shots/channel-emulation.png", fit: "contain", bg: "#fff", href: "https://github.com/BestCody/Channel-Emulation-Integration-With-SRSran" },
     { name: "GPU LSM Tree", blurb: "• Log-structured merge tree written in CUDA — a key/value store whose inserts, merges, and lookups all run on the GPU\n• Several compaction strategies implemented and benchmarked head-to-head: standard merge, hashed, and direct-drain-into-sheet\n• Built on CUB device-wide radix sort and scan, Thrust, and cooperative groups", media: "assets/shots/lsm-tree.png", fit: "contain", bg: "#fff", href: "https://github.com/BestCody/GPU-LSM-Tree" },
     { name: "Cambridge Battlecode Bot", blurb: "• Peaked in the top 50 out of 480 teams\n• Optimized robot pathfinding using BFS and a 9-force heuristic\n• Custom bugnav system for stuck bots and a hashing mechanism for efficient inter-bot communication", media: "assets/shots/cambridge-battlecode.jpg", fit: "contain", bg: "#fff", href: "https://battlecode.cam/" },
     { name: "Slime.io", blurb: "• Top-down action game in Python and Pygame — play a slime fighting off waves of skeletons and snakes\n• Card-driven ability system: attack, heal, shield, speed, ghost, and scatter cards are drawn and slotted into an abilities bar\n• Hand-rolled engine work — sprite-sheet animation, collision with obstacles, health and stamina bars, enemy pathing, and score tracking", media: "https://youtu.be/4pxGn5--yfc", href: "https://github.com/BestCody/Slime.io" },
     { name: "Connect4 AI", blurb: "• Connect 4 engine that plays through minimax search with alpha-beta pruning\n• Selectable search depth trades strength against speed, from a quick 2-ply look-ahead up to 7 plies (~800k states)\n• Node/Express backend serving the decision engine to a browser front end that visualises the search", media: "assets/shots/connect4.png", site: "https://connectfourai.vercel.app/", href: "https://github.com/BestCody/Connect4-AI" },
     { name: "FRC Scouting Website", blurb: "• Scouting platform for FRC robotics competitions — the team logs match performance in the stands and reviews it before alliance selection\n• HTML/JS front end backed by PHP endpoints that write and query a MySQL database", media: "assets/shots/frc-scouting.png", pos: "top", site: "https://frc1334-scouting.vercel.app/", href: "https://github.com/BestCody/FRC-Scouting-Website" },
     { name: "Chaotic Typing Game", blurb: "• Browser typing game where the interface fights back — the page animates and distorts as you type\n• 90-second run with a live word counter\n• Vanilla JavaScript split into animation, timer, and word-tracking modules", media: "assets/shots/chaotic-typing.png", site: "https://chaotic-typing-game.vercel.app/", href: "https://github.com/BestCody/Chaotic-Typing-Game" },
   ],

  honors: [
    { year: "2026", title: "USACO Gold",       issuer: "Top 10% on USACO" },
    { year: "2026", title: "Codeforces Expert",      issuer: "Top 10% on Codeforces" },
    { year: "2026", title: "Best Use of Solana",      issuer: "Won out of 60+ Projects @ Jamhacks" },
    { year: "2026", title: "Lloyd Auckland Invitational Math Camp Invitee",  issuer: "One of 90/15000+ people to be invited from Canadian Senior Mathematics Competition" },
    { year: "2024", title: "Beaver Computing Competition Honor Roll",    issuer: "Top 1% on Beaver Computing Competition" },
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
