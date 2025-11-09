import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaHeartbeat,
  FaHandHoldingHeart,
  FaHospitalUser,
  FaChevronDown,
  FaBookMedical,
  FaUserCheck,
  FaBriefcaseMedical,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

// --- Navigation, Features, Resources, Impact Stories, Testimonials, FAQ as before ---
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/why-donate", label: "Why Donate?" },
  { to: "/find-drive", label: "Find a Drive" },
  { to: "/our-impact", label: "Our Impact" },
  { to: "/for-donors", label: "For Donors" },
];

const partnerHospitals = [
  "City General Hospital",
  "Unity Medical Center",
  "Hope County Clinic",
  "St. Jude's Children's Hospital",
  "Metro Health Services",
  "Community Regional",
  "Sunrise Hospital",
];

const features = [
  {
    icon: <FaUserCheck className="h-8 w-8 text-red-600" />,
    title: "1. Check Eligibility",
    description: "A quick 2-minute check to see if you're eligible to donate blood and save lives.",
  },
  {
    icon: <FaHospitalUser className="h-8 w-8 text-red-600" />,
    title: "2. Find a Drive Nearby",
    description: "Locate a convenient donation center or a mobile blood drive in your community.",
  },
  {
    icon: <FaHandHoldingHeart className="h-8 w-8 text-red-600" />,
    title: "3. Donate & Save Lives",
    description: "The donation itself takes about 10-15 minutes. One donation can save up to 3 lives.",
  },
];

const resources = [
  {
    icon: <FaBookMedical className="h-10 w-10 text-rose-600" />,
    title: "The Donation Process",
    desc: "A step-by-step guide from arrival to post-donation care.",
  },
  {
    icon: <FaUserCheck className="h-10 w-10 text-rose-600" />,
    title: "Eligibility Requirements",
    desc: "Understand the key health and travel criteria for donors.",
  },
  {
    icon: <FaBriefcaseMedical className="h-10 w-10 text-rose-600" />,
    title: "Post-Donation Care",
    desc: "Tips to ensure you feel great after your donation.",
  },
  {
    icon: <FaHeartbeat className="h-10 w-10 text-rose-600" />,
    title: "Benefits of Donating",
    desc: "Learn about the positive health benefits for donors.",
  },
];

const impactStories = [
  {
    title: "A Newborn's Second Chance Thanks to O- Donors",
    excerpt: "Baby Aisha required a rare blood type for emergency surgery. Read how our community came together.",
  },
  {
    title: "Rohan's First Donation: 'It Was Easier Than I Thought!'",
    excerpt: "A college student shares his experience, dispelling myths and encouraging his peers to donate.",
  },
  {
    title: "Community Drive in Partnership with TechCorp Saves 150 Lives",
    excerpt: "How a corporate partnership led to one of our most successful blood drives to date.",
  },
];

const testimonials = [
  {
    quote: "The staff were amazing and made me feel so comfortable. Knowing I helped someone is the best feeling.",
    author: "Priya S.",
    company: "Regular Donor",
  },
  {
    quote: "My son is alive today because of selfless donors. I can't thank you enough.",
    author: "Anil M.",
    company: "Recipient's Father",
  },
  {
    quote: "Organizing a drive at our university was seamless with their help. Our students were proud to contribute.",
    author: "Dr. Sharma",
    company: "Community Drive Organizer",
  },
];

const faqData = [
  { question: "Is donating blood safe?", answer: "Absolutely. We use sterile, single-use equipment for every donation to ensure your safety." },
  { question: "How long does the whole process take?", answer: "From registration to refreshments, the entire process takes about an hour. The actual donation is only 10-15 minutes." },
  { question: "Do I need to know my blood type?", answer: "Not at all. We will test your blood type for you after your first donation and inform you." },
  { question: "How often can I donate whole blood?", answer: "You can donate whole blood every 56 days (8 weeks)." },
  { question: "What should I do before donating?", answer: "Eat a healthy meal, drink plenty of water, and get a good night's sleep. Bring a valid ID." },
];

interface FAQItemProps {
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onClick }) => (
  <div className="border-b border-slate-200 py-4" data-aos="fade-up">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left text-lg font-medium text-slate-800"
    >
      <span>{item.question}</span>
      <FaChevronDown
        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    {isOpen && <p className="mt-3 text-slate-600">{item.answer}</p>}
  </div>
);

