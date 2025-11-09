import { Module } from '@nestjs/common';
import { PreauthController } from './preauth.controller';
import { PreauthService } from './preauth.service';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PreauthController],
  providers: [PreauthService]
})
export class PreauthModule {}
