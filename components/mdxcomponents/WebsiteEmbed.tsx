type EmbedPageProps = {
  website: string
}

const WebsiteEmbed = ({ website }: EmbedPageProps) => {
  return (
    <>
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <iframe
          src={`${website}`} // Replace with the URL you want to embed
          title="UniqueTitle" // 添加唯一的 title 属性
          style={{ border: 'none', width: '100%', height: '100%' }}
          allowFullScreen
        />
      </div>
    </>
  )
}

export default WebsiteEmbed
