/* eslint-disable no-console */
const axios = require('axios');
const stringSimilarity = require('string-similarity');

// penn api stuff
const init = {
  method: 'GET',
  headers: {
    'Authorization-Bearer': 'UPENN_OD_enPs_1005844',
    'Authorization-Token': 'gi2md86hljr7tgm7fcbp79np2n',
    // 'Content-Type': 'application/json; charset=utf-8',
  },
};

const isPennStudent = async (req, res, next) => {
  const {
    firstName, lastName, email, major, school,
  } = req.body;

  // check if email ends in upenn.edu, best we can do :(
  if (!email.endsWith('upenn.edu')) {
    return res.status(404).send(`The user with name: ${firstName} ${lastName} and email: ${email} is not a Penn student or is not saved in the Penn directory`);
  }

  const baseURL = `https://esb.isc-seo.upenn.edu/8091/open_data/directory?first_name=${firstName}&last_name=${lastName}`;
  try {
    const response = await axios.get(baseURL, init);
    if (response.data.result_data.length > 0) {
      const data = response.data.result_data;
      for (let i = 0; i < response.data.result_data.length; i += 1) {
        // check if names, major, and schools match
        if (data[i].list_name.includes(`${lastName}, ${firstName}`)
        && (data[i].list_title_or_major.includes(major)
        || stringSimilarity.compareTwoStrings(data[i].list_title_or_major, major) > 0.5)
        && (data[i].list_organization.includes(school)
        || stringSimilarity.compareTwoStrings(data[i].list_organization, school) > 0.5)) {
          console.log(data);
          return next();
        }
      }
      return next(new Error(`The student with the name ${firstName} ${lastName}, major ${major}, and school ${school} is not in the Penn API database`));
    }
    return next(new Error(`The student with the name ${firstName} ${lastName}, major ${major}, and school ${school} is not in the Penn API database`));
  } catch (error) {
    return next(new Error(`There is an error in Penn student verification with error message: ${error}`));
  }
};

module.exports = isPennStudent;
