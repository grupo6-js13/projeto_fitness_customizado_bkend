import { CategoriaService } from './../../categoria/services/categoria.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Exercicio } from "../entities/exercicio.entity";
import { DeleteResult, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";


@Injectable()
export class ExercicioService {

    constructor(
        @InjectRepository(Exercicio)
        private exercicioRepository: Repository<Exercicio>,
        private readonly categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Exercicio[]> {

        // SELECT * FROM tb_exercicios

        return this.exercicioRepository.find({
            relations: {
                categoria: true,
            },
            order: {
                nome: "ASC"
            }
        });
    }

    async findById(id: number): Promise<Exercicio> {

        // SELECT * FROM tb_exercicios WHERE id = ?

        const exercicio = await this.exercicioRepository.findOne({
            where: {
                id,
            },
            relations: {
                categoria: true,
            },
        })
        if (!exercicio) {
            throw new HttpException("Exercicio não encontrado", HttpStatus.NOT_FOUND)
        }
        return exercicio;

    }

    async findAllByNome(nome: string): Promise<Exercicio[]> {

        // SELECT * FROM tb_exercicios WHERE nome LIKE '%?%'

        return this.exercicioRepository.find({
            where: {
                nome: ILike(`%${nome}%`),
            },
            relations: {
                categoria: true,
            },
            order: {
                nome: "ASC"
            }
        })
    }

    // CONSULTA EXTRA 1: Encontra Exercícios com um valor mínimo de repetições

    async findByRepeticaoMin(repeticao: number): Promise<Exercicio[]> {

        // SELECT * FROM tb_exercicios WHERE repeticao >= ?

        return this.exercicioRepository.find({
            where: {
                repeticao: MoreThanOrEqual(repeticao),
            },
            relations: {
                categoria: true,
            },
            order: {
                repeticao: "ASC", // Ordena em ordem crescente de repeticoes
            }
        })
    }

    // CONSULTA EXTRA 2: Encontra Exercícios com um valor máximo de repetições

    async findByRepeticaoMax(repeticao: number): Promise<Exercicio[]> {

        // SELECT * FROM tb_exercicios WHERE repeticao <= ?

        return this.exercicioRepository.find({
            where: {
                repeticao: LessThanOrEqual(repeticao),
            },
            relations: {
                categoria: true,
            },
            order: {
                repeticao: "DESC", // Ordena em ordem decrescente de repeticoes
            }
        })
    }


    async create(exercicio: Exercicio): Promise<Exercicio> {

        // Checa se o id de Categoria foi informado e se a Categoria existe

        if (!exercicio.categoria?.id) {
            throw new HttpException("A Categoria do Exercício é Obrigatória", HttpStatus.BAD_REQUEST);            
        }

        //já existe um exercício com o mesmo nome
        const exercicioExistente = await this.exercicioRepository.findOne({
            where: {
                nome: exercicio.nome
            }
        });

        if (exercicioExistente) {
            throw new HttpException("Já existe um exercício com esse nome", HttpStatus.BAD_REQUEST);
        }

        await this.categoriaService.findById(exercicio.categoria.id);

        // INSERT INTO tb_exercicios (nome, imagem, serie, repeticao, tempoEstimado, categoriaId) VALUES (?, ?, ?, ?, ?, ?)

        return await this.exercicioRepository.save(exercicio);
    }

    async update(exercicio: Exercicio): Promise<Exercicio> {

        if (!exercicio.id || exercicio.id <= 0) {
            throw new HttpException("O ID do exercicio é inválido", HttpStatus.BAD_REQUEST);
        }

        // Checa se o Exercicio existe

        await this.findById(exercicio.id);

        // Checa se o id de Categoria foi informado e se a Categoria existe

        if (!exercicio.categoria?.id) {
            throw new HttpException("A Categoria do Exercício é Obrigatória", HttpStatus.BAD_REQUEST);            
        }

        await this.categoriaService.findById(exercicio.categoria.id);

        // UPDATE tb_exercicios
        // SET nome = ?
        // imagem = ?
        // serie = ?
        // repeticao = ?
        // tempoEstimado = ?
        // categoriaId = ?        
        // WHERE id = ?
        return await this.exercicioRepository.save(exercicio);
    }

    async delete(id: number): Promise<DeleteResult> {

        // Checa se o Exercicio existe

        await this.findById(id);

        // DELETE tb_exercicios WHERE id = ?

        return await this.exercicioRepository.delete(id);
    }
}