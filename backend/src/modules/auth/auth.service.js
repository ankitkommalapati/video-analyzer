const User = require("../user/user.model");
require("../role/role.model");
require("../organization/org.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.register = async ({ name, email, password, organization, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    organization,
    role,
  });

  user.password = undefined;
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email })
    .populate("role")
    .populate("organization");

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role.name,
      organizationId: user.organization._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
};