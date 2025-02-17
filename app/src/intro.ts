/**
 * Intro pour le site Daldo Marte
 * en JS car c'est un module externe et ca ne présente pas d'interêt de le re ecrire en TS
 * @author folenski
 *
 * @since 22/12/2020 - version initiale
 * @since 20/11/2023 - reécriture en TS
 *
 */
import { gsap } from "gsap";

/**
 * Timeline GSAP pour le site de Daldo Marte
 * @returns void
 */
const introScene = () => {
  const TL = gsap.timeline();

  TL.set(".container-first", { opacity: 1 })
    .from(
      ".container-first h1 span",
      { duration: 1, top: -100, opacity: 0, ease: "power2.out", stagger: 0.5 },
      "+=0.5"
    )
    .from(
      ".container-first h2 span",
      { duration: 1, top: -50, opacity: 0, ease: "power2.out", stagger: 0.3 },
      "-=1"
    )
    .from(".container-btns", {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.out"
    })
    .from(
      ".logo",
      { duration: 1, transform: "scale(0)", ease: "power2.out" },
      "-=1.5"
    )
    .from(
      ".bulle",
      { duration: 1, right: -200, ease: "power2.out", stagger: 0.3 },
      "-=2"
    );

  return TL;
};

const TLIntro = gsap.timeline({ paused: true });
TLIntro.add(introScene());
window.addEventListener("load", () => {
  TLIntro.play();
});
