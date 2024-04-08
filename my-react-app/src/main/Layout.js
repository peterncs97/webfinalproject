import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import CharacterModal from "../components/CharacterModal";
import Scene from "./Scene";

const Layout = () => {
  return (
    <>
      <header className="sticky-top bg-white">
        <div className="container p-2">
          <div className='row justify-content-center' >
            <div className='col-10'>
              <Navbar />
            </div>
          </div>
        </div>
      </header>

      <section className="bg-light">
        <div className="container px-4 py-2">
          <div className='row justify-content-center'>
            <div className='col-10 border border-3 py-2'>
              <Scene />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container px-4 py-2">
          <div className='row justify-content-center'>
            <div className='col-10 border border-3'>
              <Outlet />
            </div>
          </div>
        </div>
      </section>

      <CharacterModal />
    </>
  )
};

export default Layout;