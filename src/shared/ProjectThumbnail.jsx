import React from "react";
import { Link } from "react-router-dom";

export const ProjectThumbnail = ({ project }) => {
  return (
    <Link to={`/show-project/${project.id}`}>
      <div className="flex flex-col w-full md:max-w-xs">
        <div className="aspect-square bg-gray-800 mb-3 flex items-center justify-center rounded-xl overflow-hidden border border-gray-400">
          {project.logo_url ? (
            <img
              src={`https://vwpssjxcemvsutqjqxau.supabase.co/storage/v1/object/public/project-logo/${project.logo_url}`}
              alt=""
            />
          ) : (
            <p className="text-white text-lg">
              {project.title} by {project.user.nama}
            </p>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
        <p className="text-gray-500">by {project.user.nama}</p>
      </div>
    </Link>
  );
};
