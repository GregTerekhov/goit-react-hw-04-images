import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { getImages } from 'services/api';
import { toastConfig } from 'services/utils';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer, ModalImage } from './App.styled';

export const App = () => {
  const [searchQuery, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [largeImageURL, setURL] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (searchQuery.trim() === '') {
      toast.error('Enter a valid query', toastConfig);
      return;
    }
    setLoading(true);
    getImages(searchQuery, page)
      .then(({ newHits, totalHits }) => {
        if (newHits.length === 0) {
          toast.error('Enter a valid query', toastConfig);
          return;
        }
        if (newHits.length < 12 || (hits.length !== 0 && newHits.length < 12)) {
          toast.info('No more images', toastConfig);
        }
        setHits(prevHits => [...prevHits, ...newHits]);
        setTotalImages(totalHits);
      })
      .catch(error => {
        console.error(error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hits.length, page, searchQuery]);

  const handleSearchFormSubmit = searchValue => {
    setQuery(searchValue);
    setPage(1);
    setHits([]);
    setTotalImages(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showLoadMoreBtn = !loading && hits.length !== totalImages;
  return (
    <AppContainer>
      <Searchbar onSearchSubmit={handleSearchFormSubmit} />
      {hits.length > 0 && (
        <ImageGallery images={hits} handleImageClick={() => setURL('')} />
      )}
      {showLoadMoreBtn && (
        <Button onClick={handleLoadMore} disabled={loading} />
      )}
      {loading && <Loader />}
      {largeImageURL && (
        <Modal onClose={() => setURL('')}>
          <ModalImage src={largeImageURL} />
        </Modal>
      )}
      <ToastContainer />
    </AppContainer>
  );
};