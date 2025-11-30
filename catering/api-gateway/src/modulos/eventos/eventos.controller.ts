import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EventosService } from './eventos.service';

@Controller('api/eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  create(@Body() createEventoDto: any) {
    return this.eventosService.create(createEventoDto);
  }

  @Get()
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventoDto: any) {
    return this.eventosService.update(id, updateEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(id);
  }
}