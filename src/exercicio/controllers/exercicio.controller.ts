import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ExercicioService } from "../services/exercicio.service";
import { Exercicio } from "../entities/exercicio.entity";

@Controller("/exercicios")
export class ExercicioController {

    constructor(
        private readonly exercicioService: ExercicioService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Exercicio[]> {
        return this.exercicioService.findAll();
    }

    @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    findAllByNome(@Param("nome") nome: string): Promise<Exercicio[]> {
        return this.exercicioService.findAllByNome(nome);
    }

    // CONSULTA EXTRA 1: Encontra Exercícios com um valor mínimo de repetições

    @Get("/repeticoes/min/:repeticao")
    @HttpCode(HttpStatus.OK)
    findByRepeticaoMin(@Param("repeticao", ParseIntPipe) repeticao: number): Promise<Exercicio[]> {
        return this.exercicioService.findByRepeticaoMin(repeticao);
    }

    // CONSULTA EXTRA 2: Encontra Exercícios com um valor máximo de repetições

    @Get("/repeticoes/max/:repeticao")
    @HttpCode(HttpStatus.OK)
    findByRepeticaoMax(@Param("repeticao", ParseIntPipe) repeticao: number): Promise<Exercicio[]> {
        return this.exercicioService.findByRepeticaoMax(repeticao);
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Exercicio> {
        return this.exercicioService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() exercicio: Exercicio): Promise<Exercicio> {
        return this.exercicioService.create(exercicio);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() exercicio: Exercicio): Promise<Exercicio> {
        return this.exercicioService.update(exercicio);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.exercicioService.delete(id);
    }
}