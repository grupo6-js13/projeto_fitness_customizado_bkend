import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
//import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
//import { ApiBearerAuth } from '@nestjs/swagger';


@Controller("/usuarios")
export class UsuarioController{

    constructor(private readonly usuarioService: UsuarioService){ }

    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }

    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    @Get('/usuario/:usuario')
    @HttpCode(HttpStatus.OK)
    async findAllByUsuario(@Param('usuario') usuario: string): Promise<Usuario| null>{ 
        return this.usuarioService.findByUsuario(usuario);
    }

    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    @Get('/imc/maior/:imc')
    @HttpCode(HttpStatus.OK)
    async findByIMCMaiorQue(@Param('imc', ParseFloatPipe) imc: number): Promise<Usuario[]> {
        return this.usuarioService.findByIMCMaiorQue(imc);
    }

    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    @Get('/imc/menor/:imc')
    @HttpCode(HttpStatus.OK)
    async findByIMCMenorQue(@Param('imc', ParseFloatPipe) imc: number): Promise<Usuario[]> {
        return this.usuarioService.findByIMCMenorQue(imc);
    }

    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }

    
    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario)
    }

    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.update(usuario)
    }

}