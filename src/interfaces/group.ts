import { ICategory } from "./category";

export interface IGroup {
  id: string;
  name: string;
  image: string;
  brief_desc: string;
  categories: Array<{ category: ICategory }>;
  full_desc: string;
  contact_name: string;
  contact_number: string;
  user_id: string;
}
