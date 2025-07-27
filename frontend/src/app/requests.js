const requests = {
  apiURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003',
  getCloset: '/get-closet',
  getUsername: '/get-username',
  getBrands: '/get-brands',
}

export default requests;
