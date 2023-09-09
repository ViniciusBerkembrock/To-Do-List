import { render, screen, fireEvent, getByText } from "@testing-library/react"
import { LoginPage } from "./LoginPage"
import { signInWithPopup, signOut, getAuth } from "firebase/auth"

jest.mock("firebase/auth", () => {
    return {
      getAuth: jest.fn(),
      GoogleAuthProvider: jest.fn(),
      signInWithPopup: jest.fn(),
      signOut: jest.fn(),
    };
  });

  const mockNavigate = jest.fn();
  jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate
}))

describe('LoginPage', () => {
	it('should render correctly', () => {
		render(<LoginPage/>);

        expect(screen.getByText('Sign In With Google')).toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
	})

    test("should call the signInWithPopup", () => {
        render(<LoginPage />);
 
        const signInButton = screen.getByText("Sign In With Google");
        
        fireEvent.click(signInButton);
        
        expect(signInWithPopup).toHaveBeenCalled();
      });

      test("should call the signOut", () => {
        render(<LoginPage />);
 
        const signInButton = screen.getByText("Sign Out");
        
        fireEvent.click(signInButton);
        
        expect(signOut).toHaveBeenCalled();
      });

})