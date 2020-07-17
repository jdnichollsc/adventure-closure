import { useState, useEffect, useCallback } from 'react'

// Add or remove the "dark" class based on if the media query matches
function toggleDarkTheme(shouldAdd: boolean) {
  document.body.classList.toggle('dark', shouldAdd);
}
// Dark theme enabled by default
const enabledTheme = true
toggleDarkTheme(enabledTheme);

export const useDarkTheme = function () {
  const [enabled, setEnabled] = useState<boolean>(enabledTheme)

  const onToggle = useCallback((enabled: boolean) => {
    toggleDarkTheme(enabled)
    setEnabled(enabled)
  }, [])

  const prefersDarkToggle = (mediaQuery: MediaQueryListEvent): any => onToggle(mediaQuery.matches)

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener(prefersDarkToggle)

    return () => prefersDark.removeListener(prefersDarkToggle)
  }, [])

  return {
    enabled,
    onToggle
  }
}