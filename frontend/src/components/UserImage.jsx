export const UserImage = ({ link, sourceImage }) => {
  return (
    <aside>
      <a href={link}>
        <img src={sourceImage} alt='User Image' className='profileImage' />
      </a>
    </aside>
  )
}
