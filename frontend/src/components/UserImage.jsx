export const UserImage = ({ link = '*', sourceImage }) => {
  return (
    <aside>
        <img src={sourceImage} alt='User Image' className='profileImage' />
    </aside>
  )
}
