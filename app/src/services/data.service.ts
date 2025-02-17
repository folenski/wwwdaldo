import { HttpData, HttpDataError } from "../model/httpdata";
import { Menu } from "../model/menu";

export class DataService {
  constructor(private endpoint: string) {}

  async getMenu(ref: string): Promise<Menu[]> {
    if (ref === "") {
      console.error("GetData: ref empty!");
      return [];
    }
    const Response = await fetch(`${this.endpoint}/${ref}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });
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
