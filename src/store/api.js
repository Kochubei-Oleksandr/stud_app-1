export default {
  login: process.env.API_URL + '/login',
  register: process.env.API_URL + '/register',
  logout: process.env.API_URL + '/logout',

  products: process.env.API_URL + '/products',
  productsVip: process.env.API_URL,
  product: process.env.API_URL + '/product/',

  categoriesList: process.env.API_URL + '/categories-list',
  cityList: process.env.API_URL + '/city-list'
  // product: process.env.API_URL + '/products/#{id}'
  // login: process.env.API_URL + '/login',
  // logout: process.env.API_URL + '/logout',
  // register: process.env.API_URL + '/register',
  // products: process.env.API_URL + '/products',
  // product: (productId) => (process.env.API_URL + '/product/#{id}').replace('#{id}')
  
  
}
