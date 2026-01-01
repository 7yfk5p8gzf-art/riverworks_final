document.addEventListener("DOMContentLoaded", () => {
  // ----- ALAPÉRTELMEZETT NYELV -----
  applyLanguage("en");

  // ----- NYELVVÁLTÓ GOMBOK -----
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".rw-lang button");
    if (!btn) return;

    const lang = btn.dataset.lang || "en";
    const langContainer = document.querySelector(".rw-lang");

    if (langContainer) {
      langContainer
        .querySelectorAll("button[data-lang]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }

    applyLanguage(lang);
  });

  // ----- CONFIGURATOR FORM -> GOOGLE APPS SCRIPT -----
  const configRoot = document.querySelector(".rw-configurator");

  if (configRoot) {
    const form = configRoot.querySelector("form");
    const submitBtn = configRoot.querySelector('button[type="submit"]');

    // IDE a /exec végű webalkalmazás URL
    const ENDPOINT_URL =
      "https://script.google.com/macros/s/AKfycbw4ffBFtInPEdP1tQdb1Jv8ZFP4iKY4QPQ25I_BC0380TIAJ6tzZGV22pmgRhpJA/exec";

    const handler = async (e) => {
      if (e) e.preventDefault();

      const model =
        configRoot.querySelector("select")?.value || "";

      const country =
        configRoot.querySelector('select[name="country"]')?.value || "";

      const roomInput =
        configRoot.querySelector('input[name="room"]') ||
        configRoot.querySelector('input[type="text"]');
      const room = roomInput ? roomInput.value : "";

      const usage =
        configRoot.querySelector("textarea")?.value || "";

      const email =
        configRoot.querySelector('input[type="email"]')?.value || "";

      const extras = Array.from(
        configRoot.querySelectorAll(
          ".rw-checkbox-group input[type='checkbox']"
        )
      )
        .filter((ch) => ch.checked)
        .map((ch) => ch.parentElement.textContent.trim())
        .join(", ");

      // minimális ellenőrzés
      if (!email) {
        alert("Please enter your email address.");
        return;
      }

      // POST payload a Google Apps Scriptnek
      const payload = new URLSearchParams();
      payload.append("model", model);
      payload.append("country", country);
      payload.append("room", room);
      payload.append("usage", usage);
      payload.append("extras", extras);
      payload.append("email", email);

      try {
        await fetch(ENDPOINT_URL, {
          method: "POST",
          body: payload,
        });

        alert(
          "Thank you! Your configuration has been sent.\n" +
            "Please check your inbox – we’ve also sent you a confirmation email."
        );

        if (form) form.reset();
      } catch (err) {
        console.error(err);
        alert(
          "Something went wrong while sending your request.\n" +
            "Please try again later or contact us at hello@riverworks.ch."
        );
      }
    };

    if (form) {
      form.addEventListener("submit", handler);
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", handler);
    }
  }
}); // <-- EZ ZÁRJA LE A DOMCONTENTLOADED-ET
