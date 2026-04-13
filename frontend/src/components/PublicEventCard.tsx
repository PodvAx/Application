import React from 'react';
import type { MyEvent } from '../utils/types';
import clsx from 'clsx';
import {
  MdAccessTime,
  MdOutlineCalendarToday,
  MdOutlineLocationOn,
  MdOutlinePeopleAlt,
} from 'react-icons/md';
import Button from './Button';
import { formatDate } from '../utils/helpers';

type PublicEventCardProps = {
  event: MyEvent;
  className?: string;
};

const PublicEventCard: React.FC<PublicEventCardProps> = ({
  event,
  className,
}: PublicEventCardProps) => {
  const { title, description, date, location, capacity } = event;
  console.log('dateString:', date);

  const formatedDate = formatDate(date);
  const formatedTime = formatDate(date);

  console.log('date:', formatedDate);
  console.log('time:', formatedTime);

  return (
    <article
      className={clsx(
        'border border-gray-300 p-4 flex flex-col gap-4 rounded-lg',
        className && className,
      )}
    >
      <div>
        <h3>{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <p className="flex gap-1 items-center">
          <MdOutlineCalendarToday size={16} />
          <span>{formatedDate}</span>
        </p>

        <p className="flex gap-1 items-center">
          <MdAccessTime size={16} />
          <span>{formatedTime}</span>
        </p>

        <p className="flex gap-1 items-center">
          <MdOutlineLocationOn size={16} />
          <span>{location}</span>
        </p>

        <p className="flex gap-1 items-center">
          <MdOutlinePeopleAlt size={16} />
          <span>{`0 / ${capacity || '∞'} participants`}</span>
        </p>
      </div>

      <Button label="Join Event" variant="green" />
    </article>
  );
};

export default PublicEventCard;
