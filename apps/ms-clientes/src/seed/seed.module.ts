import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Cliente } from '@ukiyo/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}