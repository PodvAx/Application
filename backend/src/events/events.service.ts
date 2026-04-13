import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from 'src/common/dtos/create-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllPublic() {
    const events = await this.prismaService.event.findMany({
      where: {
        isPublic: true,
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
    return events;
  }

  async findById(id: string) {
    const event = await this.prismaService.event.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async createByUserId({ creatorId, ...dto }: CreateEventDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: creatorId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const event = await this.prismaService.event.create({
      data: {
        ...dto,
        creatorId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return event;
  }
}
