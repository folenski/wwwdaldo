import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";

export function ISlider(props: {
  url: string;
  imgs: string;
  txts: string;
  alt: string;
  timer: number;
  control: boolean;
  effect: string;
}) {
  type storeSlider = {
    images: string[];
    textes: string[];
    classEffect: string;
    alt: string;
    cur: number;
    curOffset: number;
    offset: number;
    id: string;
    stopSlide: boolean;
  };

  const [Slider, setSlider] = useState<storeSlider>({
    images: [],
    textes: [],
    classEffect: "slides",
    alt: props.alt,
    cur: 0,
    curOffset: 0,
    offset: 600,
    id: "slider999",
    stopSlide: false
  });

  const nextSlide = () => {
    addSlide(Slider.cur + 1, true);
  };

  const prevSlide = () => {
    addSlide(Slider.cur - 1 + Slider.images.length, true);
  };

  const addSlide = (index: number, stop: boolean = false) => {
    Slider.cur = index % Slider.images.length;

    const sliderRef = document.getElementById(Slider.id);
    Slider.offset = sliderRef ? sliderRef.offsetWidth : Slider.offset;
    Slider.curOffset = -Slider.cur * Slider.offset + 1;
    Slider.stopSlide = stop;
    setSlider({ ...Slider });
  };

  if (Slider.images.length === 0) {
    props.imgs.split("|").map((img) => {
      Slider.images.push(props.url + img);
    });
    props.txts.split("|").map((txt) => {
      Slider.textes.push(txt);
    });
    if (props.effect === "fade") Slider.classEffect = "fade";
  }

  if (props.imgs.length === 0) return null;

  useEffect(() => {
    if (Slider.stopSlide === true) {
      console.log("Slider has stop by user");
      return;
    }

    const intervalId = setInterval(() => {
      addSlide(Slider.cur + 1);
    }, props.timer);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [Slider.stopSlide]);

  return (
    <div className="islider" id={Slider.id}>
      <div
        className={Slider.classEffect}
        style={{ transform: `translateX(${Slider.curOffset}px)` }}
      >
        {Slider.images.map((image, index) => (
          <img
            className={index === Slider.cur ? "active" : ""}
            key={index}
            src={image}
            alt={Slider.alt}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      {props.txts.length > 0
        ? Slider.textes.map((txt, index) => (
            <span
              key={index}
              className={index === Slider.cur ? "legend active" : "legend"}
            >
              {txt}
            </span>
          ))
        : null}
      {props.control ? (
        <Fragment>
          {Slider.cur !== 0 ? (
            <button className="prev" onClick={prevSlide}>
              <img
                src="/images/logo/arrow_back_ios_24dp.svg"
                alt="previous picture"
              />
            </button>
          ) : null}
          {Slider.cur !== Slider.images.length - 1 ? (
            <button className="next" onClick={nextSlide}>
              <img
                src="/images/logo/arrow_forward_ios_24dp.svg"
                alt="next picture"
              />
            </button>
          ) : null}
        </Fragment>
      ) : null}
    </div>
  );
}
