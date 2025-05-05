"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Download, Play } from "lucide-react"
import { generateSpeech, LanguageCode, VoiceName } from "@/lib/google-lll-tts"
// These are placeholder data - replace with your actual supported languages and voices
const languages = [
  { id: "en-US", name: "English (US)" },
  { id: "es-ES", name: "Spanish (Spain)" },
  { id: "fr-FR", name: "French (France)" },
  { id: "de-DE", name: "German (Germany)" },
  { id: "it-IT", name: "Italian (Italy)" },
]

const voiceStyles = [
  { id: "en-US-Chirp3-HD-Orus", name: "Chirp3 HD Orus" },
]

export default function TextToSpeech() {
  const [text, setText] = useState("")
  const [language, setLanguage] = useState<LanguageCode>("en-US")
  const [voiceStyle, setVoiceStyle] = useState<VoiceName>("en-US-Chirp3-HD-Orus")
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleGenerate = async () => {
    if (!text.trim()) return

    setIsGenerating(true)
    setAudioUrl(null)

    try {
      const dataBase64 = await generateSpeech(text, language, voiceStyle)
      const url = `data:audio/mp3;base64,${dataBase64}`
      setAudioUrl(url)
    } catch (error) {
      console.error("Error generating speech:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!audioUrl) return

    const a = document.createElement("a")
    a.href = audioUrl
    a.download = `speech-${new Date().getTime()}.mp3`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Convert Text to Speech</CardTitle>
      </CardHeader>
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
            <Label htmlFor="voice-style">Voice Style</Label>
            <Select value={voiceStyle} onValueChange={setVoiceStyle}>
              <SelectTrigger id="voice-style">
                <SelectValue placeholder="Select voice style" />
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
              <audio ref={audioRef} id="audio-preview" controls className="w-full" src={audioUrl}>
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button onClick={handleGenerate} disabled={!text.trim() || isGenerating}>
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
    </Card>
  )
}
