import { Controller, Get } from '@nestjs/common';

import { WelcomeService } from './welcome.service';
import { Public } from '../common/decorators/public.decorator';

@Controller()
export class WelcomeController {
  constructor(private readonly welcomeService: WelcomeService) {}

  @Get()
  @Public()
  getStatus() {
    return this.welcomeService.getStatus();
  }
}
