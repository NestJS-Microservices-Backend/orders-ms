import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from 'generated/prisma';

import { PaginationDto } from 'src/common';
import { orderStatusList } from '../enum';


export class OrderPaginationDto extends PaginationDto {

  @IsOptional()
  @IsEnum( orderStatusList, {
    message: `Valid status are ${ orderStatusList }`
  } )
  status: OrderStatus;


}