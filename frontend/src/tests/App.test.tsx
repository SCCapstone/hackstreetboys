import '@testing-library/jest-dom'
import App from "../App"
import ReactDOM from "react-dom";
import Context from "../components/Context";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
