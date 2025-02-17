import { h } from "preact";

/**
 * iOver : permet de gérer un overlay sur les images
 */
export function IOver(props: { image: string; alt: string; effect: string }) {
  return (
    <div className={"pic-overlay"}>
      <img src={props.image} alt={props.alt} />
      <div className={"effect-" + props.effect}>
        <div className="text">
          <span>{props.alt}</span>
        </div>
      </div>
    </div>
  );
}
