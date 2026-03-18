import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exercicio } from '../../exercicio/entities/exercicio.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  @IsNotEmpty({ message: 'A Categoria é Obrigatória' })
  @Length(2, 100, {
    message: 'O Nome da Categoria deve ter entre 2 e 100 caracteres.',
  })
  @Column({ length: 100, nullable: false })
  nome: string;

  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  @IsNotEmpty({ message: 'A Descrição é Obrigatória' })
  @Length(3, 255, {
    message: 'A Descrição da Categoria deve ter entre 3 e 255 caracteres.',
  })
  @Column({ length: 255, nullable: false })
  descricao: string;

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => {
    const trimmed = (value as string | null)?.trim();
    return trimmed === '' ? null : trimmed;
  })
  @Length(1, 1000, {
    message: 'O Link do Icone da Categoria deve ter entre 1 a 1000 caracteres',
  })
  @Column({ length: 1000, nullable: true })
  icone: string;

  @OneToMany(() => Exercicio, (exercicio) => exercicio.categoria)
  exercicios: Exercicio[] // Array de retorno
}
