import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { LoopVideo as LoopVideoData } from '../../data/media'

interface NetworkInformation {
  saveData?: boolean
  effectiveType?: string
}

/**
 * A short, silent looping clip.
 *
 * Nothing loads up front: the poster is a lazy image (a video's `poster`
 * attribute would be fetched with the page), and the video itself
 * (preload="none") downloads only once it scrolls into view. It plays only
 * while visible and never starts by itself when the visitor prefers reduced
 * motion, has Data Saver on or is on a slow (2G/3G) connection; then the
 * poster stays and the button starts it. The button always pauses or resumes it.
 */
export function LoopVideo({ video, className = '' }: { video: LoopVideoData; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  // Once the visitor pauses or plays by hand, scrolling no longer overrides them.
  const choiceRef = useRef<'play' | 'pause' | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
    const saveData = connection?.saveData === true
    const slowNetwork = ['slow-2g', '2g', '3g'].includes(connection?.effectiveType ?? '')
    const autoplay = !reduceMotion && !saveData && !slowNetwork

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wanted = choiceRef.current ?? (autoplay ? 'play' : 'pause')
        if (entry.isIntersecting && wanted === 'play') element.play().catch(() => setPlaying(false))
        else if (!entry.isIntersecting) element.pause()
      },
      { threshold: 0.4 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const element = ref.current
    if (!element) return
    if (element.paused) {
      choiceRef.current = 'play'
      element.play().catch(() => setPlaying(false))
    } else {
      choiceRef.current = 'pause'
      element.pause()
    }
  }

  return (
    <div className={`photo-frame bg-ink ${className}`}>
      <img
        src={video.poster}
        alt=""
        width={video.width}
        height={video.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        width={video.width}
        height={video.height}
        aria-label={`${video.title}: ${video.description}`}
        onPlaying={() => setStarted(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${started ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src={video.webm} type='video/webm; codecs="vp9"' />
        <source src={video.mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? 'Pause' : 'Play'} video: ${video.title}`}
        className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-ink/70 text-paper backdrop-blur-sm transition-colors hover:bg-ink"
      >
        {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4 translate-x-px" />}
      </button>
    </div>
  )
}
