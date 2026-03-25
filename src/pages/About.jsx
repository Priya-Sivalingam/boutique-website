import { Link } from 'react-router-dom'

const values = [
  {
    icon: '🌸',
    title: 'Sustainably Sourced',
    desc: 'Every fabric is chosen with the planet in mind — organic, recycled, and responsibly made.',
  },
  {
    icon: '✂️',
    title: 'Thoughtfully Crafted',
    desc: 'Small-batch production means every piece gets the attention it deserves.',
  },
  {
    icon: '💌',
    title: 'Made for Her',
    desc: 'Designed by women, for women — celebrating softness, strength, and style.',
  },
  {
    icon: '♻️',
    title: 'Conscious Fashion',
    desc: 'We believe fashion should feel good — to wear and to the world around us.',
  },
]

const team = [
  {
    name: 'Isabelle Laurent',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format',
  },
  {
    name: 'Sofia Reyes',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format',
  },
  {
    name: 'Amara Chen',
    role: 'Styling & Curation',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&auto=format',
  },
]

const About = () => {
  return (
    <div className="bg-cream">

      {/* ══════════════════════════════════
           HERO
      ══════════════════════════════════ */}
      <section className="relative w-full min-h-[60vh] flex items-center
        justify-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&auto=format"
          alt="About Lumière"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-blush/60" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-tight">
            Born from a Love of
            <span className="text-mauve italic"> Softness</span>
          </h1>
        </div>
      </section>


      {/* ══════════════════════════════════
           STORY SECTION
      ══════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-4">
          How It Began
        </p>
        <h2 className="font-serif text-4xl text-charcoal mb-8">
          A Boutique Built on Feeling
        </h2>
        <div className="flex flex-col gap-5 font-sans text-sm
          text-charcoal/70 leading-relaxed text-left">
          <p>
            Lumière was born in a small Parisian apartment in 2019, when founder
            Isabelle Laurent grew tired of choosing between style and sustainability.
            She believed fashion could be both beautiful and kind — to the wearer,
            and to the world.
          </p>
          <p>
            What started as a curated collection of ten handpicked pieces has grown
            into a boutique loved by thousands of women across the globe. Every
            collection is small-batch, every fabric ethically sourced, and every
            silhouette designed to make you feel like the softest, most luminous
            version of yourself.
          </p>
          <p>
            At Lumière, we don't follow trends — we create timeless pieces that
            live in your wardrobe for years, not seasons.
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════
           VALUES GRID
      ══════════════════════════════════ */}
      <section className="bg-blush py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              What We Stand For
            </p>
            <h2 className="font-serif text-4xl text-charcoal">Our Values</h2>
            <div className="w-16 h-px bg-mauve mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <div key={i}
                className="bg-cream p-8 text-center flex flex-col
                  items-center gap-4 hover:shadow-md transition-shadow duration-300">
                <span className="text-4xl">{val.icon}</span>
                <h3 className="font-serif text-xl text-charcoal">{val.title}</h3>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
           TEAM SECTION
      ══════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-2">
            The People Behind Lumière
          </p>
          <h2 className="font-serif text-4xl text-charcoal">Meet the Team</h2>
          <div className="w-16 h-px bg-mauve mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <div key={i} className="text-center group">
              <div className="overflow-hidden bg-blush aspect-square mb-5 mx-auto
                max-w-[260px]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top
                    group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xl text-charcoal">{member.name}</h3>
              <p className="font-sans text-xs text-mauve tracking-widest
                uppercase mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════
           CTA BANNER
      ══════════════════════════════════ */}
      <section className="bg-mauve py-20 text-center px-6">
        <h2 className="font-serif text-4xl text-white mb-4">
          Ready to Find Your Piece?
        </h2>
        <p className="font-sans text-sm text-white/70 mb-8 max-w-md mx-auto">
          Explore our latest collection — curated with love, made to last.
        </p>
        <Link
          to="/catalog"
          className="inline-block bg-white text-mauve font-sans text-xs
            tracking-widest uppercase px-12 py-4
            hover:bg-blush transition-colors duration-300"
        >
          Shop the Collection
        </Link>
      </section>

    </div>
  )
}

export default About