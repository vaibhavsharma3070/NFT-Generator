import { Container } from 'react-bootstrap'

const Header = ({ head, description }) => {
  return (
    <Container>
      <div className='starter-template text-center mt-5'>
        <h1 style={{color:'white'}}>{head} Page</h1>
        <p className='lead text-capitalize' style={{color:'white'}}>{description}</p>
      </div>
    </Container>
  )
}

export default Header
