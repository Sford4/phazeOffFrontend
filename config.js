const DEV = {
	ROOT_URL: 'http://localhost:4000'
};

const STAGING = {
	ROOT_URL: ''
};

// const PROD = {
// 	ROOT_URL: null
// };
console.log('ENVIRONMENT:', process.env.NODE_ENV);
export default (process.env.NODE_ENV === 'development' ? DEV : STAGING);
