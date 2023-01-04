import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import DimensiWebLogo from "../../shared/img/logo-dimensi-web.png";
import { Navbar } from "../../shared/Navbar";
import { Link } from "react-router-dom";
import supabase from "../../config/supabase";
import { ProjectThumbnail } from "../../shared/ProjectThumbnail";

const Homepage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [latestProjects, setLatestProjects] = useState([]);
  const [topRatedProjects, setTopRatedProjects] = useState([]);
  const [contributorsNumber, setContributorsNumber] = useState(0);
  const [projectNumber, setProjectNumber] = useState(0);

  const getContributorsNumber = async () => {
    await supabase
      .from("users")
      .select(`*`, { count: "exact" })
      .then((res) => {
        if (!res.error) {
          setContributorsNumber(res.count);
        } else {
          console.log(res.error);
        }
      });
  };

  const getLatestProjects = async () => {
    await supabase
      .from("projects")
      .select(`*, user:user_id ( * )`, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(0, 8)
      .then((res) => {
        if (!res.error) {
          console.log(res);
          setProjectNumber(res.count);
          setLatestProjects(res.data);
        } else {
          console.log(res.error);
        }
      });
  };
  useEffect(
    () => () => {
      getLatestProjects();
      getContributorsNumber();
    },
    []
  );
  return (
    <>
      <div className="bg-slate-100">
        <Navbar />
        <div className="flex flex-col justify-center items-center text-center px-5 py-40 lg:py-28">
          <div className="mb-8">
            <h1 className="font-bold text-4xl">
              <span className="text-7xl">IF SGD</span> <br /> SHOWCASE
            </h1>
          </div>
          <p className="text-lg mb-5 px-5">
            Pertunjukan Aplikasi Karya Mahasiswa Teknik Informatika UIN Bandung
          </p>
          <div className="mb-12 w-full p-5" style={{ borderRadius: "9999px" }}>
            <span
              className="p-input-icon-left w-full max-w-md"
              style={{ borderRadius: "9999px" }}
            >
              <i className="pi pi-search" />
              <InputText
                className="w-full"
                style={{ borderRadius: "9999px" }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search"
              />
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-lg divide-x-2 flex w-full max-w-lg">
            <div className="grow w-0 py-4 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{contributorsNumber}</p>
              <p className="text-sm">Kontributor</p>
            </div>
            <div className="grow w-0 py-4 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{projectNumber}</p>
              <p className="text-sm">Aplikasi</p>
            </div>
            <div className="grow w-0 py-4 flex flex-col items-center justify-center">
              <p className="text-xs mb-2">Managed by:</p>
              <div className="flex items-center w-fit gap-2  text-left">
                <img src={DimensiWebLogo} alt="" className="w-9 self-start" />
                <span className="text-sm">
                  Dimensi
                  <br />
                  Web
                </span>
              </div>
            </div>
          </div>
        </div>
        <section id="latest" className="w-full bg-white py-16 px-5">
          <h2 className="text-2xl mb-4 md:text-center md:mb-8">
            Aplikasi Terbaru
          </h2>
          <div className="flex flex-col gap-8 md:flex-row justify-center">
            {latestProjects.map((project, index) => (
              <ProjectThumbnail project={project} key={project.id} />
            ))}
          </div>
        </section>
        {/* <section id="top-rated" className="w-full bg-white py-16 px-5">
          <h2 className="text-2xl mb-4 md:text-center md:mb-8">
            Top Rated Projects
          </h2>
          <div className="flex flex-col gap-8 md:flex-row justify-center">
            <Link to="/show-project/1">
              <div className="flex flex-col w-full md:max-w-xs">
                <div className="aspect-square bg-black mb-3"></div>
                <h3 className="text-xl font-semibold mb-1">
                  Ini Judul Project
                </h3>
                <div className="mb-1 font-semibold text-gray-700">4.7</div>
                <p className="text-gray-500">by Shabiq Ghazi Arkaan</p>
              </div>
            </Link>
            <Link to="/show-project/1">
              <div className="flex flex-col w-full md:max-w-xs">
                <div className="aspect-square bg-black mb-3"></div>
                <h3 className="text-xl font-semibold mb-1">
                  Ini Judul Project
                </h3>
                <div className="mb-1 font-semibold text-gray-700">4.7</div>
                <p className="text-gray-500">by Shabiq Ghazi Arkaan</p>
              </div>
            </Link>

            <Link to="/show-project/1">
              <div className="flex flex-col w-full md:max-w-xs">
                <div className="aspect-square bg-black mb-3"></div>
                <h3 className="text-xl font-semibold mb-1">
                  Ini Judul Project
                </h3>
                <div className="mb-1 font-semibold text-gray-700">4.7</div>
                <p className="text-gray-500">by Shabiq Ghazi Arkaan</p>
              </div>
            </Link>
          </div>
        </section>
        <section id="popular" className="w-full bg-white py-16 px-5">
          <h2 className="text-2xl mb-4 md:text-center md:mb-8">
            Popular Projects
          </h2>
          <div className="flex flex-col gap-8 md:flex-row justify-center">
            <Link to="/show-project/1">
              <div className="flex flex-col w-full md:max-w-xs">
                <div className="aspect-square bg-black mb-3"></div>
                <h3 className="text-xl font-semibold mb-1">
                  Ini Judul Project
                </h3>
                <div className="mb-1 font-semibold text-gray-700">4.7</div>
                <p className="text-gray-500">by Shabiq Ghazi Arkaan</p>
              </div>
            </Link>
            <Link to="/show-project/1">
              <div className="flex flex-col w-full md:max-w-xs">
                <div className="aspect-square bg-black mb-3"></div>
                <h3 className="text-xl font-semibold mb-1">
                  Ini Judul Project
                </h3>
                <div className="mb-1 font-semibold text-gray-700">4.7</div>
                <p className="text-gray-500">by Shabiq Ghazi Arkaan</p>
              </div>
            </Link>

            <Link to="/show-project/1">
              <div className="flex flex-col w-full md:max-w-xs">
                <div className="aspect-square bg-black mb-3"></div>
                <h3 className="text-xl font-semibold mb-1">
                  Ini Judul Project
                </h3>
                <div className="mb-1 font-semibold text-gray-700">4.7</div>
                <p className="text-gray-500">by Shabiq Ghazi Arkaan</p>
              </div>
            </Link>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default Homepage;
