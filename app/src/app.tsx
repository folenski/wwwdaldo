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
 */

/** @tsx h */
import { h } from "preact";
import { render } from "preact";
import { Contact } from "./modules/Contact";
import { Reveal } from "fski-reveal";
import { Message } from "./model/message";
import { ISlider } from "./components/iSlider";
import { IOver } from "./components/iOver";
import { CanIuse } from "./services/canIuse";
import { MyHeading } from "./components/myHeading";
import { Block } from "./components/block";
import { Config } from "./cfg/config.app";
import { MessageService } from "./services/message.service";

const msgGateway = new MessageService(Config.endpointMsg);
let supAvif = true;

const cbMessage = async (form: HTMLFormElement): Promise<string> => {
  const data: Message = { name: "", mail: "", message: "" };
  const fields: Array<keyof Message> = ["mail", "name", "subject", "message"];
  fields.forEach((f) => {
    const item = form.elements.namedItem(f);
    if (
      item instanceof HTMLInputElement ||
      item instanceof HTMLTextAreaElement
    ) {
      data[f] = item.value;
    }
  });
  const answer = await msgGateway.post(data);
  if (answer == 0) return "Thank you";
  return "Sorry something was wrong, please try later";
};

// Gestion du formulaire de Contact
Contact.bind(cbMessage);
// Animation du DOM avec l'attribut data-reveal
Reveal.bind();

CanIuse.hasAvif(Config.imgTest).then((isSupported) => {
  if (!isSupported) {
    supAvif = false;
    console.log("AVIF is NOT supported.");
  }
});

const composants = document.querySelectorAll(
  "[data-component]"
) as NodeListOf<HTMLDivElement>;

composants.forEach((div) => {
  const prefUri = div.dataset?.uri || "";
  const alt = div.dataset?.alt || "";
  const effect = div.dataset?.effect || "";
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
          txts={textes}
          imgs={images}
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
  }
});
