import { EventsHero } from '@/components/sections/events-hero';
import { EventsCalendar } from '@/components/sections/events-calendar';
import { EventsList } from '@/components/sections/events-list';

export const metadata = {
  title: 'Events & Calendar | Dagoretti High School',
  description: 'Upcoming events, school calendar, and activities at Dagoretti High School.',
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventsCalendar />
      <EventsList />
    </>
  );
}
