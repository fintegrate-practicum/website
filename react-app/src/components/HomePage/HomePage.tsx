import './HomePage.css';

const HomePage = () => {
    const handleLoginClick = () => {
        window.location.href = 'Login.tsx';
    };

    return (
        <div className="App">
            <header>
                <div className="logo">
                    <img src="logo.png" alt="Fintegrate" />
                </div>
                <button className="login-button" onClick={handleLoginClick}>
                    כניסה / הרשמה
                </button>
            </header>
            <main>
                <section className="screenshots">
                    <img src="screenshot1.png" alt="צילום מסך 1" />
                    <img src="screenshot2.png" alt="צילום מסך 2" />
                    <img src="screenshot3.png" alt="צילום מסך 3" />
                </section>
            </main>
        </div>
    );
};

export default HomePage;
