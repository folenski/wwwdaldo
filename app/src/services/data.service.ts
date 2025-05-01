import { HttpData, HttpDataError } from "../model/httpdata";
import { Menu } from "../model/menu";
import { News } from "../model/news";

export class DataService {
  private _head: {
    method: "GET";
    headers: {
      "Content-Type": "application/json;charset=utf-8";
    };
  };
  constructor(private endpoint: string) {}

  async getMenu(ref: string): Promise<Menu[]> {
    if (ref === "") {
      console.error("GetData: ref empty!");
      return [];
    }
    const Response = await fetch(`${this.endpoint}/${ref}`, this._head);
    if (Response.ok) {
      const result = await (<Promise<HttpDataError | HttpData[]>>(
        Response.json()
      ));

      if ("data" in result && Array.isArray(result.data)) {
        return result.data;
      }
    }
    return [];
  }

  async getNews(ref: string): Promise<News[]> {
    if (ref === "") {
      console.error("GetData: ref empty!");
      return [];
    }
    const Response = await fetch(`${this.endpoint}/${ref}`, this._head);
    if (Response.ok) {
      const result = await (<Promise<HttpDataError | HttpData[]>>(
        Response.json()
      ));

      if ("data" in result && Array.isArray(result.data)) {
        return result.data;
      }
    }
    return [];
  }
}
