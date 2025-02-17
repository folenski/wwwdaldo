import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export function Block(props: { timer: string; classes: string }) {
  type storeBlock = {
    classes: string[];
    cur: number;
  };

  const [Bl, setBl] = useState<storeBlock>({
    classes: [],
    cur: 0
  });

  if (props.classes.length === 0) return null;

  if (Bl.classes.length === 0) {
    props.classes.split("|").map((el) => {
      Bl.classes.push(el);
    });
  }

  useEffect(() => {
    const timer = isNaN(parseInt(props.timer, 10))
      ? 10000
      : parseInt(props.timer, 10);
    const intervalId = setInterval(() => {
      Bl.cur = (Bl.cur + 1) % Bl.classes.length;
      setBl({ ...Bl });
    }, timer);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [Bl.classes]);

  return <div className={"dah " + Bl.classes[Bl.cur]}></div>;
}
