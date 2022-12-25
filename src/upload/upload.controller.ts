import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';
import { UploadService } from './upload.service';
import { createReadStream } from 'fs';
// import { CreateUploadDto } from './dto/create-upload.dto';
// import { UpdateUploadDto } from './dto/update-upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  //  FileInterceptor 单个 FilesInterceptor 多个文件
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  Upload(@UploadedFile() file) {
    console.log(file);

    return '测试上传';
  }

  @Get('streamzip')
  async down(@Res() res: Response) {
    // 异步的方法
    const url = join(__dirname, '../../dist/images/1668341083691.jpg');
    const tarStream = new zip.Stream();

    await tarStream.addEntry(url);
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=aqi`);

    tarStream.pipe(res);
  }
  @Get('stream')
  downFiles(@Res({ passthrough: true }) res): StreamableFile {
    // 异步的方法
    const url = join(__dirname, '../../dist/images/1668341083691.jpg');
    const file = createReadStream(url);
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=aqi.jpg`);

    return new StreamableFile(file);
  }

  // @Get()
  // findAll() {
  //   return this.uploadService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.uploadService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
  //   return this.uploadService.update(+id, updateUploadDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.uploadService.remove(+id);
  // }
}
