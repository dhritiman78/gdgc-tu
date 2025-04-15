import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Expand, Minimize } from "lucide-react"
import { useState } from "react"

interface ProjectProps {
  project: {
    id: number
    title: string
    description: string
    image: string
    technologies: string[]
    githubLink: string | null
    contributors: string[]
    demoLink: string | null
  }
}

export default function ProjectCard({ project }: ProjectProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 ${isExpanded ? 'fixed inset-0 z-50 bg-white p-4' : 'relative'}`}>
      {/* Image container with expand button */}
      <div className={`relative ${isExpanded ? 'h-[90vh]' : 'h-48'} w-full overflow-hidden group`}>
        <Image 
          src={project.image || "/placeholder.svg"} 
          alt={project.title}
          fill
          className={`object-contain ${isExpanded ? '' : 'group-hover:scale-105'} transition-transform duration-500`}
          style={{
            objectPosition: 'center center'
          }}
          sizes={isExpanded ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
        
        {/* Expand/collapse button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute ${isExpanded ? 'top-4 right-4' : 'top-2 right-2'} bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10`}
          aria-label={isExpanded ? "Minimize image" : "Expand image"}
        >
          {isExpanded ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Expand className="h-5 w-5" />
          )}
        </button>
        
        {!isExpanded && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      {!isExpanded && (
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:bg-blue-100 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.contributors.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Team
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {project.contributors.map((name, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-gray-50 rounded-full pl-1 pr-3 py-1 transition-all duration-200 hover:bg-gray-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold mr-1">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs text-gray-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-3 border-t border-gray-100">
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
              >
                <Github className="h-4 w-4 mr-2" />
                <span className="text-sm">Github</span>
              </Link>
            )}

            {project.demoLink && (
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all duration-200"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span className="text-sm">Live Demo</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}