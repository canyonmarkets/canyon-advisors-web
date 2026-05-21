import { Award, Users, MapPin, Briefcase } from 'lucide-react';

const STATS = [
  { value: '30+',  label: 'Years in Business'         },
  { value: '7',    label: 'Brothers — One Team'        },
  { value: '3',    label: 'Licensed States'            },
  { value: '75+',  label: 'Years Combined Experience'  },
] as const;

const CREDENTIALS = [
  { icon: Award,    text: 'PhD & MBA on staff'                     },
  { icon: Briefcase, text: 'Three licensed General Contractors'    },
  { icon: MapPin,   text: 'Licensed in Arizona, Texas & Tennessee' },
  { icon: Users,    text: 'Active investors and operators'         },
] as const;

export default function TheFirm() {
  return (
    <section id="about" className="bg-white px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div>
            <p className="text-brand-600 font-mono text-base tracking-[0.3em] uppercase mb-4">
              Who We Are
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-iron-900 mb-8">
              A Family Built on Real Estate
            </h2>
            <div className="flex flex-col gap-5 text-iron-900 text-base leading-relaxed">
              <p>
                Canyon Advisors was founded in Phoenix in 1993 by a family of seven brothers
                with a single belief: that real estate, done right, creates lasting financial
                freedom. What began as a Phoenix brokerage has grown into a multi-market
                advisory and investment firm serving clients across Arizona, Texas, and Tennessee.
              </p>
              <p>
                Our team brings together over 75 years of combined real estate and construction
                experience. We are not a corporate firm — we are an owner-operated family
                business where every client relationship is personal. The same brothers who
                founded this company are still the ones answering your calls.
              </p>
              <p>
                Whether you are a first-time investor trying to understand the market, an
                experienced buyer looking for off-market deals, or a family working toward
                homeownership — we have likely been in your exact situation and helped
                someone through it.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-10 flex flex-col gap-4">
              {CREDENTIALS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-semibold text-iron-900">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map(({ value, label }) => (
              <div key={label}
                className="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-stone-50 p-8 hover:border-brand-300 hover:bg-white hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300">
                <span className="font-display font-bold text-5xl text-brand-600 leading-none">
                  {value}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-iron-600 leading-snug">
                  {label}
                </span>
              </div>
            ))}

            {/* Markets served */}
            <div className="col-span-2 rounded-2xl bg-iron-900 p-8">
              <p className="text-brand-500 font-mono text-xs tracking-[0.2em] uppercase mb-3">
                Markets Served
              </p>
              <div className="flex flex-wrap gap-3">
                {['Phoenix, AZ', 'Dallas, TX', 'Memphis, TN', 'Nationwide'].map((city) => (
                  <span key={city}
                    className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-semibold text-white">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
