import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateEventByUserDto } from 'src/common/dtos/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAllPublic() {
    const events = await this.eventsService.findAllPublic();
    return events;
  }

  @Get(':id')
  async findById(@Param('id') eventId: string) {
    const event = await this.eventsService.findById(eventId);
    return event;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createByUserId(
    @CurrentUser('sub') creatorId: string,
    @Body() createEventDto: CreateEventByUserDto,
  ) {
    const event = await this.eventsService.createByUserId({
      ...createEventDto,
      creatorId,
    });
    return event;
  }
}
