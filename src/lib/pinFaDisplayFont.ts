/**
 * Fontara (a Persian font-changer extension) walks the page and writes
 * `font-family: var(--fontara-font), … !important` onto text nodes. That
 * inline priority beats the Abar rule in rtl.css, so titles render in
 * whatever face the extension selected (usually Estedad).
 *
 * The extension skips a node that already carries an author inline
 * `font-family`. Pinning Abar on Persian headings is that signal.
 * Called from LocalizedApp in src/App.tsx while locale is "fa".
 */
const DISPLAY_FONT = '"Abar", "Cinzel", "Estedad", "Tahoma", serif';
const HEADING_SELECTOR = "h1, h2, h3, h4";

function pinElement(node: HTMLElement) {
  const current = node.style.getPropertyValue("font-family");
  if (current.includes("Abar") && !/fontara/i.test(current)) return;
  node.style.setProperty("font-family", DISPLAY_FONT, "important");
}

function pinHeading(heading: Element) {
  if (!(heading instanceof HTMLElement)) return;
  pinElement(heading);
  heading.querySelectorAll("*").forEach((child) => {
    if (child instanceof HTMLElement) pinElement(child);
  });
}

export function pinPersianTitleFont(root: ParentNode = document) {
  const pin = () => {
    root.querySelectorAll(HEADING_SELECTOR).forEach(pinHeading);
  };

  pin();

  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      pin();
    });
  };

  const observer = new MutationObserver(schedule);
  const target = root instanceof Document ? root.body : root;
  if (target) {
    observer.observe(target, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style"],
    });
  }

  return () => {
    if (frame) cancelAnimationFrame(frame);
    observer.disconnect();
    root.querySelectorAll(HEADING_SELECTOR).forEach((heading) => {
      if (!(heading instanceof HTMLElement)) return;
      const nodes = [heading, ...heading.querySelectorAll("*")];
      nodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (!node.style.getPropertyValue("font-family").includes("Abar")) return;
        node.style.removeProperty("font-family");
      });
    });
  };
}
