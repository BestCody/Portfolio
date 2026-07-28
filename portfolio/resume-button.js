(() => {
  const addResumeButton = () => {
    const tagline = document.querySelector(".lz-id .lz-tag");
    if (!tagline || document.querySelector(".hero-resume-button")) return false;

    const link = document.createElement("a");
    link.className = "hero-resume-button";
    link.href = "resume.html";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "View Hanze Lou's resume");
    link.innerHTML = 'View Resume <span aria-hidden="true">↗</span>';
    tagline.insertAdjacentElement("afterend", link);
    return true;
  };

  if (addResumeButton()) return;

  const observer = new MutationObserver(() => {
    if (addResumeButton()) observer.disconnect();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
