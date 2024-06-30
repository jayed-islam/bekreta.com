export interface Category {
  _id: string;
  name: string;
  description: string;
  isDeleted: boolean;
}

export interface ICategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}
