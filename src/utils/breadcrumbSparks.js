/* ✦ Golden Aura Breadcrumb Sparks ✦ */
export function attachBreadcrumbSparks(selector = ".breadcrumb-trail a") {
  const links = document.querySelectorAll(selector);

  links.forEach(link => {
    link.addEventListener("mouseenter", () => {
      for (let i = 0; i < 5; i++) {
        const spark = document.createElement("span");
        spark.className = "breadcrumb-spark";
        spark.style.left = "50%";
        spark.style.top = "0";
        spark.style.position = "absolute";
        spark.style.width = "6px";
        spark.style.height = "6px";
        spark.style.borderRadius = "50%";
        spark.style.background = "gold";
        spark.style.pointerEvents = "none";

        // Random trajectory
        const angle = Math.random() * 2 * Math.PI;
        const distance = 20 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        spark.animate(
          [
            { opacity: 1, transform: "translate(0,0) scale(1)" },
            { opacity: 0, transform: `translate(${x}px, ${y}px) scale(0.5)` }
          ],
          { duration: 800, easing: "ease-out", fill: "forwards" }
        );

        link.appendChild(spark);

        // Remove spark after animation
        setTimeout(() => spark.remove(), 800);
      }
    });
  });
}
