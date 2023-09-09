import { render, screen, fireEvent, getByText } from "@testing-library/react"
import { signInWithPopup, signOut, getAuth } from "firebase/auth"
import { Header } from "./Header";

jest.mock("firebase/auth", () => {
    return {
      getAuth: jest.fn(),
      GoogleAuthProvider: jest.fn(),
      signOut: jest.fn(),
    };
  });
describe('Header', () => {
	it('should render correctly', () => {
		render(<Header/>);

        expect(screen.getByText('Logout')).toBeInTheDocument();
	})

    it("should call the signOut", () => {
        render(<Header/>);
 
        const signOutButton = screen.getByText("Logout");
        
        fireEvent.click(signOutButton);
        
        expect(signOut).toHaveBeenCalled();
      });

})