const express = require('express');
const bcrypt = require('bcrypt');
const isLoggedIn = require('../middleware/isLoggedIn');
const isPennStudent = require('../middleware/isPennStudent');
const User = require('../models/User');
const { listenerCount } = require('../models/User');
// const { default: SearchUsers } = require('../../frontend/src/account/components/SearchUsers');

const router = express.Router();

// route to create an account
router.post('/signup', isPennStudent, async (req, res, next) => {
  const { email, firstName, lastName, password, month, day, year, major, school, classYear } = req.body;
  try {
    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password,
      birthday: `${month} ${day} ${year}`,
      major: `${major}`,
      school,
      classYear,
      rating: 0,
      reviews: [],
      followers: [],
      following: [],
      blocked: [],
      transactionHistory: [],
      watchlistRegular: [],
      watchlistBid: [],
      reports: [],
      loginAttempts: 0,
      lockedOutTime: 0,
    });
    res.status(201).send(`The user with name "${user.name}" was successfully created!`);
  } catch (error) {
    next(new Error(`Error inside /signup with error message: ${error}`));
  }
});

// route to login
router.post('/login', async (req, res, next) => {
  // const { email, password } = req.body;
  // try {
  //   const user = await User.findOne({ email });
  //   const match = await bcrypt.compare(password, user.password);

  //   // if past the lockout period
  //   if (new Date().getTime() > user.lockedOutTime) {
  //     // if the passwords match
  //     if (match) {
  //       req.session.email = email;
  //       req.session.name = user.name;
  //       // reset the lockout period
  //       await User.updateOne({ email }, { loginAttempts: 0 });
  //       await User.updateOne({ email }, { lockedOutTime: 0 });
  //       res.send(user);
  //     } else {
  //       // otherwise, increase the login attempt and check if exceed and increase lockout period
  //       await User.updateOne({ email }, { loginAttempts: user.loginAttempts + 1 });
  //       if (user.loginAttempts >= 3) {
  //         await User.updateOne({ email }, { lockedOutTime: new Date(new Date().getTime() + 1 * 60000).getTime() });
  //       }
  //       next(new Error('There was not a match!'));
  //     }
  //   } else {
  //     // if still in lockout period, increase the attempt
  //     await User.updateOne({ email }, { loginAttempts: user.loginAttempts + 1 });
  //     next(new Error('There was not a match'));
  //   }
  // } catch (error) {
  //   // catch errors
  //   next(new Error(`Error inside /login with error message: ${error}`));
  // }
  const user = await User.findOne({ email: req.body.email });
  req.session.email = user.email;
  req.session.name = user.name;
  res.send(user);
});

// route get user session information
router.get('/user', (req, res, next) => {
  res.send({ name: req.session.name, email: req.session.email });
});

// route get user information
// router.get('/getUser', async (req, res, next) => {
//   const user = await User.findOne({ email: req.session.email });
//   res.send({ user });
// });

router.post('/getUser', async (req, res, next) => {
  const { body } = req;
  const { email } = body;
  const user = await User.findOne({ email });
  res.send({ user });
});

// route to log the user out
router.post('/logout', isLoggedIn, async (req, res, next) => {
  const { name } = req.session;
  req.session.email = undefined;
  req.session.name = undefined;
  res.send(`The user with name "${name} has been logged out!"`);
});

// get the login attempts and locked out time
router.post('/failedLogin', async (req, res, next) => {
  const { body } = req;
  const { email } = body;
  const user = await User.findOne({ email });
  res.send({ loginAttempts: user.loginAttempts, lockedOutTime: user.lockedOutTime });
});

router.post('/resetpassword', async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  try {
    const passwordSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, passwordSalt);
    await User.updateOne({ email }, { password: hashedPassword });
    res.send('Password resetted');
  } catch (error) {
    next(new Error('Could not reset password'));
  }
});

// Route find a user(s) filtering on LIKE name
router.post('/findUsersOnName', async (req, res) => {
  const pattern = new RegExp(`${req.body.name}`, 'i');
  try {
    const matchedUsers = await User.find({ name: pattern });
    res.send(matchedUsers);
  } catch (error) {
    res.status(500).send('An unknown error occured.');
    throw new Error('Error finding users.');
  }
});

