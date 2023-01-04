import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../config/supabase";
import { Navbar } from "../../shared/Navbar";
import { ProjectThumbnail } from "../../shared/ProjectThumbnail";

export const BrowseProjects = () => {
  const [projects, setProjects] = useState([]);
  const getProjects = async () => {
    await supabase
      .from("projects")
      .select(`*, user:user_id ( * )`)
      .order("created_at", { ascending: false })
      .range(0, 2)
      .then((res) => {
        if (!res.error) {
          setProjects(res.data);
        } else {
          console.log(res.error);
        }
      });
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <Navbar />
      <section id="all" className="w-full bg-white py-16 px-5">
        <h2 className="text-2xl mb-4 md:text-center md:mb-8">Semua Aplikasi</h2>
        <div className="flex flex-col gap-8 md:flex-row justify-center">
          {projects.map((project, index) => (
            <ProjectThumbnail project={project} key={project.id} />
          ))}
        </div>
      </section>
    </div>
  );
};
