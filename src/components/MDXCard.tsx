import React from 'react';

interface CardProps {
  title: string;
  icon: string;
  link: string;
  children: React.ReactNode;
}

export default function Card({ title, icon, link, children }: CardProps) {
  return (
    <div className="button-card">
      <a href={link}>
        <span className="icon">{icon}</span>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{children}</p>
      </a>
    </div>
  );
}