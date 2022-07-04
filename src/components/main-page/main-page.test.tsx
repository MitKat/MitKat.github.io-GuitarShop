import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';
import MainPage from './main-page';


describe('Component: MainPage', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore(middlewares);
  const fakeStore = mockStore({
    [NameSpace.Data]: {
      catalogCards: mockTestCards,
      product: mockTestCard,
      isDataLoaded: true,
      comments: {'1': mockTestComments},
      commentsAll: mockTestComments,
    },
    [NameSpace.Modal]: {
      isVisible: false,
      isSuccess: false,
    },
    [NameSpace.State]: {
      filtersState: {
        priceStart: 0,
        priceEnd: 0,
        typeGuitar: [],
        stringCount: [],
      },
      sortState: {
        sort: 'price',
        order: 'asc',
      },
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <MainPage urlPage='main' />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(`${mockTestCard.name}`)).toBeInTheDocument();

  });
});
