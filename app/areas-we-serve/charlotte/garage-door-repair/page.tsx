import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle2,
  Phone,
  ShieldCheck,
  Clock3,
  Building2,
  Home,
  Wrench
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import {
  createMetadata,
  localBusinessSchema,
  site
} from "@/lib/site";

const pagePath = "/areas-we-serve/charlotte/garage-door-repair/";

const pageTitle = "Garage Door Repair in Charlotte, NC";

const pageDescription =
  "Need Garage Door Repair in Charlotte, NC? Home Fix Solution provides reliable residential and commercial garage door repair services.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/site-images/garage-door-new-installation.jpg"
});

const repairServices = [
  "Broken garage door springs",
  "Damaged or frayed cables",
  "Worn garage door rollers",
  "Bent or misaligned tracks",
  "Garage door opener problems",
  "Damaged garage door panels",
  "Doors that will not open or close",
  "Noisy or shaking garage doors",
  "Loose or worn hardware",
  "Garage doors that have come off their tracks",
  "Garage door adjustments",
  "Residential and commercial garage door repairs"
];

const emergencyProblems = [
  "A garage door stuck open",
  "A garage door stuck closed",
  "A broken spring",
  "A snapped or damaged cable",
  "A door that has come off its track",
  "A failed garage door opener",
  "Sudden and severe operating noises",
  "A damaged door that cannot operate normally"
];

const warningSigns = [
  "Loud grinding, squeaking, or rattling",
  "Slow opening or closing",
  "Uneven door movement",
  "Excessive shaking or vibration",
  "A door that reverses unexpectedly",
  "Visible damage to springs or cables",
  "Difficulty using the garage door opener",
  "The door becoming unusually heavy",
  "The door failing to remain open",
  "Gaps or misalignment around the door"
];

const faqs = [
  {
    question: "What garage door problems can you repair?",
    answer:
      "We can assist with common garage door issues involving springs, cables, rollers, tracks, panels, openers, hardware, alignment, and general operating problems."
  },
  {
    question: "Do you provide Emergency Garage Door Repair in Charlotte?",
    answer:
      "Yes. Home Fix Solution provides Emergency Garage Door Repair for urgent problems such as broken springs, damaged cables, stuck doors, doors off track, and other serious operating issues."
  },
  {
    question: "How do I know if my garage door needs repair?",
    answer:
      "Unusual noises, slow or uneven movement, difficulty opening or closing, visible damage, and sudden changes in performance are common signs that your garage door may need professional attention."
  },
  {
    question: "Can you repair broken garage door springs?",
    answer:
      "Yes. Broken springs are a common garage door repair issue. Because springs can store significant tension, professional repair is recommended."
  },
  {
    question: "Do you repair garage door openers?",
    answer:
      "Yes. Garage door opener problems can have several causes. A professional inspection can help determine what is affecting the opener and whether repair is appropriate."
  },
  {
    question: "Do you provide commercial garage door repair?",
    answer:
      "Yes. Home Fix Solution provides commercial garage door repair for businesses and commercial properties in Charlotte and surrounding areas."
  },
  {
    question: "How can I schedule Garage Door Repair in Charlotte?",
    answer:
      "You can call 757-908-4102 to schedule professional garage door service with Home Fix Solution in Charlotte, NC."
  }
];

export default function CharlotteGarageDoorRepairPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(pagePath),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Garage Door Repair in Charlotte, NC",
            serviceType: "Garage Door Repair",
            provider: {
              "@type": "LocalBusiness",
              name: site.name,
              telephone: site.phone
            },
            areaServed: {
              "@type": "City",
              name: "Charlotte",
              containedInPlace: {
                "@type": "State",
                name: "North Carolina"
              }
            },
            url: `${site.url}${pagePath}`,
            description: pageDescription
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: site.url
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Areas We Serve",
                item: `${site.url}/areas-we-serve`
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Charlotte",
                item: `${site.url}/areas-we-serve/charlotte`
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Garage Door Repair",
                item: `${site.url}${pagePath}`
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }
        ]}
      />

      {/* Breadcrumbs */}
      <section className="bg-brand-pale py-6">
        <div className="section-shell">
          <Breadcrumbs
            items={[
              { label: "Areas We Serve", href: "/areas-we-serve" },
              { label: "Charlotte, NC" },
              { label: "Garage Door Repair" }
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white py-12 md:py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-brand-red">
              Garage Door Repair in Charlotte
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-ink md:text-5xl">
              Garage Door Repair in Charlotte, NC
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              A malfunctioning garage door can quickly become a major
              inconvenience for homeowners and businesses. Whether your door
              is stuck, making unusual noises, moving unevenly, or refusing to
              open or close, getting professional help can restore safe and
              dependable operation.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Home Fix Solution provides reliable Garage Door Repair in
              Charlotte for residential and commercial properties. Our
              technicians can help diagnose and repair common problems
              involving garage door springs, cables, rollers, tracks, panels,
              openers, and other components.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Whether you need a routine repair or immediate assistance with
              an unexpected breakdown, we are here to help you get your garage
              door working properly again.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="btn-primary"
                aria-label={`Call Home Fix Solution at ${site.phone}`}
              >
                <Phone size={17} />
                Call Now
                <span>{site.phone}</span>
              </a>

              <a href="#book" className="btn-secondary">
  Book Garage Door Repair
</a>
            </div>
          </div>

          <div className="relative min-h-[330px] overflow-hidden rounded-md">
            <Image
              src="/site-images/garage-door-new-installation.jpg"
              alt="Professional garage door service in Charlotte, NC"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Main content + booking */}
      <section className="bg-white pb-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <article>
            {/* Reliable Services */}
            <section>
              <h2 className="text-3xl font-black text-ink md:text-4xl">
                Reliable Garage Door Repair Services in Charlotte
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Your garage door depends on multiple components working
                together correctly. Springs help balance the door, cables
                support its movement, rollers guide it along the tracks, and
                the opener controls automatic operation. When one component
                becomes worn or damaged, it can affect the entire system.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Home Fix Solution provides professional garage door repair
                services for a wide range of issues, including:
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {repairServices.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-brand-blue"
                      size={20}
                    />
                    <span className="font-semibold leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-base leading-8 text-slate-700">
                Our technicians can inspect the garage door system and
                determine the likely cause of the problem before recommending
                the appropriate repair.
              </p>
            </section>

            {/* Emergency */}
            <section className="mt-14">
              <div className="rounded-lg border border-slate-200 bg-brand-pale p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-white p-3 shadow-sm">
                    <Clock3 className="text-brand-red" size={24} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-black text-ink">
                      Emergency Garage Door Repair
                    </h2>

                    <p className="mt-4 text-base leading-8 text-slate-700">
                      Some garage door failures require prompt attention. A
                      door that is stuck open can create a security concern,
                      while a door that will not open may prevent you from
                      accessing your vehicle or garage.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-base leading-8 text-slate-700">
                  Home Fix Solution provides Emergency Garage Door Repair for
                  urgent situations in Charlotte and surrounding communities.
                </p>

                <p className="mt-5 font-black text-ink">
                  Emergency garage door problems may include:
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {emergencyProblems.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-md bg-white p-4"
                    >
                      <ShieldCheck
                        className="mt-0.5 shrink-0 text-brand-red"
                        size={20}
                      />
                      <span className="font-semibold text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-600">
                  Garage door springs and cables can be under significant
                  tension. Trying to repair these components without proper
                  knowledge and equipment can result in additional damage or
                  injury. Professional service is recommended when dealing
                  with serious mechanical failures.
                </p>
              </div>
            </section>

            {/* Residential */}
            <section className="mt-14">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-brand-pale p-3">
                  <Home className="text-brand-blue" size={24} />
                </div>

                <h2 className="text-3xl font-black text-ink md:text-4xl">
                  Residential Garage Door Repair in Charlotte
                </h2>
              </div>

              <p className="mt-5 text-base leading-8 text-slate-700">
                For many homeowners, the garage is one of the most frequently
                used entrances to the property. A reliable garage door makes
                it easier to access your vehicle, storage area, and home.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                When the door becomes noisy, slow, uneven, or difficult to
                operate, the problem should not be ignored.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Our Garage Door Repair in Charlotte services can help
                homeowners address problems involving:
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-md border border-slate-200 p-5">
                  <h3 className="font-black text-ink">Garage Door Springs</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Garage door springs support much of the door's weight
                    during opening and closing. A broken spring can make the
                    door extremely heavy or prevent it from operating
                    correctly.
                  </p>
                </div>

                <div className="rounded-md border border-slate-200 p-5">
                  <h3 className="font-black text-ink">Garage Door Cables</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Cables work with the spring and lifting system to help move
                    the door. If a cable becomes frayed, loose, or broken, the
                    garage door may become unstable or stop functioning
                    properly.
                  </p>
                </div>

                <div className="rounded-md border border-slate-200 p-5">
                  <h3 className="font-black text-ink">Garage Door Rollers</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Worn rollers can cause excessive noise, vibration, or
                    uneven movement. Replacing damaged rollers can help the
                    door move more smoothly along its tracks.
                  </p>
                </div>

                <div className="rounded-md border border-slate-200 p-5">
                  <h3 className="font-black text-ink">Garage Door Tracks</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Bent, damaged, or misaligned tracks can prevent the door
                    from moving correctly. Professional inspection can help
                    determine whether adjustment, repair, or replacement is
                    needed.
                  </p>
                </div>

                <div className="rounded-md border border-slate-200 p-5">
                  <h3 className="font-black text-ink">Garage Door Openers</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    If your automatic garage door opener is not responding,
                    operates inconsistently, or makes unusual sounds, the
                    opener may require troubleshooting or repair.
                  </p>
                </div>
              </div>
            </section>

            {/* Commercial */}
            <section className="mt-14">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-brand-pale p-3">
                  <Building2 className="text-brand-blue" size={24} />
                </div>

                <h2 className="text-3xl font-black text-ink md:text-4xl">
                  Commercial Garage Door Repair in Charlotte
                </h2>
              </div>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Commercial properties often rely on garage doors for loading
                areas, warehouses, service facilities, storage spaces, and
                other daily operations.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                When a commercial garage door stops working, it can interfere
                with deliveries, employees, equipment, and business
                activities.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Home Fix Solution provides Commercial Garage Door Repair for
                businesses and commercial properties in Charlotte. We can
                assist with common problems involving commercial overhead
                doors, sectional doors, rolling doors, openers, springs,
                cables, tracks, and other components.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Prompt attention to garage door problems can help businesses
                minimize disruptions and maintain convenient access to their
                facilities.
              </p>
            </section>

            {/* Signs */}
            <section className="mt-14">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-brand-pale p-3">
                  <Wrench className="text-brand-red" size={24} />
                </div>

                <h2 className="text-3xl font-black text-ink md:text-4xl">
                  Common Signs Your Garage Door Needs Repair
                </h2>
              </div>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Garage door problems are not always sudden. In many cases,
                your system may show warning signs before a major failure
                occurs.
              </p>

              <p className="mt-5 font-black text-ink">
                Contact a professional if you notice:
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {warningSigns.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-md bg-brand-pale p-4"
                  >
                    <ShieldCheck
                      className="mt-0.5 shrink-0 text-brand-red"
                      size={20}
                    />
                    <span className="font-semibold leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-base leading-8 text-slate-700">
                Addressing these signs early may help prevent a small problem
                from becoming a more expensive or disruptive repair.
              </p>
            </section>

            {/* Why Choose */}
            <section className="mt-14">
              <h2 className="text-3xl font-black text-ink md:text-4xl">
                Why Choose Home Fix Solution?
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Choosing the right garage door service provider can make the
                repair process easier and more convenient. Home Fix Solution
                serves residential and commercial customers with a focus on
                dependable service.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-md border border-slate-200 p-5">
                  <h3 className="font-black text-ink">
                    Experienced Technicians
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Garage doors contain several mechanical and electrical
                    components. Our technicians can evaluate common problems
                    and determine what may be affecting your door's operation.
                  </p>
                </div>

                <div className="rounded-md border border-slate-200 p-5">
                  <h3 className="font-black text-ink">
                    Residential and Commercial Service
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    We provide solutions for homeowners, businesses, and
                    commercial properties with different types of garage doors
                    and operating systems.
                  </p>
                </div>

                <div className="rounded-md border border-slate-200 p-5">
                  <h3 className="font-black text-ink">
                    Convenient Scheduling
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    We understand that garage door problems can interrupt your
                    daily routine. Our scheduling options make it easier to
                    arrange professional service.
                  </p>
                </div>

                <div className="rounded-md border border-slate-200 p-5">
                  <h3 className="font-black text-ink">
                    Wide Service Coverage
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Home Fix Solution serves customers across more than 30
                    U.S. states, providing home and property services to
                    customers throughout our service network.
                  </p>
                </div>

                <div className="rounded-md border border-slate-200 p-5 sm:col-span-2">
                  <h3 className="font-black text-ink">
                    Focus on Safe Operation
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Garage doors are heavy mechanical systems. Professional
                    inspection and repair can help address problems while
                    keeping safe operation in mind.
                  </p>
                </div>
              </div>
            </section>

            {/* Charlotte */}
            <section className="mt-14">
              <h2 className="text-3xl font-black text-ink md:text-4xl">
                Serving Charlotte Homeowners and Businesses
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Charlotte is home to a wide variety of residential
                neighborhoods, businesses, commercial properties, and
                facilities that depend on properly functioning garage doors.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                From residential garages to commercial loading areas, garage
                doors provide important access to properties every day.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Home Fix Solution helps customers throughout Charlotte with
                common garage door problems, including damaged springs, broken
                cables, worn rollers, track issues, opener problems, and other
                operating concerns.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                If you are experiencing an unexpected breakdown, our Emergency
                Garage Door Repair service can help you address urgent
                problems that affect access or normal operation.
              </p>
            </section>

            {/* Timely Repairs */}
            <section className="mt-14">
              <h2 className="text-3xl font-black text-ink md:text-4xl">
                Protect Your Garage Door With Timely Repairs
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Regular attention can help keep your garage door operating
                reliably. If you notice unusual sounds, slow movement, visible
                damage, or changes in how the door opens and closes, it may be
                time to have the system inspected.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Ignoring a developing problem can sometimes place additional
                stress on other components. For example, a damaged roller or
                misaligned track may affect the way the door moves, while a
                worn spring can place additional strain on the opener.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Professional inspection and repair can help identify the
                problem and determine the appropriate solution.
              </p>
            </section>

        

            {/* FAQ */}
            <section className="mt-14">
              <h2 className="text-3xl font-black text-ink md:text-4xl">
                Frequently Asked Questions
              </h2>

              <div className="mt-6 grid gap-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-md border border-slate-200 bg-white p-5"
                  >
                    <summary className="cursor-pointer list-none pr-8 text-lg font-black text-ink">
                      {faq.question}
                    </summary>

                    <p className="mt-4 leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          {/* Booking Form */}
          <aside
            id="book"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <BookingForm compact />
          </aside>
        </div>
      </section>
    </>
  );
}