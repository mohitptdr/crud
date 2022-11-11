import { useEffect, useState } from "react";
import "./App.css";

const save = () => {
  const data = localStorage.getItem("users");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(null);

  const [users, setUsers] = useState(save());

  const addUser = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      address,
      department,
      salary,
    };

    if (edit) {
      // update user
      let copy = users;
      Object.assign(copy[active], user);
      setUsers([...copy]);
      setEdit(false);
      setActive(null);
    } else {
      // addUser
      setUsers([...users, user]);
    }
    setName("");
    setEmail("");
    setAddress("");
    setDepartment("");
    setSalary("");
  };

  const onEditClick = (index) => {
    const user = users[index];

    setName(user.name);
    setEmail(user.email);
    setAddress(user.address);
    setDepartment(user.department);
    setSalary(user.salary);

    setActive(index);
    setEdit(true);
  };

  const deleteUser = (user) => {
    if (window.confirm("Are you sure you want to delete?")) {
      let copy = users.filter((item) => item !== user);
      setUsers([...copy]);
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <div className="App">
      <h1>React Crud App</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-5">
            <form onSubmit={addUser}>
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Department</label>
                <input
                  type="text"
                  className="form-control"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Salary</label>
                <input
                  type="text"
                  className="form-control"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <button className="btn btn-success form-control my-3">
                {edit ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <table className="table table-bordered mt-5">
        <thead className="bg-primary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.department}</td>
              <td>{user.salary}</td>
              <td>
                <button
                  className="btn btn-info mx-3"
                  onClick={() => onEditClick(index)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger "
                  onClick={() => deleteUser(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
