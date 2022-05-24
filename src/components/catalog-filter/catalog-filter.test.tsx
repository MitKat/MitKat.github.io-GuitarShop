import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CatalogFilter from './catalog-filter';


describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <CatalogFilter />
      </BrowserRouter>);

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/максимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/акустические гитары/i)).toBeInTheDocument();
    expect(screen.getByText(/электрогитары/i)).toBeInTheDocument();
    expect(screen.getByText(/укулеле/i)).toBeInTheDocument();
    expect(screen.getByText(/количество струн/i)).toBeInTheDocument();
  });
});