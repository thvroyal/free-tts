import TextToSpeech from "@/components/text-to-speech"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Text to Speech Converter</h1>
      <TextToSpeech />
    </main>
  );
}
