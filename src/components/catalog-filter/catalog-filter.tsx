import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CountString, TypeGuitar, TypeGuitarTranslation } from '../../const';
import { useAppSelector } from '../../hooks/main';
import { addFilterStringCount, addFilterType, changeFilterPriceEnd, changeFilterPriceStart, deleteFilterStringCount, deleteFilterType, resetFilter } from '../../store/state-filter-and-sort/state-filter-and-sort';
import { getMaxPrice, getMinPrice } from '../../utils';

function CatalogFilter(): JSX.Element {
  const {catalogFilteredCards} = useAppSelector(({GUITARS}) => GUITARS);
  const {catalogCards} = useAppSelector(({GUITARS}) => GUITARS);
  const {filtersState} = useAppSelector(({FILTERS_AND_SORT}) => FILTERS_AND_SORT);
  const [isDisabled4, setIsDisabled4] = useState(false);
  const [isDisabled6, setIsDisabled6] = useState(false);
  const [isDisabled7, setIsDisabled7] = useState(false);
  const [isDisabled12, setIsDisabled12] = useState(false);
  const [isDisabledAcoustic, setIsDisabledAcoustic] = useState(false);
  const [isDisabledElectric, setIsDisabledElectric] = useState(false);
  const [isDisabledUkulele, setIsDisabledUkulele] = useState(false);

  const dispatch = useDispatch();

  const minPrice = getMinPrice((catalogFilteredCards) ? catalogFilteredCards : catalogCards);
  const maxPrice = getMaxPrice((catalogFilteredCards) ? catalogFilteredCards : catalogCards);

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const placeholderMinPrice = (filtersState.priceStart !== 0) ? String(filtersState.priceStart) : String(minPrice);
  const placeholderMaxPrice = (filtersState.priceEnd !== 0) ? String(filtersState.priceEnd) : String(maxPrice);


  const handleFilterPriceStart = () => {
    if(minPriceRef.current !== null ) {
      const isValid = Number(minPriceRef.current.value) > 0;

      if (isValid) {
        if (Number(minPriceRef.current.value) <= minPrice) {
          minPriceRef.current.value = String(minPrice);
        }
        dispatch(changeFilterPriceStart(minPriceRef.current.value));
      } else {
        toast('Ввведите положительное число');
        minPriceRef.current.value = '';
      }
    }
  };

  const handleFilterPriceEnd = () => {
    if(maxPriceRef.current !== null) {
      const isValid = Number(maxPriceRef.current.value) > 0;

      if (isValid) {
        if(Number(maxPriceRef.current.value) >= maxPrice || Number(maxPriceRef.current.value) <= Number(minPriceRef.current?.value)) {
          maxPriceRef.current.value = String(maxPrice);
        }
        dispatch(changeFilterPriceEnd(maxPriceRef.current.value));
      } else {
        toast('Ввведите положительное число');
        maxPriceRef.current.value = '';
      }
    }
  };

  const resetIsDisabledCountString = () => {
    setIsDisabled4(false);
    setIsDisabled6(false);
    setIsDisabled7(false);
    setIsDisabled12(false);
  };
  const resetIsDisabledTypeGuitar = () => {
    setIsDisabledAcoustic(false);
    setIsDisabledElectric(false);
    setIsDisabledUkulele(false);
  };

  const handleChangeTypeGuitar = (evt: ChangeEvent<HTMLInputElement>) => {
    const typesGuitar = filtersState.typeGuitar;
    const typeParams = typesGuitar.find((item) => item === evt.target.value);
    if (typeParams) {
      dispatch(deleteFilterType(evt.target.value));
    } else {
      dispatch(addFilterType(evt.target.value));
    }

  };

  useEffect(() => {
    if (filtersState.typeGuitar.length === 0) {
      resetIsDisabledCountString();
    } else {
      setIsDisabled4(!filtersState.typeGuitar.find((item) => TypeGuitar.ukulele === item || TypeGuitar.electric === item));
      setIsDisabled6(!filtersState.typeGuitar.find((item) => TypeGuitar.acoustic === item || TypeGuitar.electric === item));
      setIsDisabled7(!filtersState.typeGuitar.find((item) => TypeGuitar.acoustic === item || TypeGuitar.electric === item));
      setIsDisabled12(!filtersState.typeGuitar.find((item) => TypeGuitar.acoustic === item));
    }
  }, [filtersState.typeGuitar]);

  useEffect(() => {
    if (filtersState.stringCount.length === 0) {
      resetIsDisabledTypeGuitar();
    } else {
      setIsDisabledAcoustic(!filtersState.stringCount.find((item) => CountString.count6 === item || CountString.count7 === item || CountString.count12 === item));
      setIsDisabledElectric(!filtersState.stringCount.find((item) => CountString.count4 === item || CountString.count6 === item || CountString.count7 === item));
      setIsDisabledUkulele(!filtersState.stringCount.find((item) => CountString.count4 === item));
    }
  }, [filtersState.stringCount]);

  const handleChangeCountString = (evt: ChangeEvent<HTMLInputElement>) => {
    const listCount = filtersState.stringCount;
    const countParams = listCount.find((item) => item === evt.target.value);

    if(countParams) {
      dispatch(deleteFilterStringCount(evt.target.value));
    } else {
      dispatch(addFilterStringCount(evt.target.value));
    }

  };

  const handleReset = () => {
    resetIsDisabledCountString();
    dispatch(resetFilter());
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={placeholderMinPrice} id="priceMin" name="от" ref={minPriceRef} onBlur={handleFilterPriceStart}/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={placeholderMaxPrice} id="priceMax" name="до" ref={maxPriceRef} onBlur={handleFilterPriceEnd}/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          Object.keys(TypeGuitar).map((item) => (
            <div className="form-checkbox catalog-filter__block-item" key={item}>
              <input className="visually-hidden" type="checkbox" id={item} name={item} value={item}
                onChange={handleChangeTypeGuitar}
                checked={filtersState.typeGuitar.includes(item)}
                disabled={(isDisabledAcoustic&&(item==='acoustic')) || (isDisabledElectric&&(item==='electric')) || (isDisabledUkulele&&(item==='ukulele'))}
              />
              <label htmlFor={item}>{TypeGuitarTranslation.get(item)}</label>
            </div>))
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings"
            value={'4'} name="4-strings" disabled={isDisabled4}
            checked={filtersState.stringCount.includes('4')}
            onChange={handleChangeCountString}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" value={'6'} name="6-strings"
            disabled={isDisabled6}
            checked={filtersState.stringCount.includes('6')}
            onChange={handleChangeCountString}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" value={'7'} name="7-strings"
            disabled={isDisabled7}
            checked={filtersState.stringCount.includes('7')}
            onChange={handleChangeCountString}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" value={'12'} name="12-strings"
            disabled={isDisabled12}
            checked={filtersState.stringCount.includes('12')}
            onChange={handleChangeCountString}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleReset} >Очистить</button>
    </form>
  );
}

export default React.memo(CatalogFilter);
