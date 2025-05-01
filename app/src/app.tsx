/**
 * JS pour le site Daldo Marte
 * @author folenski
 *
 * @since 22/12/2020 - version initiale
 * @since 12/02/2020 - Version sans jquery
 * @since 04/12/2021 - utilisation du paquet fski-reveal
 * @since 07/12/2022 - supression de VideoAutoplay
 * @since 23/08/2022 - Ré-écriture en TS
 * @since 11/02/2025 - Ajout d'un composant iSlider
 * @since 01/03/2025 - Ajout du composant News
 *
 */

/** @tsx h */
import { h } from "preact";
import { render } from "preact";
import { Reveal } from "fski-reveal";
import { ISlider } from "./components/Slider/iSlider";
import { IOver } from "./components/iOver";
import { CanIuse } from "./services/canIuse";
import { MyHeading } from "./components/heading/myHeading";
import { Contact } from "./components/contact/contact";
import { Block } from "./components/block";
import { DisplayNews } from "./components/news/displaynews";
import { Config } from "./cfg/config.app";

let supAvif = true;

const Str2Tab = (str: string, separator: string): string[] => {
  const tab = [];
  str.split(separator).map((txt) => {
    tab.push(txt);
  });
  return tab;
};

// Animation du DOM avec l'attribut data-reveal
Reveal.bind();

CanIuse.hasAvif(Config.imgTest).then((isSupported) => {
  if (!isSupported) {
    supAvif = false;
    console.log("AVIF is NOT supported.");
  }
});

const contact = document.getElementById(Config.Contact.id);
if (contact) {
  render(<Contact />, contact);
}

const composants = document.querySelectorAll(
  "[data-component]"
) as NodeListOf<HTMLDivElement>;

composants.forEach((div) => {
  const prefUri = div.dataset?.uri || "";
  const alt = div.dataset?.alt || "";
  const effect = div.dataset?.effect || "slides";
  const pbclasses = div.dataset?.classes || ""; // mandatory
  const pbtimer = div.dataset?.timer || ""; // optional, 10s by default
  let images = div.dataset?.images || ""; // mandatory
  const textes = div.dataset?.texts || ""; // optional
  const sAvif = div.dataset?.avif === "true" ? true : false; // optional
  const timer = Number(div.dataset?.timer) || 1000; // optional
  const displayCtrl = div.dataset?.control === "true" ? true : false; // optional
  let imageSrc = div.dataset?.src || ""; // mandatory
  const iAvif = div.dataset?.avif || "false"; // optional

  const component = div.dataset.component?.toLowerCase() || "";
  div.innerText = "";

  switch (component) {
    case "myd":
      render(<MyHeading />, document.body);
      break;

    case "block":
      render(<Block classes={pbclasses} timer={pbtimer} />, div);
      break;

    case "islider":
      if (sAvif && supAvif) {
        images = images.replace(/\.jpg/g, ".avif");
      }


      render(
        <ISlider
          url={prefUri}
          txts={Str2Tab(textes, "|") }
          imgs={Str2Tab(images, "|") }
          alt={alt}
          timer={timer}
          control={displayCtrl}
          effect={effect}
        />,
        div
      );
      break;
    case "iover":
      if (iAvif === "true" && supAvif) {
        imageSrc = imageSrc.replace(".jpg", ".avif");
      }

      render(<IOver alt={alt} image={imageSrc} effect={effect} />, div);
      break;
    case "news":
      render(<DisplayNews />, div);
      break;
  }
});