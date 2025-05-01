import { h } from "preact";

export function IVideo(props: {
  url: string;
  videos: string[];
  maxwidth?: string;
}) {
  if (props.videos.length === 0) return null;

  /*
  let style = {};
  if (props.maxwidth) {
    style = {
      maxWidth: props.maxwidth
    };
  }
  */

  return (
    <video autoplay loop muted controls>
      {props.videos.map((v, index) => (
        <source
          key={index}
          src={props.url + v}
          type={`video/${v.split(".").pop()}`}
        />
      ))}
      Your browser does not support the video tag.
    </video>
  );
}
