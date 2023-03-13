const User = {
  partitionKey: {
    name: 'username',
    type: 'S'
  },
  password: {
    name: 'password',
    type: 'S'
  },
  refreshToken: {
    name: 'refreshToken',
    type: 'S'
  }
}

module.exports = User;