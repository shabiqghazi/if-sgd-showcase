import React, { useEffect, useState } from "react";
import { Navbar } from "../../shared/Navbar";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import supabase from "../../config/supabase";
import { getAuthDataAtom } from "../../shared/global-state/authData";
import { useAtom } from "jotai";
import moment from "moment/moment";
import "moment/locale/id";
import { Rating } from "primereact/rating";

const ShowProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [getAuthData, setGetAuthData] = useAtom(getAuthDataAtom);
  const [rating, setRating] = useState(null);
  const [projectData, setProjectData] = useState({});
  const [projectRates, setProjectRates] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [comment, setComment] = useState("");
  const getProject = async () => {
    await supabase
      .from("projects")
      .select(`*, user:user_id ( * )`)
      .eq("id", projectId)
      .then((res) => {
        if (!res.error) {
          setProjectData(res.data[0]);
        } else {
          setProjectData(null);
          console.log(res.error);
        }
      });
  };
  const getComments = async () => {
    await supabase
      .from("comments")
      .select(`*, user:user_id ( * )`)
      .eq("project_id", projectId)
      .then((res) => {
        if (!res.error) {
          setCommentsData(res.data);
        } else {
          console.log(res.error);
        }
      });
  };
  useEffect(() => {
    setGetAuthData();
    window.scrollTo(0, 0);
    getProject();
    getComments();
    getProjectRates();
  }, []);

  const addCommentHandler = async (e) => {
    e.preventDefault();
    if (!getAuthData) {
      navigate("/login");
    }
    await supabase
      .from("comments")
      .insert([
        {
          comment,
          user_id: getAuthData.id,
          project_id: projectId,
        },
      ])
      .then((res) => {
        if (res.status === 201) {
          setComment("");
          getComments();
        }
        if (res.error) console.log(res.error);
      });
  };
  const getProjectRates = async () => {
    await supabase
      .rpc("get_rates_average", { project_id_param: projectId })
      .then((res) => {
        if (!res.error && res.data.length > 0) {
          setProjectRates(res.data[0]);
        }
      });
  };
  const getUserRating = async () => {
    let data;
    if (!getAuthData?.id) {
      return false;
    }
    await supabase
      .from("rates")
      .select("*")
      .eq("user_id", getAuthData?.id)
      .eq("project_id", projectId)
      .then((res) => {
        if (!res.error && res.data.length > 0) {
          setRating(res.data[0].rate);
          data = res;
        } else {
          data = false;
        }
      });
    return data;
  };
  useEffect(() => {
    getUserRating();
  }, [getAuthData]);
  const addRatingHandler = async (e) => {
    e.preventDefault();
    if (!getAuthData) {
      navigate("/login");
    }
    if (!(await getUserRating())) {
      await supabase
        .from("rates")
        .insert({
          user_id: getAuthData.id,
          project_id: projectId,
          rate: rating,
        })
        .then((res) => {
          getUserRating();
          getProjectRates();
        });
    } else {
      await supabase
        .from("rates")
        .update({
          rate: rating,
        })
        .eq("user_id", getAuthData.id)
        .eq("project_id", projectId)
        .then((res) => {
          getUserRating();
          getProjectRates();
        });
    }
  };
  return (
    <div>
      <Navbar />
      {projectData ? (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-0 grow-[2] lg:p-8 z-40">
            <iframe
              title="Project"
              className="embed-responsive-item w-full aspect-video mb-4"
              src={`https://www.youtube-nocookie.com/embed/${projectData?.video_url}?rel=0`}
              allowFullScreen
            ></iframe>
            <div className="px-3">
              <h1 className="text-lg font-semibold mb-4">
                {projectData?.title}
              </h1>
              <div className="mb-6 flex items-center gap-2">
                <i className="pi pi-star-fill text-indigo-700"></i>
                <p className="font-bold text-lg">{projectRates.average}</p>
                <span className="text-gray-600 ml-4 text-lg font-medium">
                  {projectRates.total} Penilai
                </span>
              </div>
              <form className="mb-6 flex gap-3" onSubmit={addRatingHandler}>
                <Rating
                  value={rating}
                  cancel={false}
                  onChange={(e) => setRating(e.value)}
                />
                <button
                  className="bg-indigo-700 rounded-md px-2 text-white"
                  type="submit"
                >
                  Kirim
                </button>
              </form>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-black rounded-full"></div>
                <p className="font-medium text-sm">{projectData?.user?.nama}</p>
              </div>
              <Accordion activeIndex={1} className="mb-8">
                <AccordionTab header="Details" className="text-sm">
                  <div className="mb-6">
                    <h2 className="font-bold text-gray-700 mb-2">DESKRIPSI</h2>
                    <p className="text-gray-700">{projectData?.description}</p>
                  </div>
                  <div className="mb-6">
                    <h2 className="font-bold text-gray-700 mb-2">
                      SOURCE CODE
                    </h2>
                    <p className="text-gray-700">
                      <a
                        href={projectData?.source_code_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-800 underline-offset-4 underline"
                      >
                        {projectData?.source_code_url}
                      </a>
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="font-bold text-gray-700 mb-2">
                      MATA KULIAH
                    </h2>
                    <p className="text-gray-700">Pengembangan Aplikasi Web</p>
                  </div>
                </AccordionTab>
              </Accordion>
            </div>
          </div>
          <div className="bg-slate-100 px-3 py-8 lg:w-0 grow lg:bg-white lg:px-0 lg:pr-8">
            <h2 className="font-bold text-gray-700 mb-2">KOMENTAR</h2>
            <form
              className="flex flex-col items-end gap-2 mb-4"
              onSubmit={addCommentHandler}
            >
              <InputTextarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                className="w-full"
              />
              <Button
                label="Submit"
                aria-label="Submit"
                className="p-button-sm"
              />
            </form>
            <hr className="border border-gray-200" />
            <div className="py-4 flex flex-col divide-y gap-2 lg:max-h-96 lg:overflow-y-auto">
              {commentsData.map((comment) => {
                moment.locale("id");
                let comment_time = Date.parse(comment?.created_at);
                comment_time = moment(new Date(comment_time));
                return (
                  <div
                    className="flex flex-col bg-white p-2 rounded-xl"
                    key={comment.id}
                  >
                    <div className="flex justify-between">
                      <p className="font-medium mb-2">{comment?.user?.nama}</p>
                      <p className="font-light mb-2 text-sm text-gray-500">
                        {comment_time.fromNow()}
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm">{comment?.comment}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <h2>ID aplikasi tidak valid</h2>
      )}
    </div>
  );
};

export default ShowProject;
