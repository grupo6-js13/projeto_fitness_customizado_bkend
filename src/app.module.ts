import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { ExercicioModule } from './exercicio/exercicio.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localHost",
      port: 3306, // Meu MySQL está rodando na porta 3307. Favor ajustar conforme necessário
      username: "root", // O usuário padrão do MySQL é "root". Favor ajustar conforme necessário
      password: "root", // A senha padrão do MySQL é "root". Favor ajustar conforme necessário
      database: "db_fitness", // Crie um banco de dados chamado "db_fitness" no MySQL
      autoLoadEntities: true, //Procurar por arquivos de forma recursiva
      synchronize: true,
      dropSchema: false, // Cuidado: isso irá apagar o banco de dados a cada reinício da aplicação. Use apenas em desenvolvimento.
    }),
    CategoriaModule,
    ExercicioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
