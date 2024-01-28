import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../store/index';
import InboxMsg from "./InboxMsg";


describe("InboxMsg component", ()=>{
    test("Renders mail not found text if no mails fetched", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <InboxMsg />
                </Provider>
            </Router>
        );

        const mailNotFound = screen.getByText("mail not found", {exact: false});
        expect(mailNotFound).toBeInTheDocument();
    });
    test("Does not renders mail not found text if mails got fetched", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <InboxMsg />
                </Provider>
            </Router>
        );

        const mailNotFound = screen.getByText("mail not found", {exact: false});
        expect(mailNotFound).not.toBeInTheDocument();
    });
});