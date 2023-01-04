import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../../shared/Navbar";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import supabase from "../../config/supabase";
import { getAuthDataAtom } from "../../shared/global-state/authData";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

const AddProject = () => {
  const navigate = useNavigate();
  const [getAuthData, setGetAuthData] = useAtom(getAuthDataAtom);
  const toast = useRef(null);
  const [projectData, setProjectData] = useState({});
  const [logoFile, setLogoFile] = useState({});
  const matkulOption = [
    { name: "Pengembangan Aplikasi Web", code: "PAW" },
    { name: "Manajemen Proyek Perangkat Lunak", code: "MPPL" },
    { name: "Sistem Informasi Geografis", code: "SIG" },
  ];
  const [isYtUrlValid, setIsYtUrlValid] = useState(true);

  const youtube_parser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };
  useEffect(() => {
    setGetAuthData();
  }, []);
  const uploadLogoHandler = async (e) => {
    setLogoFile(e.target.files[0]);
  };
  const addProjectHandler = async (e) => {
    e.preventDefault();
    await supabase.storage
      .from("project-logo")
      .upload(`public/${uuidv4()}-${logoFile.name}`, logoFile)
      .then(async (res) => {
        await supabase
          .from("projects")
          .insert([
            {
              ...projectData,
              user_id: getAuthData.id,
              matkul: projectData.matkul.code,
              video_url: youtube_parser(projectData.video_url),
              logo_url: res.data.path,
            },
          ])
          .then((res) => {
            if (res.status === 201) navigate("/");
            if (res.error) console.log(res.error);
          });
      });
  };
  return (
    <div>
      <Toast ref={toast}></Toast>
      <Navbar />
      <div className="px-8 py-16 max-w-xl lg:px-16 overflow-hidden lg:overflow-visible m-auto">
        <h1 className="font-semibold text-2xl mb-8">Tambah Aplikasi</h1>
        <form onSubmit={addProjectHandler}>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="title" className="block mb-2">
              Judul Aplikasi
            </label>
            <InputText
              id="title"
              aria-describedby="title-help"
              className="block w-full"
              onChange={(e) =>
                setProjectData({ ...projectData, title: e.target.value })
              }
            />
          </div>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="logo" className="block mb-2">
              Logo (opsional)
            </label>
            <input
              type="file"
              name="logo"
              id="logo"
              onChange={uploadLogoHandler}
            />
            {/* <FileUpload
              mode="basic"
              name="demo[]"
              url="https://primefaces.org/primereact/showcase/upload.php"
              accept="image/*"
              chooseOptions={chooseOptions}
              maxFileSize={10000000}
              onChange={(e) => {
                console.log(e.target.files[0]);
              }}
              onUpload={onBasicUpload}
            /> */}
          </div>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="description" className="block mb-2">
              Deskripsi
            </label>
            <InputTextarea
              id="description"
              aria-describedby="description-help"
              className="block w-full"
              rows={4}
              onChange={(e) =>
                setProjectData({ ...projectData, description: e.target.value })
              }
            />
          </div>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="matkul" className="block mb-2">
              Mata Kuliah
            </label>
            <Dropdown
              value={projectData?.matkul}
              options={matkulOption}
              onChange={(e) =>
                setProjectData({ ...projectData, matkul: e.value })
              }
              optionLabel="name"
              placeholder="Pilih Mata Kuliah"
              className="w-full"
            />
          </div>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="video_url" className="block mb-2">
              URL Video Youtube
            </label>
            <InputText
              id="video_url"
              aria-describedby="video_url-help"
              className="block w-full"
              required
              onChange={(e) => {
                if (!youtube_parser(e.target.value || "")) {
                  setIsYtUrlValid(false);
                } else {
                  setIsYtUrlValid(true);
                }
                setProjectData({ ...projectData, video_url: e.target.value });
              }}
            />
            {!isYtUrlValid && (
              <small id="video_url-help" className="p-error block">
                URL tidak valid
              </small>
            )}
          </div>
          <div className="field mb-8">
            <label htmlFor="source_code_url" className="block mb-2">
              URL Source Code (optional)
            </label>
            <InputText
              id="source_code_url"
              aria-describedby="source_code_url-help"
              className="block w-full"
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  source_code_url: e.target.value,
                })
              }
            />
          </div>
          <div className="flex justify-end">
            <Button label="Submit" aria-label="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
