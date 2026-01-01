// Simple i18n dictionary
const TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_models: "Models",
    nav_technology: "Technology",
    nav_lighting: "Lighting",
    nav_configurator: "Configurator",

    config_title: "Configuration request",
    config_intro:
      "Tell us which model you're interested in, where the aquarium will be, and how you want to use it. We'll get back to you with a tailored recommendation and price indication.",

    config_model_label: "Model",
    config_country_label: "Country",
    config_room_label: "Room / placement",
    config_room_placeholder: "Living room wall, room divider, office, studio...",
    config_usage_label: "How do you plan to use it?",
    config_usage_placeholder:
      "River-style aquascape, high flow fish, biotope layout, etc.",
    config_extras_label: "Extras you are interested in",
    config_extra_ato: "ATO (auto top-off)",
    config_extra_light: "Extra lighting options",
    config_extra_cabinet: "Cabinet / furniture package",
    config_extra_delivery: "Delivery & on-site setup",
    config_email_label: "Email",
    config_email_placeholder: "you@example.com",
    config_submit: "Send request"
  },
  de: {
    nav_home: "Startseite",
    nav_models: "Modelle",
    nav_technology: "Technik",
    nav_lighting: "Beleuchtung",
    nav_configurator: "Konfigurator",

    config_title: "Konfigurationsanfrage",
    config_intro:
      "Sagen Sie uns, welches Modell, wo das Aquarium stehen wird und wie Sie es nutzen möchten. Wir melden uns mit einer Empfehlung und Preisindikation.",

    config_model_label: "Modell",
    config_country_label: "Land",
    config_room_label: "Raum / Platzierung",
    config_room_placeholder:
      "Wohnzimmerwand, Raumteiler, Büro, Studio...",
    config_usage_label: "Wie möchten Sie es nutzen?",
    config_usage_placeholder:
      "River-Style Aquascape, Strömungsliebende Fische, Biotop, etc.",
    config_extras_label: "Optionale Extras",
    config_extra_ato: "ATO (Auto-Nachfüllung)",
    config_extra_light: "Zusätzliche Beleuchtungsoptionen",
    config_extra_cabinet: "Möbel / Unterschrank",
    config_extra_delivery: "Lieferung & Aufbau vor Ort",
    config_email_label: "E-Mail",
    config_email_placeholder: "du@example.com",
    config_submit: "Anfrage senden"
  },
  fr: {
    nav_home: "Accueil",
    nav_models: "Modèles",
    nav_technology: "Technologie",
    nav_lighting: "Éclairage",
    nav_configurator: "Configurateur",

    config_title: "Demande de configuration",
    config_intro:
      "Indiquez-nous le modèle, l’emplacement de l’aquarium et la façon dont vous souhaitez l’utiliser. Nous vous répondrons avec une recommandation et une indication de prix.",

    config_model_label: "Modèle",
    config_country_label: "Pays",
    config_room_label: "Pièce / emplacement",
    config_room_placeholder:
      "Mur du salon, séparation de pièce, bureau, studio...",
    config_usage_label: "Comment prévoyez-vous de l’utiliser ?",
    config_usage_placeholder:
      "Aquascaping style rivière, poissons de courant, biotope, etc.",
    config_extras_label: "Options supplémentaires",
    config_extra_ato: "ATO (remplissage automatique)",
    config_extra_light: "Options d’éclairage supplémentaires",
    config_extra_cabinet: "Meuble / ensemble de mobilier",
    config_extra_delivery: "Livraison & installation sur place",
    config_email_label: "E-mail",
    config_email_placeholder: "vous@example.com",
    config_submit: "Envoyer la demande"
  },
  hu: {
    nav_home: "Főoldal",
    nav_models: "Modellek",
    nav_technology: "Technológia",
    nav_lighting: "Világítás",
    nav_configurator: "Konfigurátor",

    config_title: "Konfigurációs kérés",
    config_intro:
      "Írd meg, melyik modell érdekel, hova kerül az akvárium és hogyan szeretnéd használni. 1–2 munkanapon belül személyre szabott ajánlattal jelentkezünk.",

    config_model_label: "Modell",
    config_country_label: "Ország",
    config_room_label: "Szoba / elhelyezés",
    config_room_placeholder:
      "Nappali fal, szobelosztó, iroda, stúdió...",
    config_usage_label: "Hogyan tervezed használni?",
    config_usage_placeholder:
      "Folyóvizes aquascape, erős áramlást kedvelő halak, biotóp, stb.",
    config_extras_label: "Érdeklődöm ezek iránt",
    config_extra_ato: "ATO (automata vízutántöltő)",
    config_extra_light: "Extra világítási opciók",
    config_extra_cabinet: "Bútor / szekrény csomag",
    config_extra_delivery: "Szállítás & helyszíni telepítés",
    config_email_label: "Email",
    config_email_placeholder: "te@example.com",
    config_submit: "Kérés elküldése"
  }
};

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const t = dict[key];
    if (!t) return;

    const tag = el.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea") {
      if ("placeholder" in el) {
        el.placeholder = t;
      }
    } else {
      el.textContent = t;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // default language
  applyLanguage("en");

  // language switching buttons (EN / DE / FR / HU)
  const langContainer = document.querySelector(".rw-lang");
  if (langContainer) {
    langContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-lang]");
      if (!btn) return;
      const lang = btn.dataset.lang;

      langContainer
        .querySelectorAll("button[data-lang]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyLanguage(lang);
    });
  }

   // configurator submit -> open email with pre-filled body
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

      alert("Thank you! Your configuration request is being prepared as an email.");

      const target = "ipkobalint@gmail.com";
      const subject = encodeURIComponent("Configuration request");
      const bodyLines = [
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

