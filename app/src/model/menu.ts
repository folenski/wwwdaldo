export interface Menu {
  name: string;
  uri: string;
  ref: string;
  down?: boolean;
  dropdown?: Array<Menu>;
  image?: string;
  meta?: string;
  active?: boolean;
}
