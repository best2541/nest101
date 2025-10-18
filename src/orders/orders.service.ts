import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/orders.schema'
import { Model } from 'mongoose';
import { ProductService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productService: ProductService
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    const productResult = await this.productService.findOne(createOrderDto.productId)
    if (!productResult) {
      throw new NotFoundException('product not found')
    }
    return productResult
    // const result = new this.orderModel(createOrderDto)
    // return result.save()
  }

  async findOne(id: string): Promise<Order | null> {
    const order = this.orderModel.findById(id).populate('productId').exec()
    return order
  }
}
