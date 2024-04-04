import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Button from '../../Button'

test("Renders the main page", () => {
    render(<Button value="rachli"/>)
    expect(true).toBeTruthy()
})