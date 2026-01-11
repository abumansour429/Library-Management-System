const Role = require("../models/Role");

const seedRoles = async () => {
  const roles = [
    {
      name: "SuperAdmin",
      permissions: ["create", "edit", "delete", "publish", "view"]
    },
    {
      name: "Librarian",
      permissions: ["create", "edit", "publish", "view"]
    },
    {
      name: "Staff",
      permissions: ["create", "edit", "view"]
    },
    {
      name: "Member",
      permissions: ["view"]
    }
  ];

  for (const role of roles) {
    const exists = await Role.findOne({ name: role.name });
    if (!exists) {
      await Role.create(role);
      console.log(`Role created: ${role.name}`);
    }
  }
};

module.exports = seedRoles;
