import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriaController } from './controllers/categoria.controller';
import { CategoriaService } from './services/categoria.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), AuthModule],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [CategoriaService],
})
export class CategoriaModule {}
