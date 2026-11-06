// theme-init.js
// Loads in <head> before the page is drawn, so a saved theme
// is applied immediately with no flash of the wrong colors.
(function () {
  var root = document.documentElement;

  // Lets CSS know JavaScript is running (used to show the toggle).
  root.classList.add("js");

  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      root.setAttribute("data-theme", saved);
    }
  } catch (e) {
    // Storage blocked (private browsing, strict settings):
    // nothing saved, so the site just follows the system.
  }
})();
