import { Fragment, h } from "preact";
import { Config } from "../cfg/config.app";
import { MainNav } from "./mainNav";
import { DataService } from "../services/data.service";
import { Menu } from "../model/menu";
import { useEffect, useState } from "preact/hooks";
import { MobileNav } from "./mobile";
import { MenuWww } from "../services/menu";

/**
 * Style pour MyHeading
 * permet de construire l'entête du site de daldomarte
 *
 */

export function MyHeading() {
  type tmenu = {
    loaded: boolean;
    data: Array<Menu>;
    isEventScroll: boolean;
    isOverClass: boolean;
  };

  function scrollMenu() {
    const scrollY = window.scrollY;

    if (scrollY < Config.composantMenu.trigger) {
      if (menuDaldo.isOverClass) {
        menuDaldo.isOverClass = false;
        setMenuDaldo(menuDaldo);
      }
    } else {
      if (!menuDaldo.isOverClass) {
        menuDaldo.isOverClass = true;
        setMenuDaldo(menuDaldo);
      }
    }
  }

  const [menuDaldo, setMenuDaldo] = useState<tmenu>({
    loaded: false,
    data: [],
    isEventScroll: false,
    isOverClass: false
  });

  // Chargement des données pour construire le menu
  useEffect(() => {
    if (!menuDaldo.loaded) {
      const fetch = async () => {
        const gway = new DataService(Config.endpoint);
        const menu = await gway.getMenu(Config.ref2menu);
        setMenuDaldo({
          ...menuDaldo,
          loaded: true,
          data: MenuWww.update(menu, Config.prefUri, window.location.pathname)
        });
      };
      fetch();
    }
    if (!menuDaldo.isEventScroll) {
      menuDaldo.isEventScroll = true;
      window.addEventListener("scroll", scrollMenu);
    }
  }, [menuDaldo.loaded]);

  const style = {
    opacity: 0
  };

  return (
    <Fragment>
      <div className="myentete">
        <h1 style={style}>
          <a href={Config.homelink}>{Config.name.toUpperCase()}</a>
        </h1>
        <h2 style={style}>{Config.slogan.toUpperCase()}</h2>
      </div>
      <nav
        className={
          menuDaldo.isOverClass ? "position-top hide-small" : "hide-small"
        }
      >
        <div
          id={Config.composantMenu.id}
          className={menuDaldo.isOverClass ? "menu-dark" : ""}
        >
          <div className={menuDaldo.isOverClass ? "first mpdp" : "first"}>
            <span id="menutitre">DALDO MARTE</span>
          </div>
          {menuDaldo.loaded ? <MainNav menu={menuDaldo.data} /> : null}
        </div>
      </nav>
      {menuDaldo.loaded ? <MobileNav menu={menuDaldo.data} /> : null}
    </Fragment>
  );
}

