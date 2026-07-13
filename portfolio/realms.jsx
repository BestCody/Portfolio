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

  /* soft light that follows cursor anywhere on the page, projected into the framed video */
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
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
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

      <a className="lz-hint" href="#work"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("work");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}>
        Projects<span className="arrow">↓</span>
      </a>
    </section>
  );
}

/* ===========================================================================
   Showcase — a sticky "photo booth". Scrolling develops one Polaroid per
   experience / project / award and drops it on top of the growing pile.
   =========================================================================== */

/* how far you scroll (in vh) to develop each card, and how much lead-in the
   very first card gets so it flies in rather than starting already landed */
const DECK_STEP = 62;
const DECK_LEAD = 0.9;

const pad2 = (n) => String(n).padStart(2, "0");
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* how small a card is while it's still a print sliding out of the camera slot */
const EJECT_SCALE = 0.16;

/* Timeline of one card's print phase, as a fraction of it (t goes 0 -> 1):
     0    .. 0.14  card sits hidden inside the camera; the PREVIOUS card is landing
     0.14           the shutter fires  <- SHUTTER_AT
     0.16 .. 0.46  the paper feeds out of the slot
     0.44 .. 1     it sails across and settles on the pile
   Keeping the shutter off 0 matters: t=0 is the exact instant the previous card lands,
   so flashing there reads as "flash when the last animation finished" instead of
   "flash as this photo comes out". */
const SHUTTER_AT = 0.14;
const clamp01 = (v) => Math.max(0, Math.min(1, v));

/* Where card `i` sits given how far the pile has advanced past it.
   pos < -1 : still inside the camera.  pos in [-1,0] : printing — the card slides out
   of the slot at print size, then sails across to the pile, growing as it goes.
   pos > 0 : buried under newer prints.
   `dx`/`dy` are the offsets from the pile's centre to the camera slot (the camera sits
   up and to the right of the pile), and `h` is the card's height. */
function polaroidPose(pos, rest, dx, dy, h) {
  if (pos <= -1) return { o: 0, dim: 0, t: `translate3d(${dx}px, ${dy}px, 0) scale(${EJECT_SCALE})` };
  if (pos < 0) {
    const t = pos + 1;
    const out = easeOut(clamp01((t - 0.16) / 0.30));  // paper feeding out of the slot
    const fly = easeOut(clamp01((t - 0.44) / 0.56));  // print sailing down onto the pile
    const print = h * EJECT_SCALE;
    const tucked = dy - print / 2 + 4;                     // still up inside the camera body
    const clear = dy + print / 2;                          // fully out of the slot
    const y = (tucked + (clear - tucked) * out) * (1 - fly);
    const x = dx * (1 - fly);
    return {
      o: 1,
      dim: 0,
      t: `translate3d(${x}px, ${y}px, 0) rotate(${rest * fly + (1 - fly) * 4}deg) scale(${EJECT_SCALE + (1 - EJECT_SCALE) * fly})`,
    };
  }
  const d = Math.min(pos, 4.2);
  return {
    o: pos > 2.6 ? Math.max(0, 1 - (pos - 2.6) / 1.2) : 1,
    dim: Math.min(0.62, d * 0.2),
    t: `translate3d(${rest * 3.4 * d}px, ${-d * 11}px, 0) rotate(${rest * (1 + d * 0.5)}deg) scale(${1 - d * 0.05})`,
  };
}

function Camera({ camRef, burstRef }) {
  return (
    <div className="cam" ref={camRef} aria-hidden="true">
      <img className="cam-img" src="assets/camera.png" alt="" />
      {/* the flash itself, pinned to the lens and sitting on top of the camera body.
          Opacity is driven from JS, not a CSS animation — see fire() in Showcase. */}
      <div className="cam-burst" ref={burstRef}>
        <img className="cam-star" src="assets/flash.png" alt="" />
      </div>
    </div>
  );
}

