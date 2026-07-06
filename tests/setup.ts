import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

window.HTMLElement.prototype.scrollIntoView = function() {};

afterEach(() => {
  cleanup()
})
