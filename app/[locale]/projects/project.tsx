'use client'

import projectsData from '@/data/projectsData'
import Card from '@/components/projectcard'
import { LocaleTypes } from '../i18n/settings'

type ProjectProps = {
  locale: LocaleTypes
}

const Project = ({ locale }: ProjectProps) => {
  const projectArray = projectsData[locale] || []

  return (
    <>
      {projectArray.length > 0 ? (
        projectArray.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            description={project.description}
            imgSrc={project.imgSrc}
            href={project.href}
          />
        ))
      ) : (
        <p>No projects available</p>
      )}
    </>
  )
}

export default Project
