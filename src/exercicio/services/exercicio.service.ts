import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Exercicio } from "../entities/exercicio.entity";
import { DeleteResult, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";


@Injectable()
export class ExercicioService {

    constructor(
        @InjectRepository(Exercicio)
        private exercicioRepository: Repository<Exercicio>,
    ) { }

    async findAll(): Promise<Exercicio[]> {

        // SELECT * FROM tb_exercicios

        return this.exercicioRepository.find({
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
            }
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
            order: {
                repeticao: "DESC", // Ordena em ordem decrescente de repeticoes
            }
        })
    }


    async create(exercicio: Exercicio): Promise<Exercicio> {

        // INSERT INTO tb_exercicios (nome, imagem, serie, repeticao, tempoEstimado) VALUES (?, ?, ?, ?, ?)

        return await this.exercicioRepository.save(exercicio);
    }

    async update(exercicio: Exercicio): Promise<Exercicio> {

        if (!exercicio.id || exercicio.id <= 0) {
            throw new HttpException("O ID do exercicio é inválido", HttpStatus.BAD_REQUEST);
        }

        // Checa se o Exercicio existe

        await this.findById(exercicio.id);

        // UPDATE tb_exercicios
        // SET nome = ?
        // imagem = ?
        // serie = ?
        // repeticao = ?
        // tempoEstimado = ?        
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