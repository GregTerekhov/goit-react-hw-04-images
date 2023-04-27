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
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [largeImageURL, setURL] = useState('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    setLoading(true);
    getImages(searchQuery, page)
      .then(({ newHits, totalHits }) => {
        if (searchQuery.trim() === '' || totalImages === 0) {
          toast.error('Enter a valid query', toastConfig);
          return;
        }
        // if (
        //   newHits.length === totalImages ||
        //   (prevState.hits.length !== 0 && newHits.length < 12)
        // ) {
        //   toast.info('No more images', toastConfig);
        // }
        setHits([...hits, ...newHits]);
        setTotalImages(totalHits);
      })
      .catch(error => {
        console.error(error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hits, hits.length, page, searchQuery, totalImages]);

  const handleSearchFormSubmit = searchValue => {
    setQuery(searchValue);
    setPage(1);
    setHits([]);
    setTotalImages(0);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  const toggleModal = () => {
    setURL('');
  };

  const showLoadMoreBtn = !loading && hits.length !== totalImages;
  return (
    <AppContainer>
      <Searchbar onSearchSubmit={handleSearchFormSubmit} />
      {hits.length > 0 && (
        <ImageGallery images={hits} handleImageClick={toggleModal} />
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
