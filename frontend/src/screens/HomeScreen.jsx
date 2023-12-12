import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });
  
  return (
    <>
      { keyword && 
        <Link className='btn btn-light mb-4' to='/'>
          Go Back
        </Link>
      }
      {isLoading ? (
        <Loader/>
      ) : error ? (<Message variant='danger'>(error?.data?.message || error.error)</Message>) : 
      ( <>
          <h1>Latest Products</h1>
            <Row>
              {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            keyword={keyword ? keyword : ''}
            page={data.page}
            pages={data.pages}
          />
        </>
      )}        
      </>
  )
}

export default HomeScreen;