export class CreateMenuDto {
  name: string;
  path: string;
  meta: {
    icon: string;
    keeplive: boolean;
    role: number;
  };
  children: CreateMenuDto[];
}
