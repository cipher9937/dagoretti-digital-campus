import { ContactHero } from '@/components/sections/contact-hero';
import { ContactForm } from '@/components/sections/contact-form';
import { ContactMap } from '@/components/sections/contact-map';
import { ContactDetails } from '@/components/sections/contact-details';

export const metadata = {
  title: 'Contact Us | Dagoretti High School',
  description: 'Get in touch with Dagoretti High School. Location, phone numbers, email, and office hours.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactDetails />
      <div className="grid lg:grid-cols-2 gap-0">
        <ContactForm />
        <ContactMap />
      </div>
    </>
  );
}
