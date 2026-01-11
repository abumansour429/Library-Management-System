const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");

const seedUsers = async () => {
  const users = [
    {
      fullName: "Super Admin",
      email: "admin@lib.com",
      password: "123456",
      role: "SuperAdmin"
    },
    {
      fullName: "Main Librarian",
      email: "librarian@lib.com",
      password: "123456",
      role: "Librarian"
    },
    {
      fullName: "Library Staff",
      email: "staff@lib.com",
      password: "123456",
      role: "Staff"
    },
    {
      fullName: "Library Member",
      email: "member@lib.com",
      password: "123456",
      role: "Member"
    }
  ];

  for (const u of users) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) {
      const role = await Role.findOne({ name: u.role });
      const hashedPassword = await bcrypt.hash(u.password, 10);

      await User.create({
        fullName: u.fullName,
        email: u.email,
        password: hashedPassword,
        role: role._id
      });

      console.log(`User created: ${u.email}`);
    }
  }
};

module.exports = seedUsers;
