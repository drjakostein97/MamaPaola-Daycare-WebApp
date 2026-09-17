import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import i18n from '../i18n'

afterEach(() => {
  cleanup()
  i18n.changeLanguage('en')
})
