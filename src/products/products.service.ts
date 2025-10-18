import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/products.shema'
import { Model } from 'mongoose';
@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const result = new this.productModel(createProductDto)
    return result.save();
  }

  async findAll(): Promise<Product[]> {
    const result = this.productModel.find().exec()
    return result;
  }

  async findOne(id: string): Promise<Product | null> {
    const result = this.productModel.findById(id).exec()
    return result
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const result = this.productModel.findByIdAndUpdate(
      id, updateProductDto, { new: true }
    ).exec()
    return result;
  }

  async remove(id: string) {
      const result = await this.productModel.findByIdAndDelete(id).exec()
      if (!result) {
        throw new NotFoundException('id not found')
      } else {
        return { message: 'deleted' }
      }
  }
}
