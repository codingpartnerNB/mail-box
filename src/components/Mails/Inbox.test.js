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
    test("Reders image has src='assets/unread.png' if message is unread", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <Inbox />
                </Provider>
            </Router>
        );

        const imgElem = screen.getByRole('img');
        expect(imgElem).toHaveAttribute('src','assets/unread.png');
    });
    test("Does not renders image has attribute src='assets/unread.png' if message is read", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <Inbox />
                </Provider>
            </Router>
        );

        const imgElem = screen.getByRole('img');
        expect(imgElem).not.toHaveAttribute('src','assets/unread.png');
    });
    test("Have alt property with value Remove mail.", ()=>{
        render(
            <Router>
                <Provider store={store} >
                    <Inbox />
                </Provider>
            </Router>
        );

        const imgElem = screen.getByRole('img');
        expect(imgElem).toHaveAttribute('alt','Remove mail');
    });
});