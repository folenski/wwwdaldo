/**
 * Configuration globale du site
 */

export const Config = {
  name: "Daldo Marte",
  slogan: "ARTIST AND SUPERHERO",
  homelink: "/d/menu/start",
  endpoint: "/api/wwwdata",
  media2news: "https://media.daldomarte.com/news/",
  imgTest: "/images/logo/faitacuba.avif",
  Menu: {
    id: "menu-top",
    reference: "menu",
    prefUri: "/d/",
    trigger: 120
  },
  News: {
    reference: "news",
    display: 6,
    more: {
      label : "Read more",
      src: "/images/icons/read_more_24dp.svg"
    },
    pdf: {
      label : "Download the pdf file",
      src: "/images/logo/pdf-file.svg"
    },
    label: {
      close: "Close",
      next: "Next",
      previous: "Previous",
    }
  },
  Contact: {
    id: "cForm",
    endpointMsg: "/api/msg",
    effect: "right",
    labelOk: "Ok",
    retKO : "Sorry something was wrong, please try later",
    retOK : "Thank you",
    labelSend: "Send",
    fields: [
      {
        name: "name",
        type: "text",
        imgSrc: "/images/icons/person_outline.svg",
        required: true
      },
      {
        name: "mail",
        type: "email",
        imgSrc: "/images/icons/alternate_email.svg",
        required: true
      },
      {
        name: "subject",
        type: "text",
        imgSrc: "/images/icons/subject.svg",
        required: false
      },
      {
        name: "message",
        type: "textArea",
      },

    ]
  }
};
