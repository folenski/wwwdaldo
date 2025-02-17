import { h } from "preact";
import { Menu } from "../model/menu";
import { useState } from "preact/hooks";

/**
 * mobile
 * permet de faire le rendu du menu mobile
 *
 */

export function MobileNav(props: { menu: Array<Menu> }) {
  const [sindex, setsIndex] = useState(-1);

  const dispaySubNav = (index: number) => {
    if (index == sindex) return;
    if (!props.menu[index].down) return;
    setsIndex(index);
  };

  return (
    <div className="mobile light">
      {sindex >= 0 ? <SubNavs menu={props.menu[sindex]} /> : null}
      <Navs menu={props.menu} handleChange={dispaySubNav} />
    </div>
  );
}

function Navs(props: { menu: Array<Menu>; handleChange: (i: number) => void }) {
  return (
    <div className="nav">
      {props.menu.map((el, index) => (
        <div className={el.active === true ? "bloc-icon active" : "bloc-icon"}>
          <a
            href={el.uri}
            onClick={(e: Event) => {
              if (el.down === true) {
                e.preventDefault();
                props.handleChange(index);
              }
            }}
          >
            <img src={el.image} alt={el.name} />
          </a>
        </div>
      ))}
    </div>
  );
}

function SubNavs(props: { menu: Menu }) {
  return (
    <div className="subnav">
      <span>
        <img src={props.menu.image || "none"} alt={props.menu.name} />
        {props.menu.name}
      </span>
      <Liste Tableau={props.menu.dropdown ?? []} />
    </div>
  );
}

function Liste(props: { Tableau: Array<Menu> }) {
  return (
    <ul>
      {props.Tableau.map((el, index) => (
        <li>
          <a key={index} href={el.uri}>
            {el.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
