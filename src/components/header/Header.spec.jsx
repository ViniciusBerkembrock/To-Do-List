import { render, screen } from "@testing-library/react"
import { Header } from "./Header";
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

jest.mock("firebase/auth", () => {
    return {
      getAuth: jest.fn(),
      GoogleAuthProvider: jest.fn(),
      signOut: jest.fn(),
    };
  });

  jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useContext: jest.fn(),
  }));

  const mockCurrentUser = {
    displayName: "Test User",
    photoURL: "test-avatar.jpg",
  };


describe('Header', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

      it("Renderiza o componente", () => {
        useContext.mockReturnValue({ currentUser: null }); // Define currentUser como null para este teste
        render(
          <AuthContext.Provider value={{ currentUser: null }}>
            <Header />
          </AuthContext.Provider>
        );
        const headerElement = screen.getByText("To Do List");
        expect(headerElement).toBeInTheDocument();
      });

      it("Exibe informações do usuário quando currentUser está definido", () => {
        useContext.mockReturnValue({ currentUser: mockCurrentUser }); // Define currentUser com um valor para este teste
        render(
          <AuthContext.Provider value={{ currentUser: mockCurrentUser }}>
            <Header />
          </AuthContext.Provider>
        );
        const avatarElement = screen.getByAltText("Avatar");
        const nameElement = screen.getByText("Test User");
        const logoutButtonElement = screen.getByText("Logout");
    
        expect(avatarElement).toBeInTheDocument();
        expect(nameElement).toBeInTheDocument();
        expect(logoutButtonElement).toBeInTheDocument();
      });

      it("Não exibe informações do usuário quando currentUser é nulo", () => {
        useContext.mockReturnValue({ currentUser: null }); // Define currentUser como null para este teste
        render(
          <AuthContext.Provider value={{ currentUser: null }}>
            <Header />
          </AuthContext.Provider>
        );
        const avatarElement = screen.queryByAltText("Avatar");
        const nameElement = screen.queryByText("Test User");
        const logoutButtonElement = screen.queryByText("Logout");
    
        expect(avatarElement).toBeNull();
        expect(nameElement).toBeNull();
        expect(logoutButtonElement).toBeNull();
      });
})