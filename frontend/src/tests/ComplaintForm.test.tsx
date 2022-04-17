import '@testing-library/jest-dom'
import App from "../App"
import ReactDOM from "react-dom";
import Context from "../components/Context";
import Complaint from '../pages/Favorites';
import { render } from '@testing-library/react';
import FavoritePage from '../pages/Favorite';

test('page should have a title of Ionic React Todos', async () => {
    const { findByText } = render(<FavoritePage />);
    await findByText('Favorites');
  });
