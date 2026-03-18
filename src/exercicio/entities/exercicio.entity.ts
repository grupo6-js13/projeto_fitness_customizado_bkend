import { Transform, TransformFnParams } from "class-transformer";
import { IsInt, IsNotEmpty, Length, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_exercicios" })
export class Exercicio {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: "O Nome do Exercício é Obrigatório" })
    @Length(2, 255, { message: "O Nome deve ter entre 2 e 255 caracteres" })
    @Column({ length: 255, nullable: false })
    nome: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: "O Link da Imagem é Obrigatório" })
    @Length(10, 500, { message: "O Link da Imagem deve ter entre 10 a 500 caracteres" })
    @Column({ length: 500, nullable: false })
    imagem: string

    @IsNotEmpty({ message: "A indicação da Serie é Obrigatória" })
    @IsInt()    
    @Min(1, { message: "A indicação da Serie deve ser no mínimo 1" })
    @Column({ type: 'int', nullable: false })
    serie: number

    @IsNotEmpty({ message: "A indicação do Número de Repetições é Obrigatória" })
    @IsInt()    
    @Min(1, { message: "A indicação do Número de Repetições deve ser no mínimo 1" })
    @Column({ type: 'int', nullable: false })
    repeticao: number

    @IsNotEmpty({ message: "A indicação do Tempo Estimado de Exercício é Obrigatória" })
    @IsInt()
    @Min(1,{ message: "A indicação do Tempo Estimado deve ser no mínimo 1 segundo" })    
    @Column({ type: 'int', nullable: false})
    tempoEstimado: number //em segundos

}
