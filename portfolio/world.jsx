/* ===========================================================================
   world.jsx — atmosphere + scroll engine
   Exports to window: Realm, Clouds, Motes, Rays, Reveal, useReveal
   =========================================================================== */
const { useRef, useEffect, useMemo, useState, useCallback } = React;

/* ---- one shared scroll loop (rAF-throttled) -------------------------- */
const _scrollSubs = new Set();
let _ticking = false;
function _onScroll() {
  if (_ticking) return;
  _ticking = true;
  requestAnimationFrame(() => {
    const vh = window.innerHeight;
    _scrollSubs.forEach((fn) => fn(vh));
    _ticking = false;
  });
}
if (typeof window !== "undefined") {
  window.addEventListener("scroll", _onScroll, { passive: true });
  window.addEventListener("resize", _onScroll);
}
function subscribeScroll(fn) {
  _scrollSubs.add(fn);
  fn(window.innerHeight);
  return () => _scrollSubs.delete(fn);
}

/* ---- drifting clouds -------------------------------------------------- */
function Clouds({ count = 5, zone = [4, 46], seed = 0 }) {
  const clouds = useMemo(() => {
    const rnd = mulberry(seed * 1000 + 7);
    return Array.from({ length: count }, () => {
      const w = 130 + rnd() * 230;
      return {
        w, h: w * (0.42 + rnd() * 0.16),
        top: zone[0] + rnd() * (zone[1] - zone[0]),
        dur: 46 + rnd() * 54,
        delay: -rnd() * 90,
        op: 0.5 + rnd() * 0.4,
        blur: 1 + rnd() * 3,
      };
    });
  }, [count, zone[0], zone[1], seed]);
  return (
    <div className="clouds">
      {clouds.map((c, i) => (
        <div key={i} className="cloud" style={{
          width: c.w, height: c.h, top: c.top + "%", left: 0,
          animationDuration: c.dur + "s", animationDelay: c.delay + "s",
          opacity: c.op, filter: `blur(${c.blur}px)`,
        }} />
      ))}
    </div>
  );
}

/* ---- floating pollen / dust motes (global, fixed) -------------------- */
function Motes({ count = 26 }) {
  const motes = useMemo(() => {
    const rnd = mulberry(42);
    return Array.from({ length: count }, () => ({
      left: rnd() * 100,
      bottom: rnd() * 90,
      size: 2 + rnd() * 4.5,
      dur: 8 + rnd() * 11,
      delay: -rnd() * 14,
      dx: (rnd() * 50 - 25) + "px",
    }));
  }, [count]);
  return (
    <div className="motes">
      {motes.map((m, i) => (
        <div key={i} className="mote" style={{
          left: m.left + "%", bottom: m.bottom + "%", width: m.size, height: m.size,
          animationDuration: m.dur + "s", animationDelay: m.delay + "s", "--dx": m.dx,
        }} />
      ))}
    </div>
  );
}

/* ---- volumetric light rays ------------------------------------------- */
function Rays({ positions = [16, 38, 62, 84], angle = 14 }) {
  return (
    <div className="rays">
      {positions.map((l, i) => (
        <div key={i} className="ray" style={{
          left: l + "%", transform: `rotate(${angle}deg)`,
          animationDelay: -i * 1.4 + "s",
        }} />
      ))}
    </div>
  );
}

/* ---- scroll reveal ---------------------------------------------------- */
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}
function Reveal({ children, className = "", delay = 0, scale = false, as = "div", style = {}, ...rest }) {
  const ref = useReveal();
  const Tag = as;
  return (
    <Tag ref={ref} className={`${scale ? "reveal-scale" : "reveal"} ${className}`}
      style={{ "--d": delay + "s", ...style }} {...rest}>
      {children}
    </Tag>
  );
}

/* ---- a Realm (section) with parallax backdrop ------------------------ */
function Realm({ id, bg, video, rate = 80, scale = 1.05, className = "", veil = "bottom",
                 clouds = null, rays = null, children, dataLabel }) {
  const secRef = useRef(null);
  const bgRef = useRef(null);
  useEffect(() => {
    const sec = secRef.current, layer = bgRef.current;
    if (!sec || !layer) return;
    return subscribeScroll((vh) => {
      const r = sec.getBoundingClientRect();
      const elCenter = r.top + r.height / 2;
      const p = (elCenter - vh / 2) / vh;
      const ty = Math.max(-rate, Math.min(rate, p * rate));
      layer.style.transform = `translateY(${ty}px) scale(${scale})`;
    });
  }, [rate, scale]);

  const veils = Array.isArray(veil) ? veil : [veil];
  return (
    <section ref={secRef} id={id} className={`realm ${className}`} data-screen-label={dataLabel || id}>
      {video && (
        <React.Fragment>
          <video ref={bgRef} className="realm-bg realm-video" src={video}
            autoPlay muted loop playsInline preload="auto" />
          <div className="realm-video-veil" />
        </React.Fragment>
      )}
      {!video && bg && <div ref={bgRef} className="realm-bg" style={{ backgroundImage: `url(${bg})` }} />}
      {veils.includes("left") && <div className="veil-l" />}
      {veils.includes("right") && <div className="veil-r" />}
      {veils.includes("top") && <div className="veil-top" />}
      {veils.includes("bottom") && <div className="veil-bottom" />}
      {clouds && <Clouds {...clouds} />}
      {rays && <Rays {...rays} />}
      {children}
    </section>
  );
}

/* tiny seeded PRNG so layouts are stable across renders */
function mulberry(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

Object.assign(window, { Realm, Clouds, Motes, Rays, Reveal, useReveal, subscribeScroll });
