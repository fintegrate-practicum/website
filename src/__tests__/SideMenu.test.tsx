import SideMenu from '../componnents/menu/SideMenu'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';

test("Renders the menu page", () => {
    render(<MemoryRouter><SideMenu /></MemoryRouter>)
    expect(true).toBeTruthy()
})

test('renders Home link', () => {
    render(<MemoryRouter><SideMenu /></MemoryRouter>);
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
});
test('renders Calendar link', () => {
    render(<MemoryRouter><SideMenu /></MemoryRouter>);
    const calendarLink = screen.getByText(/calendar/i);
    expect(calendarLink).toBeInTheDocument();
});
test('renders Orders link', () => {
    render(<MemoryRouter><SideMenu /></MemoryRouter>);
    const ordersLink = screen.getByText(/orders/i);
    expect(ordersLink).toBeInTheDocument();
});
test('renders Employees link', () => {
    render(<MemoryRouter><SideMenu /></MemoryRouter>);
    const employeesLink = screen.getByText(/employees/i);
    expect(employeesLink).toBeInTheDocument();
});
test('renders Inventory link', () => {
    render(<MemoryRouter><SideMenu /></MemoryRouter>);
    const inventoryLink = screen.getByText(/inventory/i);
    expect(inventoryLink).toBeInTheDocument();
});
test('renders Other link', () => {
    render(<MemoryRouter><SideMenu /></MemoryRouter>);
    const otherLink = screen.getByText(/other/i);
    expect(otherLink).toBeInTheDocument();
});
