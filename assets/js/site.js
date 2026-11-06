// site.js
// Interactive pieces of the site.

// ---------- Theme toggle ----------
(function () {
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  function systemTheme() {
    return media.matches ? "dark" : "light";
  }

  // A saved choice wins; otherwise follow the system.
  function currentTheme() {
    return root.getAttribute("data-theme") || systemTheme();
  }

  function save(theme) {
    try {
      if (theme) localStorage.setItem("theme", theme);
      else localStorage.removeItem("theme");
    } catch (e) {
      // Storage blocked: the switch still works for this page view.
    }
  }

  // The label names what the button will do next.
  function updateLabel() {
    var label = currentTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme";
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  }

  toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";

    if (next === systemTheme()) {
      // Back to matching the system: forget the saved choice so the
      // site keeps following the system from now on.
      root.removeAttribute("data-theme");
      save(null);
    } else {
      root.setAttribute("data-theme", next);
      save(next);
    }
    updateLabel();
  });

  // If the system switches (e.g. macOS auto dark mode at night),
  // keep the button's label accurate.
  media.addEventListener("change", updateLabel);

  updateLabel();
})();
