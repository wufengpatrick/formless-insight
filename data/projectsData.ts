type Project = {
  title: string
  description: string
  imgSrc: string
  href: string
}

type ProjectsData = {
  [locale: string]: Project[]
}

const projectsData: ProjectsData = {
  en: [
    {
      title: 'China Economy Advancing Steadily: Multiple Measures to Address New Challenges',
      description: `Facing new challenges, the Chinese government has taken a series of measures to maintain steady economic development, including strengthening macro-control, preventing risks in key areas, and promoting high-quality development. This article details these measures and their effects.`,
      imgSrc: '/static/images/canada/mountains.jpg',
      href: '/blog/china-economy-advancing-steadily', // 确保路径正确
    },
    {
      title: 'China Economy Advancing Steadily: Multiple Measures to Address New Challenges',
      description: `Facing new challenges, the Chinese government has taken a series of measures to maintain steady economic development, including strengthening macro-control, preventing risks in key areas, and promoting high-quality development. This article details these measures and their effects.`,
      imgSrc: '/static/images/time-machine.jpg',
      href: '/blog/china-economy-advancing-steadily', // 确保路径一致
    },
  ],

  'zh-CN': [
    {
      title: '中国经济稳健前行：多举措应对新挑战',
      description: `面对新挑战，中国政府采取了一系列措施来保持经济的稳健发展，包括加大宏观调控力度、防范重点领域风险、推进高质量发展等。本文详细介绍了这些措施及其效果。`,
      imgSrc: '/static/images/canada/mountains.jpg',
      href: '/blog/china-economy-advancing-steadily', // 确保路径正确
    },
    {
      title: '中国经济稳健前行：多举措应对新挑战',
      description: `面对新挑战，中国政府采取了一系列措施来保持经济的稳健发展，包括加大宏观调控力度、防范重点领域风险、推进高质量发展等。本文详细介绍了这些措施及其效果。`,
      imgSrc: '/static/images/time-machine.jpg',
      href: '/blog/china-economy-advancing-steadily', // 确保路径一致
    },
  ],
}

export default projectsData