const Home: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div className="font-sans bg-white text-slate-800">

      {/* Header */}
      <header className="bg-white/90 shadow-sm py-4 px-8 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md" data-aos="fade-down">
        <h1 className="text-3xl font-bold text-red-600">Sahaay</h1>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-slate-600 hover:text-red-600">{link.label}</Link>
          ))}

          {/* Dashboard Button */}
          <Link
  to="/dashboard"
  className="bg-gradient-to-r from-rose-500 via-rose-400 to-pink-400 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-rose-300/50"
>
  Dashboard
</Link>
        </nav>

        <Link
  to="/emergency"
  className="relative bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white font-semibold px-5 py-2 rounded-lg shadow-lg hover:scale-105 hover:shadow-red-500/40 transition-all duration-300 animate-pulse-slow"
>
  EMERGENCY
</Link>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-50 to-rose-50 text-center py-28" data-aos="fade-up">
        <h2 className="text-5xl font-extrabold mb-6">Every Drop Counts. <span className="text-red-600">Be a Hero.</span></h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Join thousands of volunteers and help save lives in your community. Your donation can make a world of difference.
        </p>
      <Link
  to="/schedule-donation"
  className="relative bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-rose-400/50"
>
  Donate Blood Now ❤️
  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-400 to-rose-500 opacity-0 hover:opacity-20 transition duration-300"></span>
</Link>
      </section>

      {/* Partner Hospitals */}
      <section className="bg-slate-50 py-6" data-aos="fade-up">
        <p className="text-center text-slate-500 font-semibold mb-4">PROUDLY PARTNERED WITH</p>
        <div className="train-track">
          <div className="train flex gap-10 whitespace-nowrap animate-marquee">
            {partnerHospitals.map((logo, i) => <span key={i}>{logo}</span>)}
            {partnerHospitals.map((logo, i) => <span key={`dup-${i}`}>{logo}</span>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 text-center container mx-auto px-4" data-aos="fade-up">
        <h3 className="text-4xl font-bold mb-12">The Donation Process</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:-translate-y-1 transition" data-aos="zoom-in" data-aos-delay={i * 200}>
              {f.icon}
              <h4 className="mt-4 font-semibold text-lg">{f.title}</h4>
              <p className="text-slate-600 mt-2">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="bg-rose-50 py-20" data-aos="fade-up">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-4xl font-bold mb-12">Donor Resources & Info</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg" data-aos="fade-up" data-aos-delay={i * 200}>
                <div className="flex justify-center mb-4">{r.icon}</div>
                <h4 className="font-semibold text-lg">{r.title}</h4>
                <p className="text-slate-600 mt-2">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 container mx-auto px-4" data-aos="fade-up">
        <h3 className="text-4xl font-bold text-center mb-12">Impact Stories</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {impactStories.map((story, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:-translate-y-1 transition" data-aos="fade-up" data-aos-delay={i * 200}>
              <h4 className="font-semibold text-lg mb-2">{story.title}</h4>
              <p className="text-slate-600">{story.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-red-50 py-20" data-aos="fade-up">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-4xl font-bold mb-12">What Donors Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg" data-aos="fade-up" data-aos-delay={i * 200}>
                <p className="italic text-slate-700">"{t.quote}"</p>
                <p className="mt-4 font-semibold text-red-600">{t.author}</p>
                <p className="text-slate-500 text-sm">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 container mx-auto px-4" data-aos="fade-up">
        <h3 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h3>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openFaqIndex === i}
              onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-12" data-aos="fade-up">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Sahaay</h4>
            <p className="text-slate-300">Connecting donors and recipients to save lives, one donation at a time.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.to} className="mb-2">
                  <Link to={link.to} className="hover:text-red-600">{link.label}</Link>
                </li>
              ))}
              <li className="mb-2">
                <Link to="/dashboard" className="hover:text-red-600">Dashboard</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-2xl">
              <FaTwitter className="hover:text-red-600 cursor-pointer" />
              <FaLinkedin className="hover:text-red-600 cursor-pointer" />
              <FaInstagram className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
