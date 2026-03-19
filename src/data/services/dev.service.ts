import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { Usuario } from "../../usuario/entities/usuario.entity";
import { Exercicio } from "../../exercicio/entities/exercicio.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3307,
            username: 'root',
            password: 'root',
            database: 'db_fitness',
            entities: [Exercicio, Categoria, Usuario],
            synchronize: true,
            dropSchema: false,
    };
  }
}