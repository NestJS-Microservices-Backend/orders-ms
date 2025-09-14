import { IsEnum, IsUUID } from 'class-validator';
import { OrderStatus } from 'generated/prisma';
import { orderStatusList } from '../enum';


export class ChangeOrderStatusDto {


  @IsUUID( 4 )
  id: string;

  @IsEnum( orderStatusList, {
    message: `Valid status are ${ orderStatusList }`
  } )
  status: OrderStatus;
}