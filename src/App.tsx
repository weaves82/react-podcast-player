import Favourites from './components/Favourites';
import Podcast from './components/Podcast/Podcast';
import AppStyles from './styles/AppStyles'
import GlobalStyles from './styles/GlobalStyles'

 function App() {
  return (
    <>
      <GlobalStyles/>
      <AppStyles>
        <Podcast />
        <Favourites />
      </AppStyles>
      </>
  );
}

export default App;
