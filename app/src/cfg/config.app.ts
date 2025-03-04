import { DisplayNews } from "../components/news/displaynews";

export const Config = {
  name: "Daldo Marte",
  slogan: "ARTIST AND SUPERHERO",
  homelink: "/d/menu/start",
  endpoint: "/api/wwwdata",
  endpointMsg: "/api/msg",
  ref2menu: "menu",
  ref2news: "news",
  displayNews: 3,
  media2news: "https://media.daldomarte.com/news/",
  prefUri: "/d/",
  imgTest: "/images/logo/faitacuba.avif",
  composantMenu: {
    id: "menu-top",
    trigger: 120
  },
  composantContact: {
    id: "contactForm",
    effect: "right",
    labelOk: "Ok"
  },
  label : {
    rmore : "Read more",
    close : "Close",
    next : "Next",
    previous : "Previous",
    rmoreImg : "/images/icons/read_more_24dp.svg",
    pdfImg : "/images/logo/pdf-file.svg"
  }
};
