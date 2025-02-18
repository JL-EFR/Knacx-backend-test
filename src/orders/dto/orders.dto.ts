import { IsInt } from 'class-validator';

export class OrdersDto {
  @IsInt({ each: true })
  items: number[];
}
