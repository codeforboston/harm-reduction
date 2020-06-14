if (process.env.RUN_HARM_REDUCTION_GIT_HOOKS) {
  exports.hooks = {
    'pre-push': 'npm run lint && CI=true npm test',
  };
}
