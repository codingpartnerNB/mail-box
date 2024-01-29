import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../store/index';
import Sent from "./Sent";


describe("Sent component", ()=>{
    test("Renders no mail found text", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <Sent />
                </Provider>
            </Router>
        );

        const noMailDiv = screen.getByText("no mail is found", {exact: false});
        expect(noMailDiv).toBeInTheDocument();
    });
    test("Have alt property with value Remove mail.", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <Sent />
                </Provider>
            </Router>
        );

        const imgElem = screen.getByRole('img');
        expect(imgElem).toHaveAttribute('alt','Remove mail');
    });
});