import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Product from '../components/Product'
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useEffect} from 'react';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productAction';
import Carousel from '../components/Carousel';
import Pagination from '../components/Pagination';
// import Pagination from '@material-ui/lab/Pagination'
import { css, cx } from '@emotion/css';





const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const HomeScreen = (props) => {



  // const [page, setPage] = useState(1)

  const [pagination, setPagination] = useState( {
    start:0, 
    end:6
  });

  const [showPerPage, setShowPerPage] = useState(6);


  
 
  
  const dispatch = useDispatch(); // like mapDispatchToProps
  const productList = useSelector(state => state.productList); // like mapStateToProps
  const {isLoading, error, products} = productList

 

  

  useEffect(() => {

    dispatch(listProducts({})); // empty object passed inside means we dont want any fitlters and want all products

  
    console.log(productList);

  }, [dispatch, ]);

  const onPageChange = (start, end) => {
setPagination({start, end})
  }

 

  // console.log('error message is ' + error);
  // console.log('Homescreen', page)
  return ( 
   <Box >

     {isLoading ? (
     
         <Box className="loader-div">
        
     <Loading ></Loading>
     </Box>
     
    
     ) : 
      error ? <>
       <DrawerHeader />
      
      <MessageBox variant="danger">{error}</MessageBox>
      </> :
     (
       <>
       <DrawerHeader />
         <Carousel></Carousel>

         <Grid id="grid-container" container spacing={4} >
           {products.slice(pagination.start, pagination.end).map(product => (
           <Product key={product._id} product={product} isLoading={isLoading}></Product>
         
           ))}
      </Grid> 
  
      {<Pagination showPerPage={showPerPage} onPageChange={onPageChange} total={products.length} products={products}></Pagination>}
       
  
      
     

     
    

      </>
     )}
           
        </Box>
    

     );
}
 
export default HomeScreen;



/* <Pagination count={Math.ceil(products.length/6)} showFirstButton showLastButton page={page} onChange={(e, value) => setPage(value)} ></Pagination>  */