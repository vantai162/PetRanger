import { Heart, Users, Award, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We treat every pet with the same love and attention we give our own pets.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in pet care services and products.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build lasting relationships with pet owners and their furry friends.',
    },
    {
      icon: Clock,
      title: 'Reliability',
      description: 'You can count on us to be there when your pet needs care.',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Veterinarian',
      image: 'https://images.unsplash.com/photo-1654895716780-b4664497420d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3NTM5NTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: '15+ years of veterinary experience specializing in small animal care.',
    },
    {
      name: 'Michael Chen',
      role: 'Head Groomer',
      image: 'https://images.unsplash.com/photo-1719464454959-9cf304ef4774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBncm9vbWluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzc1NDYwMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'Certified professional groomer with a passion for making pets look their best.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Training Director',
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXBweSUyMHRyYWluaW5nfGVufDF8fHx8MTc3NTQ2MDI4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'Experienced dog trainer specializing in positive reinforcement methods.',
    },
  ];

  const stats = [
    { number: '10+', label: 'Years in Business' },
    { number: '5000+', label: 'Happy Clients' },
    { number: '50+', label: 'Team Members' },
    { number: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#98CE00] to-[#98CE00] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">About PawfectCare</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Your trusted partner in pet care for over a decade.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2016, PawfectCare started with a simple mission: to provide the highest quality care for pets in our community. What began as a small grooming salon has grown into a full-service pet care center.
                </p>
                <p>
                  Today, we offer comprehensive services including veterinary care, grooming, boarding, training, and a complete pet supply store. Our team of dedicated professionals shares a passion for animal welfare and excellence in pet care.
                </p>
                <p>
                  We believe that pets are family, and we're honored to be trusted with their care. Every day, we strive to exceed expectations and create positive experiences for both pets and their owners.
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1692145520080-3e72e0f3c4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBldCUyMHN0b3JlfGVufDF8fHx8MTc3NTQ1Njg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our pet care facility"
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#98CE00] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98CE00]/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-[#98CE00]" />
                  </div>
                  <h3 className="text-xl mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-[#98CE00] mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Join Our Community</h2>
          <p className="text-gray-600 text-lg mb-8">
            Experience the PawfectCare difference. Visit us today or schedule an appointment.
          </p>
          <button className="bg-[#98CE00] hover:bg-[#98CE00] text-white px-8 py-3 rounded-lg transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
