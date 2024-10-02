import Image from 'next/image';
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  size?: 'small' | 'large';
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  size = 'small',
}) => {
  const cardSizeClasses =
    size === 'small' ? 'w-52 h-52' : 'w-72 h-72';

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 ${cardSizeClasses}`}>
      <Image fill src={image} alt={title} className="w-full h-[50%] object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">Product</h3>
        <p className="mt-2 text-gray-600">This is a description for the product.</p>
      </div>
    </div>
  );
};

export default ProjectCard;