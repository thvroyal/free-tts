import TextToSpeech from "@/components/text-to-speech"
import {
  Languages,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Waves,
} from "lucide-react"

const highlights = [
  {
    icon: Sparkles,
    title: "Studio-grade clarity",
    description:
      "Harness expressive voices that capture nuance, pacing, and natural intonation for every line of your script.",
  },
  {
    icon: Languages,
    title: "Multilingual palette",
    description:
      "Swap seamlessly between languages and dialects while keeping tone and personality consistent across takes.",
  },
  {
    icon: SlidersHorizontal,
    title: "Fine-grained control",
    description:
      "Dial in the delivery with tailored voice styles and instant previews before you ever hit download.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Your inputs never leave this page. Audio is generated on demand and stays in your session until you reset.",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="pointer-events-none absolute inset-x-0 top-[-10rem] h-[32rem] bg-[radial-gradient(circle_at_top,_theme(colors.primary/20),_transparent_65%)]" />
      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/40 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
            <Waves className="h-3.5 w-3.5" /> Real-time neural synthesis
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Bring your words to life with production-ready speech
          </h1>
          <p className="mt-6 text-balance text-base text-muted-foreground sm:text-lg">
            Craft narrations, product explainers, podcasts, or prototypes using the same design language that powers ElevenLabs UI. Experiment with rich voice styles, preview instantly, and export crystal-clear MP3s in seconds.
          </p>
        </div>

        <TextToSpeech />

        <div className="grid gap-6 rounded-2xl border border-white/30 bg-white/60 p-6 shadow-xl backdrop-blur md:grid-cols-2 dark:border-white/5 dark:bg-white/[0.04]">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-white/40 bg-white/80 p-6 text-left shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
