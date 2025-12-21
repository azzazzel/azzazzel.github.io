export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    patchGetComputedStyleForDisqus()
  }
})

function patchGetComputedStyleForDisqus() {
  const colorMode = useColorMode()
  const originalGetComputedStyle = window.getComputedStyle

  window.getComputedStyle = function (element, pseudoElement) {
    const styles = originalGetComputedStyle.call(window, element, pseudoElement)

    return new Proxy(styles, {
      get(target, prop) {
        const value = Reflect.get(target, prop)

        if (prop === 'getPropertyValue' && typeof value === 'function') {
          return function (propertyName: string) {
            const result = value.call(target, propertyName)
            return convertOklchToRgb(result, propertyName, colorMode.value)
          }
        }

        if (typeof value === 'function') {
          return value.bind(target)
        }

        return convertOklchToRgb(value, prop, colorMode.value)
      },
    })
  } as typeof window.getComputedStyle
}

function convertOklchToRgb(value: any, prop: string | symbol, colorMode: string): any {
  if (typeof value !== 'string' || !value.includes('oklch')) return value

  const isDark = colorMode === 'dark'

  if (prop === 'backgroundColor' || prop === 'background-color') {
    return isDark ? 'rgb(21, 21, 21)' : 'rgb(255, 255, 255)'
  }

  if (prop === 'color') {
    return isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
  }

  if (prop === 'borderColor' || prop === 'border-color' || String(prop).includes('border')) {
    return isDark ? 'rgb(64, 64, 64)' : 'rgb(229, 229, 229)'
  }

  return 'transparent'
}
