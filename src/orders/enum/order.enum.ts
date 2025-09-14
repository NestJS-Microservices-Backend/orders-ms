import { OrderStatus } from 'generated/prisma';

export const orderStatusList = [
  OrderStatus.CANCELLED,
  OrderStatus.DELIVERED,
  OrderStatus.PENDING,
];