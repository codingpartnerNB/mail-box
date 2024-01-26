import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from '../../store/index';
import Signup from "./Signup";


describe("Signup component", ()=>{
    test("Renders Signup heading", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <Signup />
                </Provider>
            </Router>
        );

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });
    test("Renders --Don't have an account-- on button don't click", ()=>{
        //Arrange 
        render(
            <Router>
                <Provider store={store}>
                    <Signup />
                </Provider>
            </Router>
        );

        //Act
        //...nothing

        //Assert
        const notHave = screen.getByText("Don't have an account", {exact: false});
        expect(notHave).toBeInTheDocument();
    });

    test("renders --Have an account?-- on button click", ()=>{
        //Arrange
        render(
            <Router>
                <Provider store={store}>
                    <Signup />
                </Provider>
            </Router>
        );

        //Act
        const button = screen.getByRole('span', {name: "Don't have an account? Signup"});
        userEvent.click(button);

        //Assert
        const haveAccount = screen.getByText("Have an account?", {exact: false});
        expect(haveAccount).toBeInTheDocument();
    });
});