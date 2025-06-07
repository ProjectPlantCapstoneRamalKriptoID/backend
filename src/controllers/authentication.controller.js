const argon2 = require('argon2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
// const { google } = require('googleapis');
const User = require('../models/user.model');
const verification = require('../models/verification.model');
// const UserPasswordReset = require('../models/userPassReset.model');
const sendVerificationEmail = require('../services/userVerification.service');
// const sendResetPasswordEmail = require('../services/userPassReset.service');

// Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await argon2.hash(password);

    // Create data
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create verification token
    const uniqueString = uuidv4() + createdUser._id;
    const hashedUniqueString = await bcrypt.hash(uniqueString, 10);

    // Create record for verification
    const userVerification = new verification({
      userId: createdUser._id,
      uniqueString: hashedUniqueString,
      expiresAt: Date.now() + 3600000, // 1 hour
    });
    await userVerification.save();

    // Send verification email
    await sendVerificationEmail(
      createdUser.email,
      createdUser.name,
      uniqueString
    );

    return res.status(200).json({
      user: createdUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verification email for register account
exports.verifyEmail = async (req, res) => {
  const { uniqueString } = req.params;
  try {
    // Check if verification token is valid
    const record = await verification.findOne({});
    if (record) {
      const isMatch = await bcrypt.compare(uniqueString, record.uniqueString);

      // Update data
      if (isMatch) {
        await User.updateOne({ _id: record.userId }, { verified: true });
        await verification.deleteOne({ _id: record._id });
        return res.status(200).json({
          messages: 'Email verified successfully',
        });
      } else {
        return res.status(400).json({
          messages: 'Invalid verification link',
        });
      }
    } else {
      return res.status(400).json({
        messages: 'Invalid verification link',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

// Signin
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // // Check data email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // Check if email is verified
    if (user && !user.verified) {
      return res.status(400).json({ message: 'Email not verified' });
    }

    // Check if password is correct
    const match = await argon2.verify(user.password, password);
    if (!match) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.header(`Authorization`, `Bearer ${token}`).status(200).json({
      message: 'Login Succesfully',
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error', err });
  }
};

// // Login Google
// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   'http://localhost:8000/auth/google/callback'
// );

// exports.googleAuthRedirect = (req, res) => {
//   // Generate auth url
//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: [
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email',
//     ],
//     include_granted_scopes: true,
//   });

//   // Redirect
//   res.redirect(authUrl);
// };

// exports.googleAuthCallback = async (req, res) => {
//   const { code } = req.query;
//   try {
//     // Get access token
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     // Get user info
//     const userInfo = await google
//       .oauth2({ version: 'v2', auth: oauth2Client })
//       .userinfo.get();

//     // Save user data to database
//     User.findOneAndUpdate(
//       {
//         fullName: userInfo.data.name,
//         email: userInfo.data.email,
//         role: 'user',
//         verified: true,
//       },
//       userInfo.data,
//       { upsert: true, new: true }
//     )
//       .then((user) => {
//         console.log('User Info:', user);
//         res.json('Authentication successful!');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         res.status(500).json('Failed to save user data!');
//       });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json('Authentication failed!');
//   }
// };

// // Password reset
// exports.resetPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     // Check if email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: true, messages: 'User not found' });
//     }

//     // Create reset token and hash
//     const resetToken = uuidv4();
//     const hashedToken = bcrypt.hashSync(resetToken, 10);
//     const expiresAt = Date.now() + 3600000; // 1 hour

//     // Create record for password reset
//     const newPasswordReset = new UserPasswordReset({
//       userId: user._id,
//       resetToken: hashedToken,
//       createdAt: Date.now(),
//       expiresAt,
//     });

//     // Save record password reset
//     await newPasswordReset.save();

//     // Send email reset password
//     await sendResetPasswordEmail(user.email, user.userName, resetToken);
//     res.status(200).json({
//       messages: 'Password reset email sent',
//     });
//   } catch (error) {
//     res.status(500).json({
//       messages: 'Error processing reset request',
//     });
//   }
// };

// // Verification email password reset
// exports.verifyResetPassword = async (req, res) => {
//   try {
//     const { resetToken, newPassword } = req.body;
//     // Check if reset token is valid
//     const passwordResets = await UserPasswordReset.find();
//     const passwordReset = passwordResets.find((pr) =>
//       bcrypt.compareSync(resetToken, pr.resetToken)
//     );
//     if (!passwordReset) {
//       return res.status(400).json({
//         error: true,
//         messages: 'Invalid reset token',
//       });
//     }

//     // Check if reset token has expired
//     const { userId, expiresAt } = passwordReset;
//     if (expiresAt < Date.now()) {
//       return res.status(400).json({
//         error: true,
//         messages: 'Reset token has expired',
//       });
//     }

//     // Find user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({
//         error: true,
//         messages: 'User not found',
//       });
//     }

//     // Update password
//     const hashedPassword = await argon2.hash(newPassword);
//     user.password = hashedPassword;

//     // Save
//     await user.save();

//     // Delete record
//     await UserPasswordReset.deleteOne({ _id: passwordReset._id });

//     res.status(200).json({
//       success: true,
//       messages: 'Password reset successfully',
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: true,
//       messages: 'Failed to reset password',
//     });
//   }
// };
