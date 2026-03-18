import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ExercicioService } from "../services/exercicio.service";
import { Exercicio } from "../entities/exercicio.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller("/exercicios")
export class ExercicioController {

    constructor(
        private readonly exercicioService: ExercicioService
    ) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Exercicio[]> {
        return this.exercicioService.findAll();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    async findAllByNome(@Param("nome") nome: string): Promise<Exercicio[]> {
        return this.exercicioService.findAllByNome(nome);
    }

    // CONSULTA EXTRA 1: Encontra Exercícios com um valor mínimo de repetições

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("/repeticoes/min/:repeticao")
    @HttpCode(HttpStatus.OK)
    async findByRepeticaoMin(@Param("repeticao", ParseIntPipe) repeticao: number): Promise<Exercicio[]> {
        return this.exercicioService.findByRepeticaoMin(repeticao);
    }

    // CONSULTA EXTRA 2: Encontra Exercícios com um valor máximo de repetições

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("/repeticoes/max/:repeticao")
    @HttpCode(HttpStatus.OK)
    async findByRepeticaoMax(@Param("repeticao", ParseIntPipe) repeticao: number): Promise<Exercicio[]> {
        return this.exercicioService.findByRepeticaoMax(repeticao);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async findById(@Param("id", ParseIntPipe) id: number): Promise<Exercicio> {
        return this.exercicioService.findById(id);
    }

    @Post("/cadastrar")
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() exercicio: Exercicio): Promise<Exercicio> {
        return this.exercicioService.create(exercicio);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() exercicio: Exercicio): Promise<Exercicio> {
        return this.exercicioService.update(exercicio);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param("id", ParseIntPipe) id: number) {
        return this.exercicioService.delete(id);
    }
}