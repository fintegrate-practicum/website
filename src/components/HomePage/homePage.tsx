import './HomePage.css';
import { useAppSelector } from '../../Redux/hooks';

const HomePage = () => {
  const userName = useAppSelector(
    (state) => state.currentUserSlice.userDetails.userName,
  );

  return (
    <div className='App'>
      <header>
        <div className='logo'>
          <img src='logo.png' alt='Fintegrate' />
        </div>
      </header>
      {Boolean(userName) && (
        <main>
          <section className='screenshots'>
            <img src='screenshot1.png' alt='צילום מסך 1' />
            <img src='screenshot2.png' alt='צילום מסך 2' />
            <img src='screenshot3.png' alt='צילום מסך 3' />
          </section>
        </main>
      )}
    </div>
  );
};
export default HomePage;
