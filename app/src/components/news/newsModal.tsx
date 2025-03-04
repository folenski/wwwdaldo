import { h } from "preact";
import { News } from "../../model/news";
import { Config } from "../../cfg/config.app";
import { ISlider } from "../Slider/iSlider";

/**
 * Affiche La modale de la news
 */
export function NewsModal(props: { news?: News; onClose: () => void }) {
  if (!props.news) {
    return null;
  }

  return (
    <div class={"nopen"}>
      <div className={"noh"}>
        <h1>{props.news.titre_1}</h1>
        <h4>{props.news.titre_2}</h4>
        {props.news.article.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

      {props.news.readmore.slide ? (
        <ISlider
          url={Config.media2news}
          imgs={props.news.readmore.slide}
          txts={[]}
          alt={props.news.readmore.alt}
          timer={5000}
          control={true}
          effect={"slides"}
          maxwidth={props.news.readmore.width}
        />
      ) : null}

      <button className={"btn secondary"} onClick={props.onClose}>
        {Config.label.close}
      </button>
    </div>
  );
}
