/* ===========================================================================
   app.jsx — nav, scroll state, global effects, and app root
   =========================================================================== */

function Nav() {
  const PF = window.PF;
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("tale");

  useEffect(() => {
    return subscribeScroll(() => {
      setSolid(window.scrollY > window.innerHeight * 0.78);
    });
  }, []);

  useEffect(() => {
    const ids = ["tale", "work", "end"];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.45) setActive(e.target.id);
      });
    }, { threshold: [0.45, 0.6], rootMargin: "-20% 0px -20% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  /* nothing to link to — don't paint an empty bar across the top of the page */
  if (!PF.realms.length) return null;

  return (
    <nav className={`nav ${solid ? "scrolled" : "at-top"}`}>
      <div className="nav-inner">
        <div className="nav-links">
          {PF.realms.map((r) => (
            <a key={r.id} href={"#" + r.id}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(r.id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={active === r.id ? "active" : ""}>{r.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* Soft warm glow that tracks the pointer across the whole page */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, x = window.innerWidth / 2, y = window.innerHeight * 0.4;
    const paint = () => {
      el.style.setProperty("--gx", x + "px");
      el.style.setProperty("--gy", y + "px");
      raf = 0;
    };
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      el.classList.add("on");
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => el.classList.remove("on");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Motes count={28} />
      <div className="grain" />
      <CursorGlow />
      <main className="stage">
        <Cover />
        <Showcase />
        <EndScene />
      </main>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
