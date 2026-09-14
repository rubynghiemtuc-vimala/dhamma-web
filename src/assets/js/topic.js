(function () {
  const cards = Array.from(document.querySelectorAll(".card"));

  function setOpen(card, open) {
    const header = card.querySelector(".card-header");
    const body = card.querySelector(".card-body");
    header.setAttribute("aria-expanded", open ? "true" : "false");
    body.hidden = !open;
  }

  cards.forEach((card) => {
    const header = card.querySelector(".card-header");
    header.addEventListener("click", () => {
      const isOpen = header.getAttribute("aria-expanded") === "true";
      setOpen(card, !isOpen);
    });

    const tabBtns = card.querySelectorAll(".tab-btn");
    const panels = card.querySelectorAll(".tab-panel");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.tab;
        tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
        panels.forEach((p) => {
          p.hidden = p.dataset.panel !== key;
        });
      });
    });

    card.querySelectorAll(".translate-checkbox").forEach((cb) => {
      cb.addEventListener("change", () => {
        const panel = cb.closest(".tab-panel");
        const block = panel.querySelector(".vi-translation");
        block.hidden = !cb.checked;
      });
    });
  });

  const expandBtn = document.getElementById("expand-all");
  const collapseBtn = document.getElementById("collapse-all");
  if (expandBtn) expandBtn.addEventListener("click", () => cards.forEach((c) => setOpen(c, true)));
  if (collapseBtn) collapseBtn.addEventListener("click", () => cards.forEach((c) => setOpen(c, false)));

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", (e) => {
      e.preventDefault();
      const id = chip.dataset.target;
      const card = document.getElementById(id);
      if (!card) return;
      setOpen(card, true);
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const searchInput = document.getElementById("search");
  const countInfo = document.getElementById("count-info");
  if (searchInput) {
    const total = cards.length;
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      let shown = 0;
      cards.forEach((card) => {
        const hay = card.dataset.search || "";
        const match = !q || hay.includes(q);
        card.classList.toggle("hidden-by-search", !match);
        if (match) shown++;
      });
      countInfo.textContent = `Hiển thị ${shown}/${total} mục`;
    });
  }
})();
