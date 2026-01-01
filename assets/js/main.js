document.addEventListener("DOMContentLoaded", () => {
  // ----- SIMPLE TRANSLATION SYSTEM -----
  const translations = {
    en: {
      nav_home: "Home",
      nav_models: "Models",
      nav_technology: "Technology",
      nav_lighting: "Lighting",
      nav_configurator: "Configurator",

      config_title: "Configuration request",
      config_intro:
        "Tell us which model you’re interested in, where the aquarium will be, and how you plan to use it. We’ll get back to you with a tailored recommendation and price indication.",

      config_model_label: "Model",
      config_country_label: "Country",
      config_room_label: "Room / placement",
      config_room_placeholder: "Living room wall, room divider, office, studio…",

      config_usage_header: "Usage & contact",
      config_usage_label: "How do you plan to use it?",
      config_usage_placeholder:
        "River-style aquascape, high flow fish, biotope layout, etc.",
      config_extras_label: "Extras you are interested in",
      config_email_label: "Email",
      config_email_placeholder: "you@example.com",
      config_submit: "Send request",

      config_extra_ato: "ATO (auto top-off)",
      config_extra_lighting: "Extra lighting options",
      config_extra_cabinet: "Cabinet / furniture package",
      config_extra_delivery: "Delivery & on-site setup",
    },

    de: {
      nav_home: "Startseite",
      nav_models: "Modelle",
      nav_technology: "Technik",
      nav_lighting: "Beleuchtung",
      nav_configurator: "Konfigurator",

      config_title: "Konfigurationsanfrage",
      config_intro:
        "Sagen Sie uns, welches Modell Sie interessiert, wo das Aquarium stehen soll und wie Sie es nutzen möchten. Wir melden uns mit einer Empfehlung und einer Preisindikation.",

      config_model_label: "Modell",
      config_country_label: "Land",
      config_room_label: "Raum / Platzierung",
      config_room_placeholder: "Wohnzimmerwand, Raumteiler, Büro, Studio …",

      config_usage_header: "Nutzung & Kontakt",
      config_usage_label: "Wie möchten Sie es nutzen?",
      config_usage_placeholder:
        "River-Style Aquascape, Strömungsliebende Fische, Biotop, etc.",
      config_extras_label: "Optionale Extras",
      config_email_label: "E-Mail",
      config_email_placeholder: "du@example.com",
      config_submit: "Anfrage senden",

      config_extra_ato: "ATO (automatisches Nachfüllen)",
      config_extra_lighting: "Zusätzliche Beleuchtungsoptionen",
      config_extra_cabinet: "Möbel- / Schrankpaket",
      config_extra_delivery: "Lieferung & Aufbau vor Ort",
    },

    fr: {
      nav_home: "Accueil",
      nav_models: "Modèles",
      nav_technology: "Technologie",
      nav_lighting: "Éclairage",
      nav_configurator: "Configurateur",

      config_title: "Demande de configuration",
      config_intro:
        "Indiquez-nous le modèle, l’emplacement prévu de l’aquarium et la façon dont vous souhaitez l’utiliser. Nous reviendrons vers vous avec une recommandation personnalisée et une indication de prix.",

      config_model_label: "Modèle",
      config_country_label: "Pays",
      config_room_label: "Pièce / emplacement",
      config_room_placeholder: "Mur du salon, séparateur de pièce, bureau, studio…",

      config_usage_header: "Utilisation & contact",
      config_usage_label: "Comment comptez-vous l’utiliser ?",
      config_usage_placeholder:
        "Aquascaping style rivière, poissons de courant, biotope, etc.",
      config_extras_label: "Options supplémentaires",
      config_email_label: "E-mail",
      config_email_placeholder: "vous@example.com",
      config_submit: "Envoyer la demande",

      config_extra_ato: "ATO (remplissage automatique)",
      config_extra_lighting: "Options d’éclairage supplémentaires",
      config_extra_cabinet: "Pack meuble / cabinet",
      config_extra_delivery: "Livraison & installation sur place",
    },

    hu: {
      nav_home: "Főoldal",
      nav_models: "Modellek",
      nav_technology: "Technológia",
      nav_lighting: "Világítás",
      nav_configurator: "Konfigurátor",

      config_title: "Konfigurációs kérés",
      config_intro:
        "Írd meg, melyik modell érdekel, hova kerül az akvárium, és hogyan szeretnéd használni. Válaszként személyre szabott ajánlatot és árbecslést küldünk.",

      config_model_label: "Modell",
      config_country_label: "Ország",
      config_room_label: "Szoba / elhelyezés",
      config_room_placeholder: "Nappali fal, térelválasztó, iroda, stúdió…",

      config_usage_header: "Használat & kapcsolat",
      config_usage_label: "Hogyan szeretnéd használni?",
      config_usage_placeholder:
        "Folyó stílusú aquascape, erős áramlású halak, biotóp, stb.",
      config_extras_label: "Érdeklődsz ezek iránt",
      config_email_label: "E-mail",
      config_email_placeholder: "te@example.com",
      config_submit: "Kérés elküldése",

      config_extra_ato: "ATO (automata vízutántöltő)",
      config_extra_lighting: "Extra világítási opciók",
      config_extra_cabinet: "Bútor / cabinet csomag",
      config_extra_delivery: "Kiszállítás & helyszíni összeszerelés",
    },
  };

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = dict[key];
      if (!text) return;

      const tag = el.tagName.toLowerCase();
      if (
        tag === "input" ||
        tag === "textarea"
      ) {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });

    // aktiv nyelv gomb
    document
      .querySelectorAll(".rw-lang button")
      .forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.querySelector(
      `.rw-lang button[data-lang="${lang}"]`
    );
    if (activeBtn) activeBtn.classList.add("active");
  }

  // ----- LANGUAGE SWITCHING BUTTONS -----
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".rw-lang button");
    if (!btn) return;
    const lang = btn.dataset.lang || "en";
    applyLanguage(lang);
  });

  // alapértelmezett nyelv
  applyLanguage("en");

  // ----- CONFIGURATOR FORM -> MAILTO EMAIL -----
  const configRoot = document.querySelector(".rw-configurator");
  if (configRoot) {
    const form = configRoot.querySelector("form");
    const submitBtn = configRoot.querySelector("button[type='submit']");

    const handler = (e) => {
      if (e) e.preventDefault();

      const model =
        configRoot.querySelector("select")?.value || "";
      const country =
        configRoot.querySelector("select[name='country']")?.value || "";
      const room =
        configRoot.querySelector("input[name='room']")?.value ||
        configRoot.querySelector("input[type='text']")?.value ||
        "";
      const usage =
        configRoot.querySelector("textarea")?.value || "";
      const email =
        configRoot.querySelector("input[type='email']")?.value || "";

      const extras = Array.from(
        configRoot.querySelectorAll(".rw-checkbox-group input[type='checkbox']")
      )
        .filter((ch) => ch.checked)
        .map((ch) => ch.parentElement.textContent.trim())
        .join(", ");

      alert(
        "Thank you! Your configuration request is being prepared as an email."
      );

      const target = "ipkobalint@gmail.com";
      const subject = encodeURIComponent(
        "Configuration request – Riverworks"
      );
      const bodyLines = [
        "Configuration request",
        "",
        "Model: " + model,
        "Country: " + country,
        "Room / placement: " + room,
        "Usage: " + usage,
        "Extras: " + (extras || "--"),
        "Customer email: " + email,
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      const mailtoUrl = `mailto:${target}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      if (form) form.reset();
    };

    if (form) {
      form.addEventListener("submit", handler);
    }
    if (submitBtn) {
      submitBtn.addEventListener("click", handler);
    }
  }
});
