import { h } from "preact";

export function AddInput(props: {
  name: string;
  type: string;
  imgSrc: string;
  required: boolean;
}) {
  return (
    <Wrap>
      <input
        name={props.name}
        type={props.type}
        placeholder={capitalize(props.name)}
        required={props.required}
      />
      <img src={props.imgSrc} aria-hidden="true" />
    </Wrap>
  );
}

export function AddTextArea(props: { name: string }) {
  return (
    <Wrap>
      <textarea
        name={props.name}
        rows={4}
        placeholder={capitalize(props.name)}
        data-length="1000"
        required
      ></textarea>
    </Wrap>
  );
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Wrap(props: { children: h.JSX.Element | h.JSX.Element[] }) {
  return (
    <div className="input-container">
      <div className="input-group">{props.children}</div>
    </div>
  );
}
