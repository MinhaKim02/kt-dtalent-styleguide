// 프론트 레포의 design/tokens.json을 그대로 읽는다. 값을 여기서 고치지 않는다
import raw from '@fe-design/tokens.json'

export type Token = { name: string; value: string; usage?: string }
export type TypeStyle = { name: string; fontSize: string; lineHeight: string; fontWeight: number; letterSpacing?: string; sample?: string; usage?: string }

type Raw = {
  color: { tokens: Token[] }
  type: { families: Record<string, string>; groups: { name: string; styles: TypeStyle[] }[] }
  spacing: { tokens: Token[] }
  radius: { tokens: Token[] }
  size: { tokens: Token[] }
  shadow: { tokens: Token[] }
  motion: { tokens: Token[] }
  zIndex: { tokens: Token[] }
}
export const tokens = raw as unknown as Raw

// 설명 끝의 날짜 메모(예: "(11/12)")는 작업 기록이라 문서에서는 뺀다
export const usage = (t: { usage?: string }) => (t.usage ?? '').replace(/\s*\(\d{1,2}\/\d{1,2}\)/g, '').trim()

const colorMap = Object.fromEntries(tokens.color.tokens.map((c) => [c.name, c.value]))

// {gray-900} 같은 참조를 실제 값으로
export function resolveColor(value: string): string {
  const m = /^\{(.+)\}$/.exec(value)
  return m ? resolveColor(colorMap[m[1]]) : value
}
export const aliasOf = (value: string) => /^\{(.+)\}$/.exec(value)?.[1]

// 흰 바탕 위 대비(WCAG). 반투명 색은 흰 바탕에 섞은 값으로 계산한다
export function contrastOnWhite(color: string) {
  const rgb = toRgb(color)
  if (!rgb) return null
  const lum = ([r, g, b]: number[]) => {
    const c = [r, g, b].map((v) => {
      const s = v / 255
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  }
  const l = lum(rgb)
  return (1.05) / (l + 0.05)
}

function toRgb(color: string): number[] | null {
  const hex = /^#([0-9a-f]{6})$/i.exec(color)
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16))
  const rgba = /rgba?\(([^)]+)\)/.exec(color)
  if (rgba) {
    const [r, g, b, a = 1] = rgba[1].split(',').map((v) => Number(v.trim()))
    return [r, g, b].map((v) => Math.round(v * a + 255 * (1 - a)))
  }
  return null
}
