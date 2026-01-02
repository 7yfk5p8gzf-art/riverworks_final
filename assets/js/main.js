// Riverworks main JS
// - egyszerű nyelvváltó (csak gombok aktív állapota + <html lang>)
// - konfigurátor űrlap -> Google Apps Script + automata válasz

document.addEventListener("DOMContentLoaded", () => {
  // ----- LANGUAGE SWITCHING BUTTONS -----
  const langButtons = document.querySelectorAll(".rw-lang button");

  if (langButtons.length) {
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang || "en";

        // aktív gomb kiemelés
        langButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // <html lang="..."> beállítás
        document.documentElement.setAttribute("lang", lang);
      });
    });
  }

  // ----- CONFIGURATOR FORM -> GOOGLE APPS SCRIPT -----
  const configRoot = document.querySelector(".rw-configurator");
  if (!configRoot) {
    return;
  }

  const form = configRoot.querySelector("form");
  const submitBtn = configRoot.querySelector('button[type="submit"]');

  // IDE a legutóbb bevezetett /exec URL
  const ENDPOINT_URL =
    "https://script.google.com/macros/s/AKfycbzemOp1Et1X0WLV1_gqdMrWTLqPant2CTyzxTPOYVu0agglRnzTplVLHd1eimUwiRJUaw/exec";

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

    // ezt küldjük a Google Apps Scriptnek
    const payload = {
      model,
      country,
      room,
      usage,
      email,
      extras: extras ? extras.split(", ").map((x) => x.trim()) : [],
    };

    try {
      await fetch(ENDPOINT_URL, {
        method: "POST",
        mode: "no-cors", // így nincs CORS hiba, a választ nem olvassuk vissza
        body: JSON.stringify(payload),
      });

      alert(
        "Thank you! Your configuration has been sent.\n" +
          "Please check your inbox – we've also sent you a confirmation email."
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
});
