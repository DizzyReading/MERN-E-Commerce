import React from 'react';
import Box from '@material-ui/core/Box';
import Product from '../components/Product'
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productAction';
import Carousel from '../components/Carousel';


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

    dispatch(listProducts({})); // empty object passed inside means we dont want any fitlters and want all products

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
         {/* <ParallaxCarousel></ParallaxCarousel> */}
         <Carousel></Carousel>

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