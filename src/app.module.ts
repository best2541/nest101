import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { UsersModule } from './users/user.module';
=======
>>>>>>> 727888003943d170376617c94a4a2eed8732fd6f

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test',
      autoLoadEntities: true,   // โหลด entity อัตโนมัติ
      synchronize: true,        // dev เท่านั้น (สร้างตารางให้เอง)
    }),
    MongooseModule.forRoot('mongodb://root:password@localhost:27017', {
      dbName: 'bass',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '119.63.71.113',
      port: 3392,
      database: 'test',
      username: 'antsadmin',
      password: 'P@ssw0rd;',
      entities: [],
      synchronize: process.env.NODE_ENV != 'production'
    }),
    ProductsModule,
    OrdersModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
