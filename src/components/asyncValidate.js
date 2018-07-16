const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const asyncValidate = values => {
    return sleep(1000).then(() => {
      errors = {};
      if (!['tin', 'kasan'].includes(values.username)) {
        errors = Object.assign({username: 'User does not exist'}, errors);
      }
      if (!['tin@gmail.com', 'kasan@gmail.com'].includes(values.email)) {
        errors = Object.assign({email: 'Email not exist'}, errors);
      }
      if (Object.keys(errors).length > 0) {
        throw errors;
      }
    });
};
export default asyncValidate;
