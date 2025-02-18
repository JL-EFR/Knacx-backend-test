import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  Description: string;

  @IsString()
  @IsNotEmpty()
  Category: string;
}

export class ProductPostDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  Description: string;

  @IsString()
  @IsNotEmpty()
  Category: string;
}
