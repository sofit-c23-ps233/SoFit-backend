const md5 = require('md5');
const db = require('./connection');
const { nanoid } = require('nanoid');

exports.register = function (req, res) {  
  const { 
    username, 
    email, 
    password
  } = req.body;
  const id = nanoid(8);
  const hashedPassword = md5(password);
  // Check if any of the required fields are empty
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  db.getConnection((err, con) => {
    if (err) {
      console.error('Error getting MySQL connection: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Check if the email and username already exists
    con.query(
      'SELECT * FROM users WHERE email OR username = ?',
      [email, username],
      (err, results) => {
        if (err) {
          console.error('Error executing MySQL query: ', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        if (results.length > 0) {
          res.status(409).json({ error: `${email} with ${username} already registered` });
          return;
        }
        // Insert the new user into the database
        con.query(
          'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
          [id, username, email, hashedPassword],
          (err) => {
            con.release();
            if (err) {
              console.error('Error executing MySQL query: ', err);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
            res.status(201).json({ 
              message: `${email} with ${username} successfully registered`, 
              data:({
                id_user: id,
                username: req.body.username,
                email: req.body.email,
            })
            });
          }
        );
      }
    );
  });
};

//app.post('/login', (req, res) => 
exports.login = function (req, res) {
  const { email, password } = req.body;
  const hashedPassword = md5(password);

  db.getConnection((err, con) => {
    if (err) {
      console.error('Error getting MySQL connection: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Check if the username exists
    con.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, results) => {
        const user = results[0];
        
        if (err) {
          console.error('Error executing MySQL query: ', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        if (results.length === 0 || hashedPassword !== user.password) {
          res.status(401).json({ error: 'Invalid credentials' });
          return;
        }

        /*var data = {
          id: id,
          email: email, 
        }*/
        const { id, email } = results[0];
        res.status(200).json({ 
          message: 'Login successful',
          id: id,
          email: email,
        });
      }
    );
  });
};

/*app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});*/