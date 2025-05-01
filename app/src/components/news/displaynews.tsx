import { Fragment, h } from "preact";
import { News } from "../../model/news";
import { NewsCard } from "./newsCard";
import { NewsModal } from "./newsModal";
import { useEffect, useState } from "preact/hooks";
import { DataService } from "../../services/data.service";
import { Config } from "../../cfg/config.app";

/**
 * news : Gére la liste des news
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
      hasR2: newsDaldo.data.length > newsDaldo.r2 + Config.News.display,
      r1: newsDaldo.r1 + Config.News.display,
      r2: newsDaldo.r2 + Config.News.display
    });
  };

  const onClickPrevious = () => {
    setNewsDaldo({
      ...newsDaldo,
      hasR1: newsDaldo.r1 - Config.News.display > 0,
      hasR2: true,
      r1: newsDaldo.r1 - Config.News.display,
      r2: newsDaldo.r2 - Config.News.display
    });
  };

  const WrapperCard = (props: { news: Array<News>; display: boolean }) => {
    if (!props.display) {
      return null;
    }
    return (
      <Fragment>
        {props.news.slice(newsDaldo.r1, newsDaldo.r2).map((item, index) => (
          <NewsCard key={index} onenews={item} onModal={onClickModal} loading={index === 0} />
        ))}
        <div className={"nnav"}>
          {newsDaldo.hasR1 ? (
            <button className={"btn secondary"} onClick={onClickPrevious}>
              {Config.News.label.previous}
            </button>
          ) : <div></div>}

          {newsDaldo.hasR2 ? (
            <button className={"btn secondary"} onClick={onClickNext}>
              {Config.News.label.next}
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
    r2: Config.News.display,
    hasR1: false,
    hasR2: false,
    data: []
  });

  // Chargement des données pour construire le menu
  useEffect(() => {
    if (!newsDaldo.loaded) {
      const fetch = async () => {
        const gway = new DataService(Config.endpoint);
        const nread = await gway.getNews(Config.News.reference);
        const nfil = nread.filter((item) => item.display);
        setNewsDaldo({
          ...newsDaldo,
          loaded: true,
          hasR2: nfil.length > Config.News.display,
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
