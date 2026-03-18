import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exercicio } from "./entities/exercicio.entity";
import { ExercicioService } from "./services/exercicio.service";
import { ExercicioController } from "./controllers/exercicio.controller";
import { CategoriaModule } from "../categoria/categoria.module";
import { AuthModule } from "../auth/auth.module";


@Module({
    imports: [TypeOrmModule.forFeature([Exercicio]), CategoriaModule, AuthModule],
    controllers: [ExercicioController],
    providers: [ExercicioService],
    exports: [ExercicioService],
})
export class ExercicioModule { }