import { Message } from "../model/message";

export class MessageService {
  constructor(private endpoint = "/api/msg") {}

  post = async (msg: Message): Promise<number> => {
    const Response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(msg)
    });
    if (Response.ok && Response.status == 201) {
      return 0;
    }
    return -1;
  };
}
