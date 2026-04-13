import React from 'react';
import type { MyEvent } from '../utils/types';
import PublicEventCard from './PublicEventCard';

type PublicEventsProps = {
  events: MyEvent[];
};

const PublicEvents: React.FC<PublicEventsProps> = ({
  events,
}: PublicEventsProps) => {
  return (
    <ul className="grid grid-cols-2 gap-2 ">
      {events.map((event: MyEvent) => {
        return (
          <PublicEventCard
            key={event.id}
            event={event}
            className="col-span-2"
          />
        );
      })}
    </ul>
  );
};

export default PublicEvents;
