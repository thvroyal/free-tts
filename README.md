# Free TTS

Free TTS is an open-source text-to-speech web application that leverages Google's Labs Language Model API to convert text into natural-sounding speech.


## Features

- Convert text to natural-sounding speech
- Multiple language support
- High-quality voice options 
- Instant audio preview
- Download generated audio as MP3
- Clean, modern UI built with Next.js and Tailwind CSS

## Demo

Try it out at: [https://free-tts.thvroyal.workers.dev/](https://free-tts.thvroyal.workers.dev/)

## Technology Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudflare](https://cloudflare.com/) for deployment
- Google's Labs Language Model API for speech synthesis

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/thvroyal/free-tts.git
   cd free-tts
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   Create a `.dev.vars` file in the root directory with:
   ```
   # Add your environment variables here
   ```

4. Start the development server
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

The project is set up to deploy to Cloudflare:

```bash
pnpm deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project uses Google's Labs Language Model API for text-to-speech conversion
- UI components from shadcn/ui
