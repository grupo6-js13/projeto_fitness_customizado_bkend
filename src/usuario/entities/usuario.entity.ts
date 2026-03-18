import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha: string

    @Column({length: 5000 }) 
    foto: string

    @IsNotEmpty()
    @Column({type: 'date', nullable: false })
    dataNascimento: Date

    @IsNotEmpty()
    @Column({type: 'decimal', precision: 10, scale: 2 })
    peso: number
    
    @IsNotEmpty()
    @Column({type: 'decimal', precision: 10, scale: 2 })
    altura: number

    @Column({type: 'decimal', precision: 10, scale: 2 })
    imc: number
}