import type React from 'react';
import Input from '../components/Input';
import { MdSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useError } from '../hooks/useError';
import type { MyEvent } from '../utils/types';
import { getAllPublicEvents } from '../api/events';
import Loader from '../components/Loader';
import PublicEvents from '../components/PublicEvents';

export const HomePage: React.FC = () => {
  const { setError } = useError();
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPublicEvents()
      .then(({ data, err }) => {
        if (err) {
          setError(err);
          return;
        }

        if (!data) {
          return;
        }

        console.log(data);
        setEvents(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setError]);

  return (
    <section>
      <h1>Discover Events</h1>
      <p>Find and join exciting happening around you!</p>

      <section>
        {loading && <Loader fullScreen={true} />}
        {!loading && events.length === 0 && <p>There is no events yet.</p>}
        {!loading && events.length > 0 && (
          <>
            <div className="relative">
              <MdSearch
                size={16}
                className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
              />

              <Input
                type="text"
                placeholder="Search for events..."
                className="pl-8 w-full"
              />
            </div>

            <PublicEvents events={events} />
          </>
        )}
      </section>
    </section>
  );
};