// Route find a user by penn email
router.post('/findUserOnEmail', async (req, res) => {
  try {
    const matchedUser = await User.find({ email: req.body.email });
    res.send(matchedUser);
  } catch (error) {
    res.status(500).send('An unknown error occured.');
    throw new Error('Error finding user.');
  }
});

// Route post a review
router.post('/postReview', async (req, res) => {
  const { author, recipient, reviewRating, reviewContent } = req.body;
  const newReview = {
    authorEmail: author.email,
    authorName: author.name,
    recipient: recipient.email,
    reviewRating,
    reviewContent,
  };
  recipient.reviews.push(newReview);
  try {
    await User.updateOne({ email: recipient.email }, { reviews: recipient.reviews });
    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send('An unknown error occured.');
    throw new Error('Error posting review.');
  }
});

// Route to follow another user
router.post('/follow', async (req, res) => {
  let { follower, followedUser } = req.body;
  console.log(follower, followedUser);
  const newFollow = {
    followerName: follower.name,
    followerEmail: follower.email,
    followingName: followedUser.name,
    followingEmail: followedUser.email,
  };
  try {
    follower = await User.findOne({ email: follower.email });
    followedUser = await User.findOne({ email: followedUser.email });
    follower.following.push(newFollow);
    followedUser.followers.push(newFollow);
    await User.updateOne({ email: follower.email }, { following: follower.following });
    await User.updateOne({ email: followedUser.email }, { followers: followedUser.followers });
    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send('An unknown error occured.');
    throw new Error('Error following user.');
  }
});

// Route to remove following
router.post('/unfollow', async (req, res) => {
  const { removedFollowing, newFollowList } = req.body;
  if (removedFollowing.followerEmail === req.session.email) {
    try {
      const unfollowedUser = await User.findOne({ email: removedFollowing.followingEmail });
      for (let i = 0; i < unfollowedUser.followers.length; i += 1) {
        if (unfollowedUser.followers[i].followerEmail === removedFollowing.followerEmail) {
          unfollowedUser.followers.splice(i, 1);
          break;
        }
      }
      await User.updateOne({ email: unfollowedUser.email }, { followers: unfollowedUser.followers });
      await User.updateOne({ email: req.session.email }, { following: newFollowList });
      res.status(200).send('Success.');
    } catch (error) {
      res.status(500).send('An unknown error occured.');
      throw new Error('Error unfollowing user.');
    }
  } else {
    try {
      const removedFollower = await User.findOne({ email: removedFollowing.followerEmail });
      for (let i = 0; i < removedFollower.following.length; i += 1) {
        if (removedFollower.following[i].followingEmail === removedFollowing.followingEmail) {
          removedFollower.following.splice(i, 1);
          break;
        }
      }
      await User.updateOne({ email: removedFollower.email }, { following: removedFollower.following });
      await User.updateOne({ email: req.session.email }, { followers: newFollowList });
      res.status(200).send('Success.');
    } catch (error) {
      res.status(500).send('An unknown error occured.');
      throw new Error('Error removing follower.');
    }
  }
});

// Route to block another user
router.post('/block', async (req, res) => {
  const { blocker, blockedUser } = req.body;
  const newBlock = {
    blockerName: blocker.name,
    blockerEmail: blocker.email,
    blockedUserName: blockedUser.name,
    blockedUserEmail: blockedUser.email,
  };
  try {
    const user = await User.findOne({ email: blocker.email });
    user.blocked.push(newBlock);
    await User.updateOne({ email: blocker.email }, { blocked: user.blocked });
    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send('An unknown error occured.');
    throw new Error('Error blocking user.');
  }
});

// Route to unblock another use
router.post('/unblock', async (req, res) => {
  const { newBlockedUsers } = req.body;
  try {
    await User.updateOne({ email: req.session.email }, { blocked: newBlockedUsers });
    res.status(200).send('Success.');
  } catch (error) {
    res.status(500).send('An unknown error occured.');
    throw new Error('Error unblocking user.');
  }
});

// Route to report a use
router.post('/postReport', async (req, res) => {
  const { recipient, reportContent } = req.body;
  const newReport = {
    authorEmail: req.session.email,
    recipientEmail: recipient.email,
    reportContent,
  };
  recipient.reports.push(newReport);
  try {
    await User.updateOne({ email: recipient.email }, { reports: recipient.reports });
    res.status(200).send('Success.');
  } catch (error) {
    res.status(500).send('An unknown error occured.');
    throw new Error('Error reporting user.');
  }
});

module.exports = router;
