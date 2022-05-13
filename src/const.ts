export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:pageNumber',
  CardPage = '/product/:id',
  NotFound = '/*',
}

export enum APIRoute {
  Cards = '/guitars',
  Comments = '/comments'
}

export enum NameSpace {
  Main = 'MAIN',
  Data = 'DATA',
}

export const CARDS_PER_PAGE = 9;

export const InitialProduct = {
  id: -1,
  name: '',
  vendorCode: '',
  type: '',
  description: '',
  previewImg: '',
  stringCount: 0,
  rating: 0,
  price: 0,
};

export const TypeGuitarTranslation = new Map([
  ['acoustic', 'Акустическая гитара'],
  ['electric', 'Электрогитара'],
  ['ukulele', 'Укулеле'],
]);

