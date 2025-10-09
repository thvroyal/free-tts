"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateSpeech, LanguageCode, VoiceName } from "@/lib/google-lll-tts";
import { AudioLines, Download, Loader2, Play, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

const languages = [
  { id: "en-US", name: "English (US)" },
  { id: "en-GB", name: "English (UK)" },
  { id: "vi-VN", name: "Vietnamese (Vietnam)" },
  { id: "es-ES", name: "Spanish (Spain)" },
  { id: "fr-FR", name: "French (France)" },
  { id: "de-DE", name: "German (Germany)" },
  { id: "it-IT", name: "Italian (Italy)" },
];

const voiceStyles = [
  { id: "Puck", name: "Puck" },
  { id: "Charon", name: "Charon" },
  { id: "Kore", name: "Kore" },
  { id: "Fenrir", name: "Fenrir" },
  { id: "Aoede", name: "Aoede" },
  { id: "Leda", name: "Leda" },
  { id: "Orus", name: "Orus" },
  { id: "Zephyr", name: "Zephyr" },
];

const quickPresets: Array<{
  label: string;
  description: string;
  text: string;
  language?: LanguageCode;
  voice?: VoiceName;
}> = [
  {
    label: "Product teaser",
    description: "Warm & inviting",
    text: "Introducing Luma Desk – the adjustable workstation that remembers your perfect posture. Tap the preset, stand tall, and keep your focus locked on what matters most.",
    voice: "Aoede",
  },
  {
    label: "Learning module",
    description: "Crisp & clear",
    text: "In this lesson, we will explore the building blocks of narrative writing. You'll learn how conflict drives a story forward and how to balance pacing with vivid detail.",
    voice: "Orus",
  },
  {
    label: "Customer support",
    description: "Friendly & reassuring",
    text: "Thanks for reaching out! I can see that your order shipped this morning. I'll keep an eye on tracking and send an update as soon as it lands on your doorstep.",
    voice: "Leda",
  },
  {
    label: "Global greeting",
    description: "en Español",
    text: "Bienvenido a nuestra demo interactiva. Explora las funciones, escucha las voces disponibles y comparte tus comentarios con el equipo en cualquier momento.",
    language: "es-ES",
    voice: "Zephyr",
  },
];

const MAX_CHARACTERS = 600;

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<LanguageCode>("en-US");
  const [voiceStyle, setVoiceStyle] = useState<VoiceName>("Orus");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const charactersRemaining = MAX_CHARACTERS - text.length;
  const counterTone = charactersRemaining <= 40 ? "text-primary" : "text-muted-foreground";
  const isGenerateDisabled = !text.trim() || isGenerating;

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    setAudioUrl(null);

    try {
      const dataBase64 = await generateSpeech(text, language, voiceStyle);
      const url = `data:audio/mp3;base64,${dataBase64}`;
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating speech:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTextChange = (value: string) => {
    if (value.length > MAX_CHARACTERS) {
      setText(value.slice(0, MAX_CHARACTERS));
      return;
    }

    setText(value);
  };

  const handleDownload = () => {
    if (!audioUrl) return;

    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `speech-${new Date().getTime()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePreset = (preset: (typeof quickPresets)[number]) => {
    const presetText = preset.text.slice(0, MAX_CHARACTERS);
    setText(presetText);
    if (preset.language) {
      setLanguage(preset.language);
    }
    if (preset.voice) {
      setVoiceStyle(preset.voice);
    }
    setAudioUrl(null);
  };

  const handleReset = () => {
    setText("");
    setAudioUrl(null);
    setLanguage("en-US");
    setVoiceStyle("Orus");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <Card className="relative mx-auto w-full max-w-4xl overflow-hidden border-white/30 bg-white/80 shadow-xl backdrop-blur-lg dark:border-white/10 dark:bg-white/[0.04]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_100%_at_50%_0%,_theme(colors.primary/12),_transparent)]" />
      <CardHeader className="relative border-b border-white/40 pb-8 dark:border-white/10">
        <CardTitle className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Eleven-inspired text to speech lab
        </CardTitle>
        <CardDescription className="max-w-2xl text-sm leading-relaxed">
          Paste your script, choose a voice vibe, and spin up natural audio that feels at home inside ElevenLabs experiences.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-8 py-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <Label htmlFor="text" className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Script
              </Label>
              <p className="text-sm text-muted-foreground">
                Need inspiration? Load a preset below or start typing and we’ll keep track of your character budget.
              </p>
            </div>
            <span
              className={`inline-flex h-9 items-center rounded-full border border-white/40 px-4 text-xs font-medium uppercase tracking-[0.2em] shadow-sm backdrop-blur dark:border-white/10 ${counterTone}`}
              aria-live="polite"
            >
              {text.length} / {MAX_CHARACTERS} chars
            </span>
          </div>
          <Textarea
            id="text"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(event) => handleTextChange(event.target.value)}
            className="min-h-[220px] resize-y rounded-2xl border-white/50 bg-white/90 px-5 py-4 text-base leading-relaxed shadow-inner focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-white/10 dark:bg-white/[0.02]"
          />
          <div className="flex flex-wrap gap-2">
            {quickPresets.map((preset) => (
              <Button
                key={preset.label}
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition hover:border-primary/60 hover:bg-primary/10 dark:border-white/10 dark:bg-white/[0.08]"
                onClick={() => handlePreset(preset)}
              >
                <span className="font-semibold">{preset.label}</span>
                <span className="pl-2 text-muted-foreground">· {preset.description}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4 rounded-2xl border border-white/40 bg-white/80 p-6 shadow-md dark:border-white/10 dark:bg-white/[0.04]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Voice control
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="language" className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Language
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Align the delivery with your audience.
                  </p>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger
                    id="language"
                    className="h-11 rounded-xl border-white/40 bg-white/80 text-left text-sm font-medium dark:border-white/10 dark:bg-white/[0.06]"
                  >
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-white/30 bg-background shadow-lg">
                    {languages.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="voice-style" className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Voice
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Choose the personality of the narrator.
                  </p>
                </div>
                <Select value={voiceStyle} onValueChange={setVoiceStyle}>
                  <SelectTrigger
                    id="voice-style"
                    className="h-11 rounded-xl border-white/40 bg-white/80 text-left text-sm font-medium dark:border-white/10 dark:bg-white/[0.06]"
                  >
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-white/30 bg-background shadow-lg">
                    {voiceStyles.map((style) => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/40 bg-white/80 p-6 shadow-md dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Preview
              </h3>
              {audioUrl ? (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Listen back instantly. Adjust your script or settings and generate again to iterate.
                  </p>
                  <div className="rounded-xl border border-white/40 bg-background/80 p-4 shadow-inner dark:border-white/10">
                    <audio
                      ref={audioRef}
                      id="audio-preview"
                      controls
                      controlsList="nodownload"
                      className="w-full"
                      src={audioUrl}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex flex-col items-start gap-4 rounded-xl border border-dashed border-primary/40 bg-primary/10 p-6 text-primary dark:border-primary/50 dark:bg-primary/10/80">
                  <AudioLines className="h-8 w-8" />
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-foreground">No audio yet.</p>
                    <p className="text-muted-foreground">
                      Generate speech to hear your script. Quick presets are a fast way to preview tone and pacing.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-white/40 bg-white/80 p-6 text-xs text-muted-foreground shadow-md dark:border-white/10 dark:bg-white/[0.04]">
              The API is powered by{" "}
              <a
                href="https://labs.google/lll/en"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Little Language Lessons
              </a>
              . Audio stays local to your browser session.
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative flex flex-col gap-4 border-t border-white/40 py-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>Language: {languages.find((item) => item.id === language)?.name}</span>
          <span>Voice: {voiceStyles.find((item) => item.id === voiceStyle)?.name}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className="gap-2 rounded-full px-4 py-2"
            onClick={handleReset}
            disabled={!text && !audioUrl}
          >
            <RotateCcw className="h-4 w-4" /> Reset session
          </Button>
          {audioUrl && (
            <Button
              type="button"
              variant="secondary"
              className="gap-2 rounded-full px-5 py-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" /> Download MP3
            </Button>
          )}
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerateDisabled}
            className="gap-2 rounded-full px-6 py-2"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Generate speech
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
