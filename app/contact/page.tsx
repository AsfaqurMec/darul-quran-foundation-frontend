import Container from '@/components/layout/Container';
import ContactForm from '@/components/contact/ContactForm';
import ContactFaq from '@/components/contact/ContactFaq';
import PageHero from '@/components/common/PageHero';

export default function ContactPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <PageHero title="যোগাযোগ" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">যোগাযোগ ফর্ম</h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">আমাদের ঠিকানা</h2>
            <div className="rounded-2xl overflow-hidden border">
              <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29215.021!2d90.39!3d23.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAS%20Sunnah%20Foundation!5e0!3m2!1sen!2sbd!4v1700000000000" width="100%" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="mt-4 space-y-2 text-gray-700">
              <div>ফোন: +8809610-001089</div>
              <div>ঠিকানা: রোড-৭০, ব্লক-সি, আফতাবনগর, ঢাকা</div>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <h2 className="text-2xl font-semibold mb-4">সচরাচর জিজ্ঞাসিত প্রশ্ন</h2>
        <ContactFaq />
      </Container>
    </div>
  );
}


