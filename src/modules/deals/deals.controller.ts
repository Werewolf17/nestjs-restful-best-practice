import { Controller, Get, Post, Body, Request, UseInterceptors, UploadedFile, UseGuards, Param } from '@nestjs/common';
import { DealsService } from './deals.service';
import { ApiOperation, ApiResponse, ApiUseTags, ApiImplicitQuery, ApiConsumes, ApiImplicitFile, ApiBearerAuth } from '@nestjs/swagger';

import { DealEntity } from './deal.entity';
import { CreateDealDto } from './dto/create-deal.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('deals')
@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) { }

  @ApiOperation({
    title: 'Retrieve many Deals'
    // description: 'Aaa',
    // operationId: 'aaaa'
  })
  @Get()
  findAll() {
    return this.dealsService.findAll()
  }

  @ApiOperation({
    title: 'Retrieve one Deal'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealsService.findOne(id)
  }

  @ApiOperation({
    title: 'Create one Deal'
  })
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'thumbnail',
    required: true,
    description: 'Send one file'
  })
  @UseInterceptors(FileInterceptor('thumbnail'))
  insert(@Body() createDealDto: CreateDealDto, @UploadedFile() file, @Request() req) {
    return this.dealsService.insert(createDealDto, file, req)
  }
}
