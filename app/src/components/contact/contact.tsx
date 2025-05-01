import { h } from "preact";
import { Config } from "app/src/cfg/config.app";
import { AddInput, AddTextArea } from "./input";
import { useEffect, useState } from "preact/hooks";
import { Message } from "../../model/message";
import { MessageService } from "../../services/message.service";

/**
 * formulaire de contact
 */
export function Contact() {
  type tcontact = {
    sending: boolean;
    cr: number;
    data?: Message;
  };
  const noCr = 100;

  const [CDaldo, setCDaldo] = useState<tcontact>({
    sending: false,
    cr: noCr
  });

  const submitForm = (evt: Event) => {
    evt.preventDefault();
    CDaldo.data = { name: "", mail: "", message: "", subject: "" };
    const form = evt.target as HTMLFormElement;

    Config.Contact.fields.forEach((f) => {
      const item = form.elements.namedItem(f.name);
      if (
        item instanceof HTMLInputElement ||
        item instanceof HTMLTextAreaElement
      ) {
        if (Object.prototype.hasOwnProperty.call(CDaldo.data, f.name)) {
          CDaldo.data[f.name] = item.value;
        }
      }
    });

    form.reset();
    setCDaldo({
      ...CDaldo,
      sending: true
    });
  };

  const CloseConfirm = () => {
    console.log("CloseConfirm");
    setCDaldo({
      ...CDaldo,
      sending: false,
      cr: noCr
    });
  };

  // Chargement des données pour construire le menu
  useEffect(() => {
    if (CDaldo.sending && CDaldo.cr == noCr) {
      const send = async () => {
        const gway = new MessageService(Config.Contact.endpointMsg);
        const answer = await gway.post(CDaldo.data);

        setCDaldo({
          ...CDaldo,
          cr: answer
        });
      };
      send();
    }
  }, [CDaldo.sending]);

  return (
    <div className={"wrap"}>
      <Loading display={CDaldo.sending && CDaldo.cr === noCr} />
      <DisplayMsg
        display={CDaldo.sending && CDaldo.cr !== noCr}
        cr={CDaldo.cr}
        onCloseMsg={CloseConfirm}
      />

      <form
        method="post"
        onSubmit={submitForm}
        style={{ opacity: CDaldo.sending ? 0 : 1 }}
      >
        {Config.Contact.fields.map((f, index) =>
          f.type === "textArea" ? (
            <AddTextArea name="message" />
          ) : (
            <AddInput
              key={index}
              name={f.name}
              type={f.type}
              imgSrc={f.imgSrc}
              required={f.required}
            />
          )
        )}

        <button type="submit" className="btn secondary">
          {Config.Contact.labelSend}
        </button>
      </form>
    </div>
  );
}

// Spinner
function Loading(props: { display: boolean }) {
  if (!props.display) {
    return null;
  }
  return <div id={"SendCt"}></div>;
}

function DisplayMsg(props: {
  display: boolean;
  cr: number;
  onCloseMsg: () => void;
}) {
  if (!props.display) {
    return null;
  }

  return (
    <div className={"ovlay"}>
      <div className={"txt" + (props.cr != 0 ? " er" : "")}>
        {props.cr == 0 ? Config.Contact.retOK : Config.Contact.retKO}
      </div>
      <button onClick={props.onCloseMsg} className={"btn secondary"}>
        {Config.Contact.labelOk}
      </button>
    </div>
  );
}
