import { Controller } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';

@Controller('perfiles')
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}
}
