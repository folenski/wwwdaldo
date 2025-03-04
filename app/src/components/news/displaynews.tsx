import { Fragment, h } from "preact";
import { News } from "../../model/news";
import { NewsCard } from "./newsCard";
import { NewsModal } from "./newsModal";
import { useEffect, useState } from "preact/hooks";
import { DataService } from "../../services/data.service";
import { Config } from "../../cfg/config.app";

/**
 * news : gestion de la page de news
 */
export function DisplayNews() {
  type tnews = {
    loaded: boolean;
    data: Array<News>;
    r1: number;
    r2: number;
    hasR1: boolean;
    hasR2: boolean;
    onModal: boolean;
    news?: News;
  };

  const onClickModal = (news: News) => {
    setNewsDaldo({
      ...newsDaldo,
      onModal: true,
      news: news
    });
  };

  const onClickCloseModal = () => {
    setNewsDaldo({
      ...newsDaldo,
      onModal: false,
      news: undefined
    });
  };

  const onClickNext = () => {
    setNewsDaldo({
      ...newsDaldo,
      hasR1: true,
      hasR2: newsDaldo.data.length > newsDaldo.r2 + Config.displayNews,
      r1: newsDaldo.r1 + Config.displayNews,
      r2: newsDaldo.r2 + Config.displayNews
    });
  };

  const onClickPrevious = () => {
    setNewsDaldo({
      ...newsDaldo,
      hasR1: newsDaldo.r1 - Config.displayNews > 0,
      hasR2: true,
      r1: newsDaldo.r1 - Config.displayNews,
      r2: newsDaldo.r2 - Config.displayNews
    });
  };

  const WrapperCard = (props: { news: Array<News>; display: boolean }) => {
    if (!props.display) {
      return null;
    }
    return (
      <Fragment>
        {props.news.slice(newsDaldo.r1, newsDaldo.r2).map((item, index) => (
          <NewsCard key={index} onenews={item} onModal={onClickModal} />
        ))}
        <div className={"nnav"}>
          {newsDaldo.hasR1 ? (
            <button className={"btn secondary"} onClick={onClickPrevious}>
              {Config.label.previous}
            </button>
          ) : <div></div>}

          {newsDaldo.hasR2 ? (
            <button className={"btn secondary"} onClick={onClickNext}>
              {Config.label.next}
            </button>
          ) : null}
        </div>
      </Fragment>
    );
  };

  const [newsDaldo, setNewsDaldo] = useState<tnews>({
    loaded: false,
    onModal: false,
    r1: 0,
    r2: Config.displayNews,
    hasR1: false,
    hasR2: false,
    data: []
  });

  // Chargement des données pour construire le menu
  useEffect(() => {
    if (!newsDaldo.loaded) {
      const fetch = async () => {
        const gway = new DataService(Config.endpoint);
        const nread = await gway.getNews(Config.ref2news);
        const nfil = nread.filter((item) => item.display);
        setNewsDaldo({
          ...newsDaldo,
          loaded: true,
          hasR2: nfil.length > Config.displayNews,
          data: nfil
        });
      };
      fetch();
    }
  }, [newsDaldo.loaded]);

  return (
    <Fragment>
      <div class="HTitle newsBg"></div>
      <div class="container">
        {newsDaldo.loaded ? (
          <WrapperCard news={newsDaldo.data} display={!newsDaldo.onModal} />
        ) : null}
        {newsDaldo.onModal ? (
          <NewsModal news={newsDaldo.news} onClose={onClickCloseModal} />
        ) : null}
      </div>
    </Fragment>
  );
}
