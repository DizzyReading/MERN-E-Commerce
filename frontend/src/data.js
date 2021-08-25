import bcrypt from 'bcryptjs';

const data = {
	users: [
		{
			name: 'polka',
			email: 'admin@example.com',
			password: bcrypt.hashSync('teamkrill', 8),
			isAdmin: true
		},
		{
			name: 'Jane',
			email: 'doe@example.com',
			password: bcrypt.hashSync('1234', 8),
			isAdmin: true
		}
	],
	products: [
		{
			name: 'Woollen Poncho',
			category: 'Top',
			image: '/images/p1.jpg',
			price: 120,
			countInStock: 10,
			brand: 'Mango',
			rating: 4.5,
			numReviews: 10,
			description: 'high quality product'
		},
		{
			name: 'Bomber Jacket',
			category: 'Jacket',
			image: '/images/p2.jpg',
			price: 100,
			countInStock: 20,
			brand: 'American Eagle',
			rating: 4.0,
			numReviews: 10,
			description: 'high quality product'
		},
		{
			name: 'Floral Red Dress',
			category: 'Dress',
			image: '/images/p3.jpg',
			price: 220,
			countInStock: 0,
			brand: 'ZARA',
			rating: 4.8,
			numReviews: 17,
			description: 'high quality product'
		},
		{
			name: 'Blue Overcoat',
			category: 'Coat',
			image: '/images/p4.jpg',
			price: 78,
			countInStock: 15,
			brand: 'ZARA',
			rating: 4.5,
			numReviews: 14,
			description: 'high quality product'
		},
		{
			name: 'Black T-Shirt',
			category: 'Shirt',
			image: '/images/p5.jpg',
			price: 65,
			countInStock: 5,
			brand: 'Mango',
			rating: 4.5,
			numReviews: 10,
			description: 'high quality product'
		},
		{
			name: 'Sweatshirt',
			category: 'Top',
			image: '/images/p6.jpg',
			price: 139,
			countInStock: 12,
			brand: 'Abercrombie',
			rating: 4.5,
			numReviews: 15,
			description: 'high quality product'
		}
	]
};

export default data;
