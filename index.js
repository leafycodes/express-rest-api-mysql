const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const { v4: newUuid } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set(path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "mern",
  password: "password@123",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

let port = 8080;
app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});

app.get("/", (req, res) => {
  let q = "select count(*) from user";

  try {
    connection.query(q, (error, result, fields) => {
      if (error) {
        throw error;
      }
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error occured while fetching the database");
  }
});

app.get("/user", (req, res) => {
  let q = "select * from user order by username asc";

  try {
    connection.query(q, (error, result, fields) => {
      if (error) {
        throw error;
      }
      res.render("users.ejs", { result });
    });
  } catch (err) {
    console.log(err);
    res.send("some error occured while fetching the database");
  }
});

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id="${id}"`;
  try {
    connection.query(q, (error, result, fields) => {
      if (error) {
        throw error;
      }
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username: formUsername, password: formPassword } = req.body;

  let q = `select * from user where id="${id}"`;
  try {
    connection.query(q, (error, result, fields) => {
      if (error) {
        throw error;
      }
      let user = result[0];
      if (formPassword === user.password) {
        let q2 = `update user set username= "${formUsername}" where id="${id}"`;
        try {
          connection.query(q2, (error2, result, fields) => {
            if (error2) {
              return res.status(500).send("Database error occurred");
            }
            res.redirect("/user");
          });
        } catch (err2) {
          res.status(500).send("Internal server error");
        }
      } else {
        res.send("INCORRECT Password. Username not changed.");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id="${id}"`;
  try {
    connection.query(q, (error, result, fields) => {
      if (error) {
        throw error;
      }
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/user/:id", (req, res) => {
  let { email: formEmail, password: formPassword } = req.body;
  let { id } = req.params;

  let q = `select * from user where id="${id}"`;
  try {
    connection.query(q, (err2, result, fields) => {
      if (err2) {
        throw err2;
      }
      let user = result[0];
      if (formEmail === user.email && formPassword === user.password) {
        let delQuery = `delete from user where id="${id}"`;

        try {
          connection.query(delQuery, (err3, res3, fields3) => {
            if (err3) {
              throw err3;
            }
            res.redirect(`/user`);
          });
        } catch (e3) {
          console.log(e3);
          res.send("some error occured");
        }
      } else {
        res.send("incorrect email or password");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("some error occured");
  }
});

app.get("/user/new", (req, res) => {
  res.render("newUser.ejs");
});

app.post("/user", (req, res) => {
  let {
    email: formEmail,
    username: formUsername,
    password: formPassword,
  } = req.body;

  let id = newUuid();
  let q = `insert into user (id,email,username,password) values ("${id}","${formEmail}","${formUsername}","${formPassword}")`;

  try {
    connection.query(q, (error, result, fields) => {
      if (error) {
        throw error;
      }
      res.redirect("/user");
    });
  } catch (error) {
    console.log(error);
    res.send("some error occured in the database");
  }
});

// try {
//   connection.query(q, [data], (error, result, fields) => {
//     if (error) {
//       throw error;
//     }
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end();