function Showcase() {
  const PF = window.PF;

  /* the roll of film: one print per project */
  const items = useMemo(
    () => PF.artifacts.map((p) => ({ title: p.name, body: p.blurb, href: p.href })),
    []
  );
  const N = items.length;

  /* stable, seeded resting tilt so the pile looks hand-dropped, not machine-stacked */
  const tilts = useMemo(() => {
    const rnd = mulberry(23);
    return items.map(() => (rnd() * 2 - 1) * 2.6);
  }, [N]);

  const secRef = useRef(null);
  const stickyRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const camRef = useRef(null);
  const burstRef = useRef(null);
  const washRef = useRef(null);
  const [cur, setCur] = useState(0);
  /* -1 = nothing printed yet, so the first card's shutter still fires on the way in */
  const [shot, setShot] = useState(-1);

  /* geometry the pose maths needs: where the camera's slot sits relative to the centre of
     the pile, and how tall each card is. Cached — measuring per frame would thrash layout. */
  const geo = useRef({ dx: 300, dy: -260, h: [] });
  useEffect(() => {
    const measure = () => {
      const cam = camRef.current, stage = stageRef.current;
      if (!cam || !stage) return;
      const c = cam.getBoundingClientRect();
      /* the stage is inset from the right, so its centre IS the pile's centre — and unlike
         a card it carries no transform, so it's safe to measure */
      const s = stage.getBoundingClientRect();
      geo.current.dx = (c.left + c.width / 2) - (s.left + s.width / 2);
      geo.current.dy = (c.top + c.height * 0.9) - (s.top + s.height / 2);
      geo.current.h = cardRefs.current.map((el) => (el ? el.offsetHeight : 380));
    };
    measure();
    /* card heights shift once the webfonts land */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [N]);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const span = N - 1 + DECK_LEAD;
    return subscribeScroll((vh) => {
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const range = Math.max(1, sec.offsetHeight - vh);
      const p = Math.max(0, Math.min(1, (window.scrollY - top) / range));
      const raw = p * span - DECK_LEAD;
      const { dx, dy, h } = geo.current;

      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const pose = polaroidPose(raw - i, tilts[i], dx, dy, h[i] || 380);
        el.style.transform = pose.t;
        el.style.opacity = pose.o;
        el.style.visibility = pose.o <= 0.01 ? "hidden" : "visible";
        el.style.setProperty("--dim", pose.dim);
      }
      /* Card i's shutter goes off once its print phase reaches SHUTTER_AT, i.e. once
         raw >= i - 1 + SHUTTER_AT. Left un-clamped at the bottom so the very first
         print gets a shutter too, rather than starting life already flashed. */
      setShot(Math.min(N - 1, Math.floor(raw + 1 - SHUTTER_AT)));
      setCur(Math.max(0, Math.min(N - 1, Math.floor(raw + 0.25))));
    });
  }, [N]);

  /* Fire the shutter the instant a new print starts feeding out of the slot.
     The flash is popped on and faded out from JS rather than run as a CSS @keyframes:
     a keyframes animation gets suppressed by `prefers-reduced-motion: reduce`, which
     would leave anyone with that OS setting on never seeing the flash at all. A brief
     opacity blip is light, not motion, so it's safe to keep for everyone. */
  const lastShot = useRef(-1);
  useEffect(() => {
    const prev = lastShot.current;
    lastShot.current = shot;

    const lit = [
      [burstRef.current, 1],
      [washRef.current, 0.55],
    ].filter(([el]) => el);
    if (!lit.length) return;

    const fadeOut = () => lit.forEach(([el]) => {
      el.style.transition = "opacity 300ms cubic-bezier(.4, 0, 1, 1)";
      el.style.opacity = "0";
    });

    /* Scrolling back up: the print is feeding back INTO the camera, so no shutter — you
       only flash when taking a picture. Still fade any live flash out, because this
       effect's cleanup has already cancelled the timer that would have done it. */
    if (shot <= prev) { fadeOut(); return; }

    lit.forEach(([el, peak]) => {
      el.style.transition = "none";
      el.style.opacity = String(peak);
    });
    void lit[0][0].offsetWidth;

    /* hold the pop for a beat, then let it fall off */
    const hold = setTimeout(fadeOut, 70);

    /* the camera body's recoil IS motion, so that one stays gated in CSS */
    const sticky = stickyRef.current;
    if (sticky) {
      sticky.classList.remove("snap");
      void sticky.offsetWidth;
      sticky.classList.add("snap");
    }
    const done = setTimeout(() => sticky && sticky.classList.remove("snap"), 800);

    return () => { clearTimeout(hold); clearTimeout(done); };
  }, [shot]);

  return (
    <section
      ref={secRef}
      id="work"
      className="deck"
      data-screen-label="Projects"
      style={{ height: `calc(100vh + ${(N - 1 + DECK_LEAD) * DECK_STEP}vh)` }}
    >
      <div className="deck-sticky" ref={stickyRef}>
        <div className="deck-flash" ref={washRef} aria-hidden="true" />
        <div className="deck-board">
          <Camera camRef={camRef} burstRef={burstRef} />

          <div className="deck-stage" ref={stageRef}>
            {items.map((it, i) => {
              const Tag = it.href ? "a" : "article";
              const extra = it.href ? { href: it.href, target: "_blank", rel: "noopener noreferrer" } : {};
              return (
                <Tag
                  key={i}
                  {...extra}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="pol pol-proj"
                  style={{ zIndex: i + 1, pointerEvents: i === cur ? "auto" : "none" }}
                  aria-hidden={i === cur ? undefined : "true"}
                >
                  <div className="pol-photo">
                    <h3 className="pol-title">{it.title}</h3>
                    <p className="pol-body">{it.body}</p>
                  </div>
                  <div className="pol-caption">
                    <span className="pol-hand">{it.href ? "open the repo →" : ""}</span>
                    <span className="pol-frame-no">{pad2(i + 1)} / {pad2(N)}</span>
                  </div>
                </Tag>
              );
            })}
          </div>

          <div className="deck-foot">
            {/* nothing left in the roll once the last print has landed */}
            <div className={`deck-hint ${cur >= N - 1 ? "spent" : ""}`}>keep scrolling to develop the next shot</div>
          </div>
        </div>
      </div>
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
             <a 
               href={c.href} 
               key={i} 
               title={c.label} 
               aria-label={c.label}
               target={c.target}
               rel={c.target === "_blank" ? "noopener noreferrer" : undefined}
             >
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

Object.assign(window, { Cover, Showcase, EndScene });
