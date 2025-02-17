import { Fragment, h } from "preact";
import { Menu } from "../model/menu";

export function MainNav(props: { menu: Array<Menu> }) {
  // le menu principale
  const menu1 = props.menu.filter((item) => !item.down);
  // le menu avec les réseaux sociaux
  const menu2 = props.menu.filter((item) => item.down);
  const network = menu2[0]?.dropdown ?? [];

  return (
    <Fragment>
      <div class="mymenu secondth">
        <ul>
          {menu1.map((item, index) => (
            <li key={index} className={item.active === true ? "active" : ""}>
              <a href={item.uri}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div class="mymenu thirth">
        <ul>
          {network.map((item, index) => (
            <li key={index}>
              <a href={item.uri}>
                <img src={item.image} alt={item.name} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
