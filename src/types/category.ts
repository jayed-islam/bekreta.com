export interface ICategory {
  _id: string;
  name: string;
  description: string;
  title: string;
  isDeleted: boolean;
}

export interface ICategoriesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ICategory[];
}
