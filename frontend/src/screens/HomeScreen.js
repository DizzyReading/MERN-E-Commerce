import Box from '@material-ui/core/Box';
import Product from '../components/Product'
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productAction';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const HomeScreen = (props) => {
  
  const dispatch = useDispatch(); // like mapDispatchToProps
  const productList = useSelector(state => state.productList); // like mapStateToProps
  const {isLoading, error, products} = productList

  useEffect(() => {

    dispatch(listProducts()); // fetching data from backend

    console.log(productList);

  }, [dispatch]);

  // console.log('error message is ' + error);
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
         <DrawerHeader />

         <Grid id="grid-container" container spacing={4} >
           {products.map(product => (
           <Product key={product._id} product={product} isLoading={isLoading}></Product>
         
           ))}
      </Grid> 
      </>
     )}
           
        </Box>
    

     );
}
 
export default HomeScreen;