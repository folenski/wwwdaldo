import { Menu } from "./menu";

export interface HttpDataError {
  errorcode: number;
  message: string;
}

export interface HttpData {
  ref: string;
  id_div: string;
  data: Array<Menu>;
}
