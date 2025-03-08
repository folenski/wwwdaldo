import { Fragment, h } from "preact";
import { News } from "../../model/news";
import { Config } from "../../cfg/config.app";

/**
 * Affiche une news
 */
export function NewsCard(props: {
  onenews: News;
  loading: boolean;
  onModal: (news: News) => void;
}) {
  //****** Tag pour afficher le pdf ****************
  const PdfLink = (props: { link: string; text: string }) => {
    return (
      <a href={props.link} target="_blank">
        <img src={Config.News.pdf.src} alt={Config.News.pdf.label} />
        <span>{props.text}</span>
      </a>
    );
  };
  // **********************************************

  //****** Tag pour afficher le pdf ****************
  const More = (props: { onClick: () => void }) => {
    return (
      <Fragment>
        <button onClick={props.onClick}>{Config.News.more.label}</button>
        <img
          onClick={props.onClick}
          src={Config.News.more.src}
          alt={Config.News.more.label}
        />
      </Fragment>
    );
  };
  // **********************************************

  const onClickMore = () => {
    props.onModal(props.onenews);
  };

  return (
    <div className="ncard">
      <div>
        <picture>
          <source
            srcset={Config.media2news + props.onenews.poster.src + ".avif"}
            type="image/avif"
          />
          <img
            src={Config.media2news + props.onenews.poster.src + ".jpg"}
            alt={props.onenews.poster.alt}
            loading={props.loading ? "eager" : "lazy"}
          />
        </picture>
      </div>
      <div>
        <h3>{props.onenews.titre_1}</h3>
        <h4>{props.onenews.titre_2}</h4>
        {props.onenews.article.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

      {props.onenews.pdf ? (
        <div className="npdf">
          {props.onenews.pdf.map((item, index) => (
            <PdfLink
              key={index}
              link={Config.media2news + item.src}
              text={item.alt}
            />
          ))}
        </div>
      ) : null}

      {props.onenews.readmore ? (
        <div className="nmore">
          <More onClick={onClickMore} />
        </div>
      ) : null}
    </div>
  );
}
