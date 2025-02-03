import { Navbar } from "@/components/navbar"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  Users,
  BarChart,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  Star,
  Video,
  MessageSquare,
  CreditCard,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] pt-24 flex items-center justify-center overflow-hidden border-b border-border">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]" />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs" />
          <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/50 to-background" />

          {/* Hero Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-8">
                <div className="space-y-4 animate-slide-up">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                    Transform Your Conference Experience
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                    Elevate your events with our cutting-edge conference management platform. Seamless organization,
                    real-time collaboration, and unforgettable experiences.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-primary text-primary-foreground hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-out group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Get Started Free
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </Link>
                  <Link
                    href="#features"
                    className="px-6 py-3 border border-border bg-card text-card-foreground hover:bg-accent hover:translate-y-[-2px] transition-all duration-300 ease-out"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-4 bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ease-out group"
                    >
                      <div className="text-2xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative h-[500px] w-full hidden lg:block animate-float">
                <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-primary/5 rounded-2xl overflow-hidden">
                  <Image
                    src="/conference-dashboard.webp"
                    alt="Conference Dashboard"
                    fill
                    className="object-cover object-center opacity-90 hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-24 bg-muted/50 dark:bg-card/50 border-b border-border relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Everything You Need</h2>
              <p className="text-muted-foreground">
                Comprehensive tools and features to make your conference a success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-card border border-border hover:shadow-2xl hover:border-primary/50 transition-all duration-300 ease-out hover-trigger"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-12 h-12 mb-4 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300 rounded-lg" />
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary group-hover:scale-125 transition-transform duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </p>
                  <div className="mt-4 hover-target">
                    <Link href="#" className="text-primary inline-flex items-center gap-2 group/link">
                      Learn more
                      <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] order-2 lg:order-1">
                <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-primary/5 rounded-2xl overflow-hidden">
                  <Image
                    src="/integrations.webp"
                    alt="Platform Integrations"
                    fill
                    className="object-cover object-center opacity-90 hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Seamless Integrations</h2>
                <p className="text-muted-foreground text-lg">
                  Connect with your favorite tools and services. Our platform integrates with leading software solutions
                  to streamline your workflow.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {integrations.map((integration, index) => (
                    <div
                      key={index}
                      className="p-4 bg-card border border-border rounded-sm hover:border-primary/50 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <integration.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium text-foreground">{integration.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-background border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Loved by Event Organizers</h2>
              <p className="text-muted-foreground">See what our customers have to say about their experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border border-border hover:shadow-2xl transition-all duration-300 ease-out group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {testimonial.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-muted/50 dark:bg-card/50 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground">Choose the perfect plan for your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`p-8 bg-card border border-border hover:shadow-2xl transition-all duration-300 ease-out ${
                    plan.featured ? "border-primary shadow-lg relative" : ""
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-sm transform translate-y-[-50%]">
                      Popular
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{plan.name}</h3>
                    <div className="text-3xl font-bold mb-2">${plan.price}</div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`block w-full py-2 text-center transition-all duration-300 ease-out
                      ${
                        plan.featured
                          ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                          : "bg-muted hover:bg-muted/80"
                      } hover:translate-y-[-2px]`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-background border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Find answers to common questions about our platform</p>
            </div>

            <div className="max-w-3xl mx-auto grid gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border border-border hover:shadow-lg transition-all duration-300 ease-out group"
                >
                  <h3 className="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-small-white/[0.2] pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                Ready to Transform Your Conference Management?
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Join thousands of successful event organizers who trust our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-background text-foreground hover:bg-accent hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 ease-out"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 ease-out"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

const features = [
  {
    title: "Smart Scheduling",
    description: "AI-powered scheduling system that optimizes your conference timeline automatically.",
    icon: Calendar,
  },
  {
    title: "Attendee Management",
    description: "Comprehensive tools for registration, badge creation, and attendance tracking.",
    icon: Users,
  },
  {
    title: "Real-time Analytics",
    description: "Detailed insights and metrics to measure your conference success.",
    icon: BarChart,
  },
  {
    title: "Lightning Fast",
    description: "Optimized performance ensures smooth operation even at scale.",
    icon: Zap,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security protocols to protect sensitive information.",
    icon: Shield,
  },
  {
    title: "Global Reach",
    description: "Multi-language support and localization for worldwide events.",
    icon: Globe,
  },
]

const stats = [
  { value: "10K+", label: "Events Managed" },
  { value: "1M+", label: "Attendees" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Director",
    avatar: "/placeholder.svg",
    content:
      "This platform has revolutionized how we manage our tech conferences. The automation features alone have saved us countless hours.",
  },
  {
    name: "Michael Chen",
    role: "Conference Organizer",
    avatar: "/placeholder.svg",
    content:
      "The real-time analytics and attendee management tools are game-changers. Our team can now focus on creating great experiences.",
  },
  {
    name: "Emma Davis",
    role: "Marketing Manager",
    avatar: "/placeholder.svg",
    content:
      "Incredible platform with outstanding support. It has made our virtual and hybrid events seamless and professional.",
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for small events",
    features: ["Up to 100 attendees", "Basic analytics", "Email support", "Basic customization"],
  },
  {
    name: "Professional",
    price: "99",
    description: "For growing conferences",
    featured: true,
    features: [
      "Up to 500 attendees",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "Multiple organizers",
    ],
  },
  {
    name: "Enterprise",
    price: "249",
    description: "For large-scale events",
    features: ["Unlimited attendees", "Custom solutions", "24/7 phone support", "White-label option", "API access"],
  },
]

const faqs = [
  {
    question: "How does the pricing work?",
    answer:
      "Our pricing is based on the number of attendees and features needed. We offer flexible plans that can be adjusted as your needs change.",
  },
  {
    question: "Can I try before I buy?",
    answer: "Yes! We offer a 14-day free trial on all plans. No credit card required.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 email support for all plans, with priority phone support for Professional and Enterprise plans.",
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No long-term contracts required. You can upgrade, downgrade, or cancel your subscription at any time.",
  },
]

const integrations = [
  { name: "Zoom", icon: Video },
  { name: "Slack", icon: MessageSquare },
  { name: "Google Calendar", icon: Calendar },
  { name: "Stripe", icon: CreditCard },
  { name: "Microsoft Teams", icon: Users },
  { name: "Zapier", icon: Zap },
]

