module.exports = (db, app, passport, jwtOptions) => {
  const jwt = require('jsonwebtoken');

  const createUser = async (email, password, fullName, role, subscriptionId) => {
    return await db.user.create({ email, password, fullName, role, subscriptionId });
  };

  const getUser = async obj => {
    return await db.user.findOne({
      where: obj,
    });
  };

  const getAllUsers = async () => {
    return await db.user.findAll();
  };

  app.get('/users', async (req, res, next) => {
    let users = await getAllUsers();
    return res.status(200).json({ status: 200, message: 'OK.', payload: users });
  });

  // register route
  app.post('/sign-up', async (req, res, next) => {
    const { email, password, fullName, confirmPassword, role, subscriptionId } = req.body;
    if (!email || !password || !fullName || !confirmPassword || !role || !subscriptionId || password != confirmPassword ) {
      return res.status(400).json({ message: 'bad request on sign up' })
    }
    let user = await getUser({ email: email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    createUser(email, password, fullName, role, subscriptionId).then(user => {
      let payload = {
        id: user.id,
        email: user.email,
        name: user.fullName,
        role: user.role,
        subscriptionId: user.subscriptionId,
      };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      return res.status(200).json({ user, message: 'OK. account created successfully', token: token })
    }
    ).catch(err => {
      console.log(err)
    });
  });

  //login route
  app.post('/sign-in', async (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
      let user = await getUser({ email: email });
      if (!user) {
        return res.status(400).json({ message: 'Bad request on login' });
      }
      if (user.password === password) {
        // from now on we'll identify the user by the id and the id is the 
        // only personalized value that goes into our token
        let payload = {
          id: user.id,
          name: user.fullName,
          role: user.role,
          subscriptionId: user.subscriptionId
        };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        return res.status(200).json({ message: `OK. Login successful of ${payload}`, token: token });
      } else {
        return res.status(400).json({ message: 'bad request on login' });
      }
    }
    else {
      res.status(400).json({ message: 'bad request on login' })
    }
  });

  // protected route
  app.post('/sign-out', (req, res, next) => {
    return res.status(200).json(`OK. logged out.`);
  });

  // protected route
  app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    return res.status(200).json('OK! You can now see this without a token.');
  });

};