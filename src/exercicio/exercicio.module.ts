import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exercicio } from "./entities/exercicio.entity";
import { ExercicioService } from "./services/exercicio.service";
import { ExercicioController } from "./controllers/exercicio.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Exercicio])],
    controllers: [ExercicioController],
    providers: [ExercicioService],
    exports: [],
})
export class ExercicioModule { }