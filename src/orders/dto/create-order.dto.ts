import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { OrderStatus } from 'generated/prisma';

import { orderStatusList } from '../enum';


export class CreateOrderDto {

  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum( orderStatusList, {
    message: `Posible status values are ${ orderStatusList }`
  } )
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;
  
  @IsBoolean()
  @IsOptional()
  paid: boolean = false;

}
