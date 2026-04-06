import { Scissors, Stethoscope, Home, GraduationCap, Sparkles, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Services() {
  const services = [
    {
      icon: Scissors,
      title: 'Professional Grooming',
      description: 'Complete grooming services including bathing, haircuts, nail trimming, and ear cleaning. Our experienced groomers handle pets of all sizes with gentle care.',
      image: 'https://images.unsplash.com/photo-1719464454959-9cf304ef4774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBncm9vbWluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzc1NDYwMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Bath & Blow Dry', 'Haircut & Styling', 'Nail Trimming', 'Ear Cleaning', 'Teeth Brushing'],
      price: 'Starting at $45',
    },
    {
      icon: Stethoscope,
      title: 'Veterinary Services',
      description: 'Comprehensive health care including check-ups, vaccinations, surgery, and emergency care. Our licensed veterinarians are here for your pet\'s health needs.',
      image: 'https://images.unsplash.com/photo-1654895716780-b4664497420d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3NTM5NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Wellness Exams', 'Vaccinations', 'Surgery', 'Dental Care', 'Emergency Services'],
      price: 'Consultation from $65',
    },
    {
      icon: Home,
      title: 'Pet Boarding',
      description: 'Safe and comfortable boarding facilities for dogs and cats. Climate-controlled rooms, regular exercise, and 24/7 supervision ensure your pet\'s comfort.',
      image: 'https://images.unsplash.com/photo-1743763959056-41bbb557272d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBib2FyZGluZyUyMGtlbm5lbHxlbnwxfHx8fDE3NzU0NjAyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Climate Control', 'Regular Exercise', '24/7 Supervision', 'Medication Administration', 'Webcam Access'],
      price: 'From $35/night',
    },
    {
      icon: GraduationCap,
      title: 'Training Classes',
      description: 'Professional training programs for puppies and adult dogs. Learn obedience, socialization, and behavior correction with positive reinforcement methods.',
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXBweSUyMHRyYWluaW5nfGVufDF8fHx8MTc3NTQ2MDI4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Puppy Training', 'Obedience Classes', 'Behavior Modification', 'Socialization', 'Private Sessions'],
      price: 'Classes from $150',
    },
    {
      icon: Sparkles,
      title: 'Spa Treatments',
      description: 'Pamper your pet with luxurious spa treatments including deep conditioning, paw treatments, and aromatherapy baths for ultimate relaxation.',
      image: 'https://images.unsplash.com/photo-1719464454959-9cf304ef4774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBncm9vbWluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzc1NDYwMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Deep Conditioning', 'Paw Treatment', 'Aromatherapy Bath', 'Massage', 'Blueberry Facial'],
      price: 'Packages from $75',
    },
    {
      icon: Heart,
      title: 'Daycare Services',
      description: 'Safe and fun daycare where your pet can socialize and play. Supervised group play, individual attention, and plenty of activities keep pets happy.',
      image: 'https://images.unsplash.com/photo-1692145520080-3e72e0f3c4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBldCUyMHN0b3JlfGVufDF8fHx8MTc3NTQ1Njg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Supervised Play', 'Socialization', 'Indoor & Outdoor Areas', 'Rest Periods', 'Photo Updates'],
      price: 'From $30/day',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#98CE00] to-[#98CE00] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Comprehensive pet care services designed to keep your furry friends happy, healthy, and looking their best.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 items-center`}
                >
                  <div className="flex-1">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#98CE00]/10 rounded-full mb-4">
                      <Icon className="w-6 h-6 text-[#98CE00]" />
                    </div>
                    <h2 className="text-3xl mb-4">{service.title}</h2>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">What's Included:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#98CE00] rounded-full" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl text-[#98CE00]">{service.price}</span>
                      <button className="bg-[#98CE00] hover:bg-[#98CE00] text-white px-6 py-2 rounded-lg transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Need Help Choosing?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Our team is here to help you find the perfect services for your pet. Contact us for personalized recommendations.
          </p>
          <button className="bg-[#98CE00] hover:bg-[#98CE00] text-white px-8 py-3 rounded-lg transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
