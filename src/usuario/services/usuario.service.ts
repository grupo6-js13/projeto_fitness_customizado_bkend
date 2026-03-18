import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
//import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        //private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario> {
        const usuarioEncontrado = await this.usuarioRepository.findOne({
            where: {
                usuario: ILike(`%${usuario}%`)
            }
        });

        if (!usuarioEncontrado)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuarioEncontrado;
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
        });

    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    async findByIMCMaiorQue(imc: number): Promise<Usuario[]> {
        const usuario = await this.usuarioRepository.find({
            where: {
                imc: MoreThan(imc)
            },
            order: {
                imc: 'DESC'
            }
        });
        return usuario;
    }

    async findByIMCMenorQue(imc: number): Promise<Usuario[]> {
        const usuario = await this.usuarioRepository.find({
            where: {
                imc: LessThan(imc)
            },
            order: {
                imc: 'ASC'
            }
        });
        return usuario;
    }


    async create(usuario: Usuario): Promise<Usuario> {
        
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        //usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

        if (usuario.foto == null || usuario.foto == undefined){
            usuario.foto = "Nenhuma imagem anexada."
        }

        usuario.imc = await this.calcuarIMC(usuario.peso, usuario.altura);

        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        //usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

        if (usuario.foto == null || usuario.foto == undefined){
            usuario.foto = "Nenhuma imagem anexada."
        }

        usuario.imc = await this.calcuarIMC(usuario.peso, usuario.altura);
        
        return await this.usuarioRepository.save(usuario);

    }

    async calcuarIMC(peso: number, altura: number): Promise<number> {
        const imc = peso / (altura * altura);
        return imc;
    }
    

}