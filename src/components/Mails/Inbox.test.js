import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../store/index';
import Inbox from "./Inbox";


describe("Inbox component", ()=>{
    test("Renders no mail found text", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <Inbox />
                </Provider>
            </Router>
        );

        const noMailDiv = screen.getByText("no mail is found", {exact: false});
        expect(noMailDiv).toBeInTheDocument();
    });
    test("Reders image if message is unread", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <Inbox />
                </Provider>
            </Router>
        );

        const imgElem = screen.getByRole('img');
        expect(imgElem).toBeInTheDocument();
    });
    test("Does not renders image if message is read", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <Inbox />
                </Provider>
            </Router>
        );

        const imgElem = screen.getByRole('img');
        expect(imgElem).not.toBeInTheDocument();
    });
});