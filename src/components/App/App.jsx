import { useState, useEffect } from 'react';
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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!searchQuery) return;
    getImages(searchQuery, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          toast.error('Enter a valid query', toastConfig);
          return;
        }
        if (hits.length < 12 || (hits.length !== 0 && hits.length < 12)) {
          toast.info('No more images', toastConfig);
        }

        setImages(prevHits => [...prevHits, ...hits]);
        setTotalImages(totalHits);
      })
      .catch(error => console.error(error.response))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const handleSearchFormSubmit = searchValue => {
    setQuery(searchValue);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const handleLoadMore = () => setPage(prevPage => prevPage + 1);

  const toggleModal = (url = '') => setLargeImageURL(url);

  const showLoadMoreBtn = !loading && images.length !== totalImages;
  return (
    <AppContainer>
      <Searchbar onSearchSubmit={handleSearchFormSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} handleImageClick={toggleModal} />
      )}
      {showLoadMoreBtn && (
        <Button onClick={handleLoadMore} disabled={loading} />
      )}
      {loading && <Loader />}
      {largeImageURL && (
        <Modal onClose={toggleModal}>
          <ModalImage src={largeImageURL} />
        </Modal>
      )}
      <ToastContainer />
    </AppContainer>
  );
};
