import { render, screen, fireEvent, getByText } from "@testing-library/react"
import { LoginPage } from "./LoginPage"


describe('LoginPage', () => {
	it('should render correctly', () => {
		render(<LoginPage/>);

        expect(screen.getByText('Sign In With Google')).toBeInTheDocument();
	})

})