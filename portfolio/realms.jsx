/* ===========================================================================
   realms.jsx — the content sections
   Exports to window: Cover, EndScene
   =========================================================================== */

/* SVG icon paths for contact links */
const CONTACT_ICONS = {
  mail: (
    <React.Fragment>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </React.Fragment>
  ),
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  ),
  linkedin: (
    <React.Fragment>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </React.Fragment>
  ),
  instagram: (
    <React.Fragment>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </React.Fragment>
  ),
};

function Cover() {
  const PF = window.PF;
  const parts = PF.name.split(" ");
  const first = parts.slice(0, -1).join(" ");
  const last = parts[parts.length - 1];
  const spotRef = useRef(null);
  const frameRef = useRef(null);

  /* soft light that follows cursor inside the framed video */
  useEffect(() => {
    const frame = frameRef.current;
    const spot = spotRef.current;
    if (!frame || !spot) return;
    let raf = 0;
    const onMove = (e) => {
      const r = frame.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 100;
      const y = (e.clientY - r.top) / r.height * 100;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        spot.style.setProperty("--mx", x + "%");
        spot.style.setProperty("--my", y + "%");
        spot.classList.add("lit");
        raf = 0;
      });
    };
    const onLeave = () => spot.classList.remove("lit");
    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerleave", onLeave);
    return () => {
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="tale" className="landing" data-screen-label="Landing">
      <Reveal scale className="lz-hero">
        <div ref={frameRef} className="lz-frame">
          <video src="assets/cover.mp4" autoPlay muted loop playsInline preload="auto" />
          <div className="lz-frame-veil" />
          <div ref={spotRef} className="cursor-spot" />
        </div>
        <div className="lz-id">
          <div className="kicker">{PF.kicker}</div>
          <h1 className="lz-name">{first} <em>{last}</em></h1>
          <div className="lz-title">{PF.title}</div>
          <p className="lz-tag">{PF.tagline}</p>
        </div>
      </Reveal>

      <div className="lz-cols">
        {/* Experiences column */}
        <Reveal className="lz-col panel-dark" delay={0.04}>
          <div className="lz-col-title">Experiences</div>
          <div className="lz-rule" />
          {PF.quests.map((e, i) => (
            <div className="lz-exp" key={i}>
              <div className="lz-exp-role">{e.role}</div>
              <div className="lz-exp-meta">
                <span className="lz-exp-org">{e.org}</span>
                <span className="lz-exp-dates">{e.dates}</span>
              </div>
              <p className="lz-exp-desc">{e.desc}</p>
            </div>
          ))}
        </Reveal>

        {/* Projects column */}
        <Reveal className="lz-col panel-dark" delay={0.10}>
          <div className="lz-col-title">Projects</div>
          <div className="lz-rule" />
          {PF.artifacts.map((p, i) => (
            <div className="lz-proj" key={i}>
              <div className="lz-proj-name"><span className="mk">✦</span>{p.name}</div>
              <p className="lz-proj-blurb">{p.blurb}</p>
            </div>
          ))}
        </Reveal>

        {/* Awards column */}
        <Reveal className="lz-col panel-dark" delay={0.16}>
          <div className="lz-col-title">Awards</div>
          <div className="lz-rule" />
          {PF.honors.map((a, i) => (
            <div className="lz-award" key={i}>
              <div className="lz-seal">{a.year}</div>
              <div>
                <div className="lz-aw-title">{a.title}</div>
                <div className="lz-aw-issuer">{a.issuer}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <a className="lz-hint" href="#end">
        Contacts<span className="arrow">↓</span>
      </a>
    </section>
  );
}

function EndScene() {
  const PF = window.PF;
  return (
    <Realm id="end" className="end" bg="assets/garden.jpg" rate={60}
      veil={["top", "bottom"]} clouds={{ count: 3, zone: [2, 22], seed: 6 }} dataLabel="The End">
      <div className="realm-inner">
        <Reveal as="h2" className="end-title">Contacts</Reveal>
        <Reveal className="end-sub" delay={0.05}>
          Have a project you want to collaborate on? Send a raven.
        </Reveal>
        <Reveal className="contact" delay={0.10}>
          {PF.contact.map((c, i) => (
            <a href={c.href} key={i} title={c.label} aria-label={c.label}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {CONTACT_ICONS[c.icon]}
              </svg>
            </a>
          ))}
        </Reveal>
        <div className="colophon">Made with love — By Hanze Lou</div>
      </div>
    </Realm>
  );
}

Object.assign(window, { Cover, EndScene });
