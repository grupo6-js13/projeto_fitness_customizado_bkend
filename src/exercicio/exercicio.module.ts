import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exercicio } from "./entities/exercicio.entity";
import { ExercicioService } from "./services/exercicio.service";
import { ExercicioController } from "./controllers/exercicio.controller";
import { CategoriaModule } from "../categoria/categoria.module";


@Module({
    imports: [TypeOrmModule.forFeature([Exercicio]), CategoriaModule],
    controllers: [ExercicioController],
    providers: [ExercicioService],
    exports: [],
})
export class ExercicioModule { }