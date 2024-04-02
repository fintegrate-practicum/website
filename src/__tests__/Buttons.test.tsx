import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import React from 'react'
import Button from '../../Buttons'

test("Renders the main page", () => {
    render(<Button value="rachli"/>)
    expect(true).toBeTruthy()
})