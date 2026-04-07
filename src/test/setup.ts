import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Polyfill getAnimations for HeadlessUI transitions in jsdom
if (typeof Element.prototype.getAnimations === 'undefined') {
  Element.prototype.getAnimations = () => []
}

vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn(() => undefined),
    set: vi.fn(),
    delete: vi.fn(),
  }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
  redirect: vi.fn(),
}))

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props
    return `<img ${Object.entries(rest).map(([k, v]) => `${k}="${v}"`).join(' ')} />`
  },
}))
