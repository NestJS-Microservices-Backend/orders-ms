import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { ChangeOrderStatusDto, CreateOrderDto, OrderPaginationDto } from './dto';
import { PrismaClient } from '../../generated/prisma';



@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger( 'OrderService' );

  async onModuleInit() {
    await this.$connect();
    this.logger.log( 'Database connecterd' );
  }

  create( createOrderDto: CreateOrderDto ) {
    return {
      service: 'order microservice',
      orderDTO: createOrderDto
    }
    // return this.order.create( {
    //   data: createOrderDto
    // } );
  }

  async findAll( orderPaginationDto: OrderPaginationDto ) {

    const totalPages = await this.order.count( {
      where: {
        status: orderPaginationDto.status
      }
    } );

    const currentPage = orderPaginationDto.page;

    const perPage = orderPaginationDto.limit;

    return {
      data: await this.order.findMany( {
        skip: ( currentPage! - 1 ) * perPage!,
        take: perPage,
        where: {
          status: orderPaginationDto.status
        }
      } ),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil( totalPages / perPage! )
      }
    };
  }

  async findOne( id: string ) {

    const order = await this.order.findFirst( {
      where: { id }
    } );

    if ( !order ) {
      throw new RpcException( {
        status: HttpStatus.BAD_REQUEST,
        message: `Order with id #${ id } not found`
      } );
    }

    return order;
  }

  async changeStatus( changeOrderStatusDto: ChangeOrderStatusDto ) {

    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne( id );

    if ( order.status === status ) {
      return order;
    }

    return this.order.update( {
      where: { id },
      data: { status: status }
    } );
  }


}
