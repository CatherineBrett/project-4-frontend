import { ICategory } from "./category";

export interface IGroup {
  id: number;
  name: string;
  image: string;
  brief_desc: string;
  categories: Array<{ category: ICategory }>;
  full_desc: string;
  contact_name: string;
  contact_number: string;
}
