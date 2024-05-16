import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-[100vh] w-full bg-gray-100 p-10">
      <div className="flex h-full w-full items-center justify-center gap-8 rounded-md bg-white">
        <Link
          to="/pokedex"
          className="rounded-md p-8 text-center shadow-md transition-all duration-200 hover:-translate-y-4 hover:bg-slate-50 hover:shadow-xl"
        >
          <p className="mb-4 w-full font-bold">포켓몬 도감</p>
          <img
            src={require('../asset/img/pokedex.png')}
            alt=""
            className="h-20 w-20"
          />
        </Link>
        <Link
          to="/pokedex"
          className="rounded-md p-8 text-center shadow-md transition-all duration-200 hover:-translate-y-4 hover:bg-slate-50 hover:shadow-xl"
        >
          <p className="mb-4 w-full font-bold">채팅 앱</p>
          <img
            src={require('../asset/img/chat.png')}
            alt=""
            className="h-20 w-20"
          />
        </Link>
        <Link
          to="/note"
          className="rounded-md p-8 text-center shadow-md transition-all duration-200 hover:-translate-y-4 hover:bg-slate-50 hover:shadow-xl"
        >
          <p className="mb-4 w-full font-bold">노트</p>
          <img
            src={require('../asset/img/note.png')}
            alt=""
            className="h-20 w-20"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
