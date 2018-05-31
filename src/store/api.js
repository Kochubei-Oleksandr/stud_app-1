export default {
  login: process.env.API_URL + '/login',
  products: process.env.API_URL + '/products',
  productsVip: process.env.API_URL,
  product: process.env.API_URL + '/product/',
  register: process.env.API_URL + '/register',
  categoriesList: process.env.API_URL + '/categories-list',
  cityList: process.env.API_URL + '/city-list',
  // product: process.env.API_URL + '/products/#{id}'
  // login: process.env.API_URL + '/login',
  // logout: process.env.API_URL + '/logout',
  // register: process.env.API_URL + '/register',
  // products: process.env.API_URL + '/products',
  // product: (productId) => (process.env.API_URL + '/product/#{id}').replace('#{id}')
  
  
}
