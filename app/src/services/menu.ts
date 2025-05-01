import { Menu } from "../model/menu";

export class MenuWww {
  /**
   * Permet de mettre à jour les liens présents en base
   */
  static update(
    Menus: Array<Menu>,
    pref_uri: string,
    uri: string
  ): Array<Menu> {
    const meta = "@";

    return Menus.map((el) => {
      if (el.uri.startsWith(meta)) {
        el.uri = el.uri.replace(meta, pref_uri);
      }
      if (uri == el.uri) el.active = true;
      if (el.dropdown)
        el.dropdown = el.dropdown.map((sub) => {
          if (sub.uri.startsWith(meta)) {
            sub.uri = sub.uri.replace(meta, pref_uri);
          }
          if (uri == sub.uri) el.active = true;
          return sub;
        });
      return el;
    });
  }
}
