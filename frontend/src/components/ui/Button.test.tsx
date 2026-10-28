import { afterEach, describe, it, expect } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Button from './Button'

// Cleans DOM after each test to prevent memory leaks and ensure a clean state for the next test
afterEach(cleanup)

describe('Button', () => {
  it('shows the text it receives', () => {
    render(<Button>Edit</Button>)
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
  })

  it('applies the danger variant from Button', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })
})
//Remember to run the tests using the command: npm run lint && npm test && npm run build