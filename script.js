document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".course");

  // Bloquea los cursos que tienen requisitos
  cursos.forEach(btn => {
    const req = btn.dataset.prereq;
    if (req && req.trim() !== "") btn.classList.add("locked");
  });

  // Al hacer clic en un curso
  cursos.forEach(btn => btn.addEventListener("click", () => {
    if (btn.classList.contains("locked")) return;     // Si está bloqueado, no hace nada
    if (btn.classList.contains("approved")) return;   // Si ya está aprobado, no repite

    // Marcar como aprobado
    btn.classList.add("approved");

    // Buscar cursos dependientes y actualizar
    cursos.forEach(dest => {
      const prereqs = dest.dataset.prereq?.split(",").map(s => s.trim()) || [];
      if (!prereqs.length) return;

      const idx = prereqs.indexOf(btn.id);
      if (idx > -1) {
        prereqs.splice(idx, 1);
        dest.dataset.prereq = prereqs.join(",");
        if (prereqs.length === 0) {
          dest.classList.remove("locked");
          dest.classList.add("unlocked");
        }
      }
    });
  }));
});
