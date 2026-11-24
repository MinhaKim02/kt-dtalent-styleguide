import { useEffect, useState } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 스크롤해서 화면에 들어오는 구역을 하나씩 떠오르게 한다. 한 번 나타나면 다시 숨기지 않는다.
// 처음 화면 안에 있는 구역은 바로 나타난다. 동작 줄이기면 아무것도 숨기지 않는다
export function useReveal(key: string) {
  useEffect(() => {
    if (reduced()) return
    const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    targets.forEach((el) => el.classList.add('reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}

// 0에서 목표 숫자까지 세어 올라간다(처음 화면의 숫자 요약)
export function useCountUp(target: number, duration = 900) {
  const [n, setN] = useState(() => (reduced() ? target : 0))
  useEffect(() => {
    if (reduced()) return setN(target)
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      // 빨리 오르다 천천히 멈춘다
      setN(Math.round(target * (1 - (1 - p) ** 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return n
}
