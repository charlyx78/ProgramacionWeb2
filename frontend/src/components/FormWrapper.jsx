export const FormWrapper = ({ title, children }) => {
  return (
    <div>
      <h3 className='form-signup-title mb-4'>{title}</h3>
      <div className='form-signup-content'>{children}</div>
    </div>
  )
}
