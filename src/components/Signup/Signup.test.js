import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./Signup";

describe("Signup component", ()=>{
    test("Renders Signup heading", ()=>{
        render(<Router>
            <Signup />
        </Router>);

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });
});