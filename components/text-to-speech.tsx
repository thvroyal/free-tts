"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Download, Loader2, Play } from "lucide-react";
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

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<LanguageCode>("en-US");
  const [voiceStyle, setVoiceStyle] = useState<VoiceName>(
    "Orus"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handleDownload = () => {
    if (!audioUrl) return;

    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `speech-${new Date().getTime()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Enter your text</Label>
          <Textarea
            id="text"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="voice-style">Voice</Label>
            <Select value={voiceStyle} onValueChange={setVoiceStyle}>
              <SelectTrigger id="voice-style">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {voiceStyles.map((style) => (
                  <SelectItem key={style.id} value={style.id}>
                    {style.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {audioUrl && (
          <div className="pt-4">
            <Label htmlFor="audio-preview">Preview</Label>
            <div className="mt-2 p-4 bg-muted rounded-md">
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
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          onClick={handleGenerate}
          disabled={!text.trim() || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Generate Speech
            </>
          )}
        </Button>

        {audioUrl && (
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download MP3
          </Button>
        )}
      </CardFooter>
      <div className="text-center text-xs text-muted-foreground pb-3">
        The API is powered by{" "}
        <a
          href="https://labs.google/lll/en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Little Language Lessons
        </a>
        .
      </div>
    </Card>
  );
}
