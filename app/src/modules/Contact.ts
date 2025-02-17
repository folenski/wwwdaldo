/**
 * Objet pour la gestion un formulaire contact
 * Pour l'utiliser il est nécessaire d'utiliser la méthode bind
 * Contact.bind(...)
 *
 * @since 06/01/2022 - Version initiale
 * @since 13/07/2022 - écriture en TS
 * @since 13/07/2023 - interface overlayParam
 */

import { Config } from "../cfg/config.app";

type FnSubmit = (form: HTMLFormElement) => Promise<string>;

export class Contact {
  private _form: HTMLFormElement;
  private _submit!: FnSubmit;

  private _overlay!: {
    div: HTMLDivElement;
    content: HTMLDivElement;
    txt: HTMLSpanElement;
    btn: HTMLButtonElement;
    toggle: boolean;
  };

  constructor(form: HTMLFormElement, submit: FnSubmit) {
    this._form = form;
    this._submit = submit;

    this.CreateOverlay();
    this._form.addEventListener("submit", this.submitForm);
    this.addOverlay2Form();
  }

  // creation de l'overlay
  CreateOverlay() {
    this._overlay = {
      div: document.createElement("div"),
      content: document.createElement("div"),
      txt: document.createElement("span"),
      btn: document.createElement("button"),
      toggle: false
    };
    this._overlay.div.appendChild(this._overlay.content);
    this._overlay.content.appendChild(this._overlay.txt);
    this._overlay.content.appendChild(document.createElement("br"));
    this._overlay.content.appendChild(this._overlay.btn);
    this._overlay.btn.innerHTML = Config.composantContact.labelOk;
    this._overlay.btn.addEventListener("click", this.handleButton);

    // Stylisation de l'ovelay
    ["form-overlay", "primary"].forEach((c) =>
      this._overlay.div.classList.add(c)
    );
    // Stylisation du bouton
    ["btn", "secondary"].forEach((c) => this._overlay.btn.classList.add(c));

    this._overlay.div.style.cssText =
      "position:absolute; \
       display:none; opacity:0; \
       transition:height 1s ease-out, width 0.8s, opacity 0.2s ease-out";

    this._overlay.content.style.cssText =
      "position:absolute; \
     opacity:0; \
     top:30%; left:50%; \
     transform:translate(-50%, -50%)";

    switch (Config.composantContact.effect) {
      case "top":
        this._overlay.div.style.height = "0px";
        this._overlay.div.style.width = "100%";
        this._overlay.div.style.top = "0";
        break;
      case "left":
        this._overlay.div.style.width = "0px";
        this._overlay.div.style.height = "100%";
        this._overlay.div.style.left = "0";
        this._overlay.div.style.top = "0";
        break;
      case "right":
        this._overlay.div.style.width = "0px";
        this._overlay.div.style.height = "100%";
        this._overlay.div.style.right = "0";
        this._overlay.div.style.top = "0";
        break;
      case "bottom":
        this._overlay.div.style.height = "0px";
        this._overlay.div.style.width = "100%";
        this._overlay.div.style.bottom = "0";
    }
  }

  /**
   * On attache l'overlay au formulaire
   */
  addOverlay2Form() {
    const parent = this._form.parentNode;
    if (!parent) return;
    parent.removeChild(this._form);
    const divRelative = document.createElement("div");
    divRelative.style.position = "relative";
    parent.appendChild(divRelative);
    divRelative.appendChild(this._form);
    divRelative.appendChild(this._overlay.div);
  }

  toggleEffect() {
    this._overlay.toggle = !this._overlay.toggle;
    switch (Config.composantContact.effect) {
      case "top":
      case "bottom":
        if (this._overlay.toggle) this._overlay.div.style.height = "100%";
        else this._overlay.div.style.height = "0px";
        break;
      default:
        if (this._overlay.toggle) this._overlay.div.style.width = "100%";
        else this._overlay.div.style.width = "0px";
        break;
    }
  }

  submitForm = async (evt: Event) => {
    evt.preventDefault();
    const msg = await this._submit(this._form);
    this.displayOverlay(msg);
  };

  displayOverlay(msg: string) {
    this._overlay.div.style.display = "block";
    this._overlay.div.style.opacity = "1";
    this._form.style.opacity = "0";
    this._overlay.txt.innerHTML = msg;

    setTimeout(() => (this._overlay.content.style.opacity = "1"), 200);
    setTimeout(() => this.toggleEffect(), 50);
  }

  handleButton = (evt: Event) => {
    evt.preventDefault();
    this._form.reset();
    this._overlay.content.style.opacity = "0";
    this._form.style.opacity = "1";
    this.toggleEffect();
    setTimeout(() => (this._overlay.div.style.display = "none"), 800);
  };

  static async bind(submit: FnSubmit) {
    const el = document.getElementById(Config.composantContact.id);
    if (el instanceof HTMLFormElement) return new Contact(el, submit);
  }
}
